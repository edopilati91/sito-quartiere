// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    // Published on GitHub Pages under /sito-quartiere/. When a custom domain is
    // connected, set `site` to it and remove `base`.
    site: 'https://edopilati91.github.io',
    base: '/sito-quartiere/',
    vite: {
        plugins: [tailwindcss()],
    },
});
