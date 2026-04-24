import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://liar-entertainer.com',
  trailingSlash: 'always',
  output: 'static',
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    cacheDir: '/tmp/vite-cache-liar',
    build: {
      cssMinify: true,
      minify: true,
      // Inline CSS-Dateien bis 20KB → kein render-blocking CSS
      assetsInlineLimit: 20000,
    },
  },
});
