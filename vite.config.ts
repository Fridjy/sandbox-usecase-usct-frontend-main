import react from "@vitejs/plugin-react";
import { resolve } from 'node:path';
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let config = {
    plugins: [svgr(), react()],
    resolve: {
      alias: {
        "./runtimeConfig": "./runtimeConfig.browser",
        '@assets': resolve(__dirname, 'src/assets'),
        '@ui': resolve(__dirname, 'src/ui'),
      },
    },
    define: {},
  };
  return config;
});
