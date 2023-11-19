import react from "@vitejs/plugin-react-swc";
import { defineConfig, splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ devTarget: "esnext" }), splitVendorChunkPlugin()],
  build: {
    cssMinify: "lightningcss",
    target: "esnext",
    sourcemap: true,
    rollupOptions: {
      output: {
        generatedCode: {
          preset: "es2015",
          arrowFunctions: true,
          constBindings: true,
          objectShorthand: true,
        },
      },
    },
  },
  css: {
    transformer: "lightningcss",
  },
});
