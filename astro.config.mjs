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
          // Service icons
          "code",
          "shopping-cart",
          "cloud",
          "shield",
          "brain",
          // Navigation
          "menu",
          "x",
          "sun",
          "moon",
          "chevron-down",
          // Hero & CTA
          "arrow-right",
          // Contact
          "mail",
          // Problem section
          "x",
          // Benefits - Web Development
          "zap",
          "smartphone",
          "search",
          "clock",
          "message-circle",
          // Benefits - E-commerce
          "credit-card",
          "bar-chart",
          "refresh-cw",
          // Benefits - Cloud/DevOps
          "activity",
          "trending-up",
          "git-branch",
          // Benefits - Security
          "search",
          "lock",
          "file-check",
          "alert-triangle",
          "eye",
          "award",
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
