// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    // Set the public URL once the domain is known, e.g. 'https://www.example.it'.
    // site: '',
    vite: {
        plugins: [tailwindcss()],
    },
});
