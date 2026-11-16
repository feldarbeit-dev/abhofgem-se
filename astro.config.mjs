import { defineConfig } from 'astro/config';

// Statischer Build für Cloudflare Pages. URLs ohne Schrägstrich am Ende (/fussball statt /fussball/).
export default defineConfig({
  site: 'https://www.uniongschwandt.at',
  trailingSlash: 'never',
  build: { format: 'file' },
});
