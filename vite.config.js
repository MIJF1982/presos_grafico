import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  root: '.',       // garante que procura index.html na raiz
});
