import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",  // Allows external access
    strictPort: true,
    port: 5173, // Change this if needed
    allowedHosts: "all", // Allows all hosts
  },
});
