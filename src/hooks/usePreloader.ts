import { useEffect, useState } from 'react';

const MAX_WAIT_MS = 5500;

export function usePreloader(images: readonly string[], contentReady: boolean) {
  const [settled, setSettled] = useState(0);
  const [expired, setExpired] = useState(false);
  const total = images.length + 1;

  useEffect(() => {
    let active = true;
    const deadline = window.setTimeout(() => setExpired(true), MAX_WAIT_MS);
    const resources = images.map(url => {
      const image = new Image();
      image.src = url;
      return image.decode();
    });
    resources.push(document.fonts.load('1em "Press Start 2P"').then(() => undefined));
    for (const resource of resources) {
      void resource.catch(() => undefined).then(() => {
        if (active) setSettled(count => count + 1);
      });
    }
    return () => {
      active = false;
      window.clearTimeout(deadline);
    };
  }, [images]);

  const loading = !expired && (settled < total || !contentReady);
  return { loading, progress: Math.round((settled + Number(contentReady)) / (total + 1) * 100) };
}
