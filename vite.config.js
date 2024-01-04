import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/libs/index.ts'),
      name: 'StreamDomRenderer',
      // the proper extensions will be added
      fileName: 'stream-dom-renderer',
    },
    rollupOptions: {
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
  },
})