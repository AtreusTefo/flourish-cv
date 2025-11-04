import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
        manualChunks: {
          // Vendor chunks for large libraries
          'pdf-libs': ['jspdf', 'html2canvas'],
          'ui-radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-popover',
            '@radix-ui/react-accordion',
            '@radix-ui/react-navigation-menu'
          ],
          'ui-components': [
            '@radix-ui/react-avatar',
            '@radix-ui/react-slot',
            '@radix-ui/react-label',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-switch'
          ],
          'charts': ['recharts'],
          'markdown': ['react-markdown'],
          'router': ['react-router-dom'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'supabase': ['@supabase/supabase-js'],
          'query': ['@tanstack/react-query'],
          'utils': ['date-fns', 'clsx', 'tailwind-merge', 'class-variance-authority']
        }
      }
    },
    // Increase chunk size warning limit to 1000kb since we're optimizing
    chunkSizeWarningLimit: 1000,
    // Enable source maps for better debugging in production
    sourcemap: mode === 'development'
  }
}));
