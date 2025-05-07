// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
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
              "src/assets/fonts/champagne_limousines/champagne_limousines.ttf",
            ],
          },
          {
            weight: 700,
            style: "normal",
            src: [
              "src/assets/fonts/champagne_limousines/champagne_limousines_bold.ttf",
            ],
          },
          {
            weight: 400,
            style: "italic",
            src: [
              "src/assets/fonts/champagne_limousines/champagne_limousines_italic.ttf",
            ],
          },
          {
            weight: 700,
            style: "italic",
            src: [
              "src/assets/fonts/champagne_limousines/champagne_limousines_bold_italic.ttf",
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
});
