// src/utils/gallery.ts
import type { ImageMetadata } from 'astro';
import type { EventEntry } from '../../types';

export interface GalleryPhoto {
  src: string;  // Chemin string pour OptimizeImage
  alt: string;
  index: number;
}

export interface EventGallery {
  event: EventEntry;
  photos: GalleryPhoto[];
  photographer: string;
  coverImage: GalleryPhoto;
}

/**
 * Charge automatiquement les photos d'un événement depuis son dossier
 */
export async function loadEventGallery(eventSlug: string, event: EventEntry): Promise<EventGallery | null> {
  // Vérifier si l'événement a une galerie configurée
  if (!event.data.gallery) {
    return null;
  }

  try {
    // Charger toutes les images du dossier de l'événement
    const images = import.meta.glob('/src/assets/galleries/**/*.{png,jpg,jpeg,webp,avif}', { 
      eager: true,
      import: 'default'
    }) as Record<string, ImageMetadata>;

    // Filtrer les images de cet événement et les trier
    const eventImages: GalleryPhoto[] = [];
    
    Object.entries(images).forEach(([path, image]) => {
      // Vérifier que le chemin contient le slug de l'événement
      if (path.includes(`/galleries/${eventSlug}/`)) {
        // Extraire le nom du fichier pour générer l'index
        const filename = path.split('/').pop()?.split('.')[0] || '';
        
        // Essayer d'extraire un numéro du nom de fichier, sinon utiliser l'ordre d'ajout
        const match = filename.match(/(\d+)/) || filename.match(/photo(\d+)/);
        const index = match ? parseInt(match[1]) - 1 : eventImages.length;
        
        eventImages.push({
          src: path,  // Utiliser le chemin original, pas l'objet ImageMetadata
          alt: `Photo de ${event.data.title} - ${eventImages.length + 1}`,
          index: Math.max(0, index)
        });
      }
    });

    // Trier par index, puis par nom de fichier pour un ordre prévisible
    eventImages.sort((a, b) => {
      if (a.index !== b.index) {
        return a.index - b.index;
      }
      return a.alt.localeCompare(b.alt);
    });

    // Recalculer les alt avec le bon numéro après tri
    eventImages.forEach((photo, index) => {
      photo.alt = `Photo de ${event.data.title} - ${index + 1}`;
      photo.index = index;
    });

    if (eventImages.length === 0) {
      return null;
    }

    // Déterminer l'image de couverture
    const coverIndex = Math.min(event.data.gallery.coverImageIndex || 0, eventImages.length - 1);
    const coverImage = eventImages[coverIndex];

    return {
      event,
      photos: eventImages,
      photographer: event.data.gallery.photographer,
      coverImage
    };

  } catch (error) {
    console.warn(`Erreur lors du chargement de la galerie pour ${eventSlug}:`, error);
    return null;
  }
}

/**
 * Charge toutes les galeries disponibles, triées par date d'événement
 */
export async function loadAllGalleries(events: EventEntry[]): Promise<EventGallery[]> {
  const galleries: EventGallery[] = [];
  
  for (const event of events) {
    const gallery = await loadEventGallery(event.slug, event);
    if (gallery) {
      galleries.push(gallery);
    }
  }
  
  // Trier par date d'événement (plus récent en premier)
  return galleries.sort((a, b) => {
    const dateA = a.event.data.date instanceof Date ? a.event.data.date : new Date(a.event.data.date);
    const dateB = b.event.data.date instanceof Date ? b.event.data.date : new Date(b.event.data.date);
    return dateB.getTime() - dateA.getTime();
  });
}