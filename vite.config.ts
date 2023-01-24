import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        //로컬
        // target: "http://localhost:8080",
        //운영
        target: 'https://fordd.fly.dev',
        changeOrigin: true,
        // secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
