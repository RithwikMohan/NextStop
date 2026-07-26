import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration targeting maximum mobile smartphone browser compatibility
export default defineConfig({
  plugins: [react()],
  build: {
    target: ['es2015', 'chrome58', 'safari11', 'edge18'],
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        chunkFileNames: `assets/[name]-[hash]-${Date.now()}.js`,
        assetFileNames: `assets/[name]-[hash]-${Date.now()}[extname]`
      }
    }
  }
})
