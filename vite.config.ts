import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site → served under /hello-base-dapp/.
// Relative base keeps assets working both locally and on Pages.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});