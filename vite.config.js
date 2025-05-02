// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Remova se não usar React

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'
  }
})
