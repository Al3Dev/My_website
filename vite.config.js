import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/', // Configuración para Vercel
    // Expone LASTFM_* al bundle (además de VITE_*), para coincidir con nombres en Vercel.
    envPrefix: ['VITE_', 'LASTFM_'],
});
