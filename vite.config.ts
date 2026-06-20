import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1100, // the three.js vendor chunk is lazy-loaded with the hero scene
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/three|@react-three|postprocessing/.test(id)) return 'three'
          if (/framer-motion|gsap|lenis/.test(id)) return 'motion'
          if (/@mui|@emotion/.test(id)) return 'mui'
          if (/react-router|react-dom|[\\/]react[\\/]/.test(id)) return 'react'
        },
      },
    },
  },
})
