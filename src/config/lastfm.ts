/**
 * Last.fm (cliente). En Vercel usa `VITE_LASTFM_API_KEY` y `VITE_LASTFM_USER`.
 * `LASTFM_*` sigue admitido vía envPrefix por compatibilidad.
 */
export const LASTFM_API_KEY: string | undefined =
  import.meta.env.VITE_LASTFM_API_KEY ?? import.meta.env.LASTFM_API_KEY

export const LASTFM_USER: string | undefined =
  import.meta.env.VITE_LASTFM_USER ?? import.meta.env.LASTFM_USER

const API_BASE = 'https://ws.audioscrobbler.com/2.0/'

function trimmedKeyUser(): { key: string; user: string } | null {
  const key = (LASTFM_API_KEY ?? '').toString().trim()
  const user = (LASTFM_USER ?? '').toString().trim()
  if (!key || !user) return null
  return { key, user }
}

/** URLs para la página Music; `null` si falta key o usuario (no llamar fetch). */
export function buildMusicPageUrls(): {
  recent: string
  topTracks: string
  topAlbums: string
} | null {
  const pair = trimmedKeyUser()
  if (!pair) return null
  const { key, user } = pair
  const u = encodeURIComponent(user)
  const k = encodeURIComponent(key)
  return {
    recent: `${API_BASE}?method=user.getrecenttracks&user=${u}&api_key=${k}&format=json&limit=10`,
    topTracks: `${API_BASE}?method=user.gettoptracks&user=${u}&api_key=${k}&format=json&period=7day&limit=8`,
    topAlbums: `${API_BASE}?method=user.gettopalbums&user=${u}&api_key=${k}&format=json&period=7day&limit=8`,
  }
}

/** URL del widget (un track); `null` si falta config. */
export function buildWidgetRecentUrl(): string | null {
  const pair = trimmedKeyUser()
  if (!pair) return null
  const { key, user } = pair
  return `${API_BASE}?method=user.getrecenttracks&user=${encodeURIComponent(user)}&api_key=${encodeURIComponent(key)}&format=json&limit=1`
}

export function lastFmConfigError(): string | null {
  const key = (LASTFM_API_KEY ?? '').toString().trim()
  const user = (LASTFM_USER ?? '').toString().trim()
  if (key && user) return null
  if (!key && !user) {
    return 'Last.fm: define VITE_LASTFM_API_KEY y VITE_LASTFM_USER en Vercel y redespliega.'
  }
  if (!key) {
    return 'Last.fm: falta VITE_LASTFM_API_KEY (o LASTFM_API_KEY). Redespliega tras guardar.'
  }
  return 'Last.fm: falta VITE_LASTFM_USER (o LASTFM_USER = tu nick en last.fm). Redespliega.'
}
