import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Output to ../docs so GitHub Pages can serve the built site from /docs on the
// react-rewrite branch (or main, once merged) without touching the live gh-pages output.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
})
