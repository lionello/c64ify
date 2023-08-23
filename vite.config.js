import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [react()],
    resolve: {
      alias: {
        'node:buffer': 'buffer',
        components: "/src/components",
        scss: "/src/scss",
      },
    },
  };
});
