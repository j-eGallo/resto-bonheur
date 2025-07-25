import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 3001,
  },
})
