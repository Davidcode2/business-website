// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    icon({
      include: {
        lucide: [
          "code",
          "shopping-cart",
          "cloud",
          "shield",
          "mail",
          "arrow-right",
          "menu",
          "x",
          "sun",
          "moon",
        ],
        "simple-icons": [
          "github",
          "linkedin",
          "astro",
          "react",
          "kubernetes",
          "terraform",
        ],
      },
    }),
  ],
});
