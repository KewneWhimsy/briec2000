import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Définition du schéma pour les événements avec galerie optionnelle
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    location: z.string(),
    time: z.string(),
    image: z.string().optional(),
    price: z.array(z.object({
      name: z.string(),
      amount: z.number(),
    })).optional(),
    gallery: z.object({
      photographer: z.string(),
      coverImageIndex: z.number().default(0),
      title: z.string().optional(), // Titre personnalisé pour la galerie
    }).optional(),
    menuNotes: z.array(z.string()).optional(), // Notes personnalisées pour l'encart menu
    draft: z.boolean().default(false),
  }),
});

// Définition du schéma pour les cantines
const cantines = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cantines' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    time: z.string(),
    price: z.array(z.object({
      name: z.string(),
      amount: z.number(),
    })),
    menu: z.string(),
    reservation: z.string(),
    updated: z.date(),
  }),
});

// Définition du schéma pour les pages générales
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.date(),
  }),
});

// Exporter les collections
export const collections = {
  events,
  cantines,
  pages
};
