import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/treasure-game/',
  build: {
    outDir: 'dist'
  }
})