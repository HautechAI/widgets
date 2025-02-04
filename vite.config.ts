import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), dts()],
  build: {
    lib: {
      name: "@hautechai/widgets",
      entry: "src/Widget/index.tsx",
      formats: ["cjs", "es"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
    },
  },
  esbuild: { legalComments: "none" },
});
