import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import { redact } from "@tanstack/redact/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: { host: "0.0.0.0" },
  plugins: [
    react({ compiler: true }),
    redact({
      features: { activity: false, fragmentRefs: false, classComponents: false, hydration: false },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
