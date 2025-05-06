// src/content/config.ts
import { defineCollection, z } from 'astro:content';


// Définition du schéma pour les événements
const eventsCollection = defineCollection({
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
    draft: z.boolean().default(false),
  }),
});

// Définition du schéma pour les cantines
const cantinesCollection = defineCollection({
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
const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.date(),
  }),
});

// Exporter les collections
export const collections = { eventsCollection, cantinesCollection, pagesCollection};