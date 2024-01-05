import { resolve } from 'path'
import { defineConfig } from 'vite'

const FORMAT = process.env.FORMAT || 'cjs';

export default defineConfig({
  root: './src/site',
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/libs/index.ts'),
      name: 'StreamDomRenderer',
      // // the proper extensions will be added
      fileName: (format, name) => `${name}.${format}.js`,
      formats: [FORMAT],
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        dir: resolve(__dirname, `./dist/${FORMAT}`),
        format: FORMAT,
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
  },
})