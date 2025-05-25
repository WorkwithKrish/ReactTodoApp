import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: "esbuild", // Fast minification
    sourcemap: true, // Disable source maps in prod (optional)
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor code
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
