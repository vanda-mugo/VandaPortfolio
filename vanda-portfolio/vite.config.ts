import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for React and related libraries
          vendor: ["react", "react-dom"],
          // Animation libraries chunk
          animations: [
            "framer-motion",
            "gsap",
            "@react-spring/web",
            "animate.css",
          ],
          // Bootstrap and icons chunk
          bootstrap: ["react-bootstrap", "react-bootstrap-icons", "bootstrap"],
          // Slick carousel chunk
          carousel: ["react-slick", "slick-carousel"],
          // jQuery and utilities
          utils: ["jquery", "react-on-screen", "sass-embedded"],
        },
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Enable source maps for better debugging in production
    sourcemap: false,
    // Use default minifier (esbuild) for better compatibility
    minify: true,
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "react-bootstrap",
      "react-slick",
    ],
  },
});
