import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      // tailwindcss()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    server: {
      proxy: {
        "/api": {
          target: env.API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
      watch: {
        usePolling: true,
      },
    }
  };
})