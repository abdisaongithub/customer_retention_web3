import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { postcss } from 'tailwindcss'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), postcss],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
