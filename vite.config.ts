import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { redact } from "@tanstack/redact/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [redact(), react({ compiler: true }), tailwindcss()],
  optimizeDeps: {
    include: ["react-aria-components > react-aria > use-sync-external-store/shim/index.js"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
