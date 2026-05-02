// astro.config.mjs
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare({ imageService: 'compile' }),

  site: 'https://briec2000.fr',

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Champagne",
      cssVariable: "--font-champ",
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["src/assets/champagne_limousines/champagne_limousines.ttf"],
          },
          {
            weight: 700,
            style: "normal",
            src: ["src/assets/champagne_limousines/champagne_limousines_bold.ttf"],
          },
          {
            weight: 400,
            style: "italic",
            src: ["src/assets/champagne_limousines/champagne_limousines_italic.ttf"],
          },
          {
            weight: 700,
            style: "italic",
            src: ["src/assets/champagne_limousines/champagne_limousines_bold_italic.ttf"],
          },
        ],
      },
    },
    {
      provider: fontProviders.google(),
      name: "Andika",
      cssVariable: "--font-andika"
    },
    {
      provider: fontProviders.google(),
      name: "Press Start 2P",
      cssVariable: "--font-start"
    },
  ],

  trailingSlash: "always",

  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [],
      filter: (page) =>
        !page.includes('/test/') &&
        !page.includes('/draft/')
    })
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  transitions: {
    persistentAttributes: ['data-theme'],
  }
});
