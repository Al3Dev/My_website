/**
 * Last.fm (cliente): usa `VITE_LASTFM_API_KEY` y `VITE_LASTFM_USER` en Vercel,
 * o los fallbacks `LASTFM_*` si los defines (envPrefix en vite.config).
 */
export const LASTFM_API_KEY =
  import.meta.env.VITE_LASTFM_API_KEY ?? import.meta.env.LASTFM_API_KEY;

export const LASTFM_USER =
  import.meta.env.VITE_LASTFM_USER ?? import.meta.env.LASTFM_USER;

/** `null` si key + usuario están listos; si no, texto para mostrar en UI. */
export function lastFmConfigError(): string | null {
  const key = (LASTFM_API_KEY ?? '').toString().trim();
  const user = (LASTFM_USER ?? '').toString().trim();
  if (key && user) return null;
  if (!key && !user) {
    return 'Last.fm: faltan API key y usuario. En Vercel añade LASTFM_API_KEY y LASTFM_USER (tu nick).';
  }
  if (!key) {
    return 'Last.fm: falta la API key (LASTFM_API_KEY o VITE_LASTFM_API_KEY). Redespliega tras guardar.';
  }
  return 'Last.fm: falta el usuario (LASTFM_USER o VITE_LASTFM_USER = tu usuario en last.fm). Redespliega.';
}
