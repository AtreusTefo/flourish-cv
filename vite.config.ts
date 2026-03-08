import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  },
  plugins: [
    react(),
    // lovable-tagger: dev-only, loaded dynamically to avoid ESM/CJS issues in CI
    ...(mode === "development"
      ? (() => {
          try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { componentTagger } = require("lovable-tagger");
            return [componentTagger()];
          } catch {
            return [];
          }
        })()
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Browser compatibility targets
    target: ['es2015', 'chrome79', 'firefox67', 'safari12', 'edge79'],
    // CSS compatibility
    cssTarget: ['chrome79', 'firefox67', 'safari12', 'edge79'],
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Keep React and React-DOM together in the vendor chunk
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('jspdf') || id.includes('html2canvas')) {
              return 'pdf-libs';
            }
            if (id.includes('@radix-ui')) {
              return 'ui-radix';
            }
            if (id.includes('recharts')) {
              return 'charts';
            }
            if (id.includes('react-markdown')) {
              return 'markdown';
            }
            if (id.includes('react-router-dom')) {
              return 'router';
            }
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
              return 'forms';
            }
            if (id.includes('@supabase')) {
              return 'supabase';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'query';
            }
            // Other node_modules go to vendor
            return 'vendor';
          }
        }
      }
    },
    // Increase chunk size warning limit to 1000kb since we're optimizing
    chunkSizeWarningLimit: 1000,
    // Enable source maps for better debugging in production
    sourcemap: mode === 'development'
  }
}));
