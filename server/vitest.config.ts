import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@services': path.resolve(__dirname, 'src/services'),
      '@middlewares': path.resolve(__dirname, 'src/middlewares')
    }
  },
  test: {
    globals: true
  }
})
