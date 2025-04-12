import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/weather': {
        target: 'http://15.206.185.30:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/weather/, '/weather'),
      },
    },

  }
})
