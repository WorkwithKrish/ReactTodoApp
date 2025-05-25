import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My Todo App",
        short_name: "Todo",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#317EFB",
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

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
