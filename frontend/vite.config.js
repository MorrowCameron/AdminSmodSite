import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './', // You already are inside frontend
  build: {
    outDir: 'dist',
  }
});
