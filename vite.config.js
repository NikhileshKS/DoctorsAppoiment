import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT) || 3000, // Use PORT from environment, fallback to 3000
    host: '0.0.0.0', // Bind to all network interfaces for external access
  },
})
