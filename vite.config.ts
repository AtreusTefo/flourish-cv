import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "127.0.0.1",
    port: 8080,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  },
  plugins: [react()],
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
            // Supabase and its transitive deps (tslib, etc.) stay in vendor
            // to avoid circular chunk dependencies that cause TDZ errors
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
