import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => {
  // En Vercel el build ve process.env.*; refuerzo explícito por si loadEnv no copia algo al cliente.
  const pKey = process.env.VITE_LASTFM_API_KEY ?? process.env.LASTFM_API_KEY
  const pUser = process.env.VITE_LASTFM_USER ?? process.env.LASTFM_USER

  const define: Record<string, string> = {}
  if (pKey != null && String(pKey).trim() !== '') {
    define['import.meta.env.LASTFM_API_KEY'] = JSON.stringify(String(pKey).trim())
  }
  if (pUser != null && String(pUser).trim() !== '') {
    define['import.meta.env.LASTFM_USER'] = JSON.stringify(String(pUser).trim())
  }

  return {
    plugins: [react()],
    base: '/',
    envPrefix: ['VITE_', 'LASTFM_'],
    define,
  }
})
