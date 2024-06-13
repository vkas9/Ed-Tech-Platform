import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/beta": {
        target:"https://ed-tech-platform-1-n5ez.onrender.com",
        changeOrigin: true,
        secure: false
      }
    },
  },
});
