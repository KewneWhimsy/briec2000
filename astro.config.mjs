// astro.config.mjs
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  experimental: {
    fonts: [
      {
        provider: "local",
        name: "Champagne",
        cssVariable: "--font-champ",
        variants: [
          {
            weight: 400,
            style: "normal",
            src: [
              "src/assets/champagne_limousines/champagne_limousines.ttf",
            ],
          },
          {
            weight: 700,
            style: "normal",
            src: [
              "src/assets/champagne_limousines/champagne_limousines_bold.ttf",
            ],
          },
          {
            weight: 400,
            style: "italic",
            src: [
              "src/assets/champagne_limousines/champagne_limousines_italic.ttf",
            ],
          },
          {
            weight: 700,
            style: "italic",
            src: [
              "src/assets/champagne_limousines/champagne_limousines_bold_italic.ttf",
            ],
          },
        ],
      },
      {
        provider: fontProviders.google(),
        name: "Andika",
        cssVariable: "--font-andika"
      },
    ],
  },
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
  // Configuration cruciale pour que l'attribut data-theme survive aux transitions
  transitions: {
    // Attributs à préserver pendant les transitions
    persistentAttributes: ['data-theme'],
  }
});