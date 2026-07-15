import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue() // Carica solo Vue, escludendo Vuetify che nei test unitari logici non serve
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['node_modules', 'dist', 'e2e/'] // Escludi le cartelle non necessarie ai test unitari
  }
})