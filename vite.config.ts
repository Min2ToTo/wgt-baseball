import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This allows Vite to accept connections from outside localhost,
    // which is necessary for tunneling services.
    host: true, 
    
    // This is the crucial part that solves the error.
    // It tells Vite which external hosts are allowed to connect.
    // We are adding wildcards for both localtunnel and ngrok for flexibility.
    allowedHosts: [
      '.loca.lt',
      '.ngrok-free.app',
    ],
  }
})