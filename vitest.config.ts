import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,            // so you can use `describe`, `it`, `expect` without imports
    environment: 'jsdom',     // for React DOM testing
    setupFiles: './src/setupTests.ts',
  },
})
