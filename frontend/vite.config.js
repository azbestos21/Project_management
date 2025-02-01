import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default {
  server: {
    host: true, // Or use "0.0.0.0" to bind to all interfaces
    port: 5173, // Optional: specify the port
  },
};
