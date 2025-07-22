import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
});
