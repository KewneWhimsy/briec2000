import type { CollectionEntry } from 'astro:content';

// Use the standard CollectionEntry types from Astro
export type EventEntry = CollectionEntry<'events'>;
export type CantineEntry = CollectionEntry<'cantines'>;
export type PageEntry = CollectionEntry<'pages'>;

// Type for price structure used in events and cantines
export interface Price {
  name: string;
  amount: number;
}

// Type for gallery configuration in events
export interface GalleryConfig {
  photographer: string;
  coverImageIndex?: number;
  title?: string;
}