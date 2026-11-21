// Közös Vite beállítás minden példához és feladathoz.
// A package.json scriptjei adják meg, melyik mappa a "gyökér", pl.:
//   vite 01-elso-komponens --config vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // Minden /api kezdetű kérést a backendnek továbbítunk (npm run szerver -> http://localhost:3000).
    // Így a böngésző szemében a frontend és az API ugyanarról a címről jön -> nincs CORS hiba.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
