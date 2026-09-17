import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Proxy: cererile catre /api/* sunt redirectionate catre serverul Express
// (care trebuie sa ruleze separat, pe portul 3000 - vezi todo-app/server.js)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
});

