import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, 'src/assets/js/scripts.js'),
      output: {
        format: 'iife',
        entryFileNames: 'assets/js/[name].js',
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith('.css')
            ? 'assets/css/style.css'
            : 'assets/[ext]/[name].[ext]',
      },
    },
  },
})
