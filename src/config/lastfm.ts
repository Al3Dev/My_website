/**
 * Last.fm (cliente): usa `VITE_LASTFM_API_KEY` y `VITE_LASTFM_USER` en Vercel,
 * o los fallbacks `LASTFM_*` si los defines (envPrefix en vite.config).
 */
export const LASTFM_API_KEY =
  import.meta.env.VITE_LASTFM_API_KEY ?? import.meta.env.LASTFM_API_KEY;

export const LASTFM_USER =
  import.meta.env.VITE_LASTFM_USER ?? import.meta.env.LASTFM_USER;
