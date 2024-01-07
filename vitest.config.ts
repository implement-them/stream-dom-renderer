import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul', // or 'v8'
      include: ['src/libs'],
      exclude: [
        'src/libs/Managers/ParserManager.ts',
        'src/libs/StreamParser/MarkdownParser.ts',
        'src/libs/StreamDomRenderer.ts',
      ],
    },
    environment: 'jsdom',
  },
});