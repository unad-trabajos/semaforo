import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Vite + React Router puro. Pensado para desplegar como SPA estática
// en GitHub Pages bajo la subruta /semaforo/.
// El base path se inyecta vía VITE_BASE_PATH desde el workflow.
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? "/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    host: "::",
    port: 8080,
  },
});
