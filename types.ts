import type { CollectionEntry } from 'astro:content';

// Extended type for events collection entries
export interface EventEntry extends CollectionEntry<'events'> {
  slug: string;
  render: () => Promise<{ Content: any }>;
}

// Extended type for cantines collection entries
export interface CantineEntry extends CollectionEntry<'cantines'> {
  slug: string;
  render: () => Promise<{ Content: any }>;
}

// Extended type for pages collection entries
export interface PageEntry extends CollectionEntry<'pages'> {
  slug: string;
  render: () => Promise<{ Content: any }>;
}

// Type for price structure used in events and cantines
export interface Price {
  name: string;
  amount: number;
}