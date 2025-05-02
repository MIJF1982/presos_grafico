import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['react-router-dom'] // Adicionando o react-router-dom à lista de dependências externas
    }
  }
});
