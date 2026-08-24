import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    // running my mass calculator fastAPI app on 8000
    proxy: {"/api": "http://localhost:8000"}
  }
})
