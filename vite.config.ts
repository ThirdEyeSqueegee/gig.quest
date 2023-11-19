import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ devTarget: "esnext" })],
  build: {
    cssMinify: "lightningcss",
    target: "esnext",
    sourcemap: true,
  },
  css: {
    transformer: "lightningcss",
  },
});
