import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      app: "./App/*",
      assets: "./assets/*",
      components: "./components/*",
      helpers: "./helpers/*",
      pages: "./pages/*",
      routes: "./routes/*",
      services: "./services/*",
      store: "./store/*",
      utils: "./utils/*",
    },
  },
});
