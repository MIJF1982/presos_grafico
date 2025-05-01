import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',           // garante que o index.html é procurado na raiz
  build: {
    outDir: 'build'    // para compatibilidade com vercel.json
  }
});
