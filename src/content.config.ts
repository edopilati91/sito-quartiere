import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Historical articles about the Festa Votiva, shown under /festa-votiva/<file name>/.
const storia = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/storia' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            // Short text shown in the list on the Festa Votiva page.
            summary: z.string(),
            author: z.string().optional(),
            // Position in the list (lowest first).
            order: z.number(),
            cover: image().optional(),
            coverAlt: z.string().optional(),
            // Adds the note with the books the text is taken from.
            sources: z.boolean().default(false),
        }),
});

export const collections = { storia };
