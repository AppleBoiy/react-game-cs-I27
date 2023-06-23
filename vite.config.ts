import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "singleHMR",
      handleHotUpdate({ modules }) {
        modules.forEach((m) => {
          m.importedModules = new Set();
          m.importers = new Set();
        });

        return modules;
      }
    }
  ],
  build: {
    outDir: "public",
    emptyOutDir: true
  }
});
