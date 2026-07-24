import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Builds a self-contained index.html (JS + CSS inlined) into dist-single/.
// The hero PNGs stay as sibling files referenced by relative URL, so the page
// runs by double-clicking it from disk (file://) with no server needed.
export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: "dist-single",
    assetsInlineLimit: 0,
  },
});
