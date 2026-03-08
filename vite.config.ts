import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// lovable-tagger is optional – only used in dev and may not be installed in CI
let componentTagger: (() => unknown) | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  componentTagger = require("lovable-tagger").componentTagger;
} catch {
  // not available – safe to ignore in production builds
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // Changed from "::" to "0.0.0.0" for better proxy compatibility
    port: 8080, // Fixed: Changed from 8081 to 8080 as per requirements
    cors: true, // Enable CORS for external testing tools
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
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
