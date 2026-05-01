import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: "/bookmark-page-FM/",
  /* disable vite's auto reload */
  // server: {
  //   hmr: false
  // }
})