import react from "@vitejs/plugin-react-swc";
import { defineConfig, splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        generatedCode: {
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true,
          preset: "es2015",
        },
      },
    },
    target: "esnext",
  },
  css: {
    transformer: "lightningcss",
  },
  plugins: [react({ devTarget: "esnext" }), splitVendorChunkPlugin()],
});
