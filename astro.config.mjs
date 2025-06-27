// astro.config.mjs
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // URL de votre site en production
  site: 'https://briec2000.fr',
  
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
  
  // Intégrations
  integrations: [
    sitemap({
      // Configuration optionnelle du sitemap
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      
      // Fonction pour personnaliser chaque URL
      customPages: [],
      
      // Filtre pour exclure certaines pages si besoin
      filter: (page) => {
        // Exclure les pages de test ou temporaires
        return !page.includes('/test/') && !page.includes('/draft/');
      }
    })
  ],
  
  vite: {
    plugins: [tailwindcss()],
  },
  
  // Configuration cruciale pour que l'attribut data-theme survive aux transitions
  transitions: {
    // Attributs à préserver pendant les transitions
    persistentAttributes: ['data-theme'],
  }
});