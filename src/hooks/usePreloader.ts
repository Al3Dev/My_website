import { useState, useEffect } from 'react';

const PRELOAD_IMAGE_URLS = [
  '/assets/character.png',
  '/assets/background.png',
  '/assets/star.png',
  '/assets/project1.png',
  '/assets/Me.png',
  '/assets/Albums.png',
];

const PRELOAD_MIN_DURATION_MS = 3000;

function loadImage(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve();
    img.onerror = reject;
  });
}

/**
 * Preloads critical images and sets loading to false after a minimum duration.
 * Returns the current loading state.
 */
export function usePreloader(): boolean {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const preloadResources = async () => {
      try {
        await Promise.all(PRELOAD_IMAGE_URLS.map(loadImage));
        if (!cancelled) {
          setTimeout(() => setLoading(false), PRELOAD_MIN_DURATION_MS);
        }
      } catch (error) {
        console.error('Error cargando recursos:', error);
        if (!cancelled) setLoading(false);
      }
    };

    preloadResources();
    return () => {
      cancelled = true;
    };
  }, []);

  return loading;
}
