import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      '1466334ce371.ngrok-free.app',
      'bizpole-one.vercel.app'
    ],
  },
})
