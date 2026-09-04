import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Frontend runs on port 5173.
// It talks only to the Node.js backend — never directly to the AI service.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
})
