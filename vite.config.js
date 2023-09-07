import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
const config = {
  base: '/permit-calculators/',
  plugins: [react()], 
  build: {
    chunkSizeWarningLimit: 2000,
  },
  server: {
    open: true
  }    
};

export default defineConfig(config);