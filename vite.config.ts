import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const { PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  preview: {
    port: 5000,
  },
  server: {
    proxy: {
      "/api": {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist/app",
  },
});
