import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
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

// Photo albums copied from the old site, shown under /archivio/<file name>/.
// The photos are in public/archivio/<file name>/ (served as they are, not processed by Astro).
const archivio = defineCollection({
    loader: glob({ pattern: '*.json', base: './src/content/archivio' }),
    schema: z.object({
        titolo: z.string(),
        // Date or period shown under the title, e.g. "1980 circa".
        periodo: z.string().optional(),
        descrizione: z.string().optional(),
        // Who took the photos.
        crediti: z.string().optional(),
        // 'festa-votiva' or 'quartiere': the section of the archive page.
        sezione: z.enum(['festa-votiva', 'quartiere']),
        // Position in its section (lowest first).
        ordine: z.number(),
        // YouTube video id, shown above the photos.
        video: z.string().optional(),
        // Photos, optionally split under headings (e.g. one group per year).
        gruppi: z.array(
            z.object({
                titolo: z.string().optional(),
                foto: z.array(
                    z.object({
                        file: z.string(),
                        larghezza: z.number(),
                        altezza: z.number(),
                    }),
                ),
            }),
        ),
    }),
});

// Festa Votiva booklets and issues of the quartiere newsletter, as PDF files in public/archivio/pdf/.
const documenti = defineCollection({
    loader: file('./src/content/documenti.json'),
    schema: z.object({
        titolo: z.string(),
        tipo: z.enum(['libretto', 'giornalino']),
        anno: z.number(),
        file: z.string(),
        pagine: z.number(),
        // File size in bytes, shown next to the download link.
        peso: z.number(),
    }),
});

// News and announcements, shown under /notizie/<file name>/ and, while current, in the home page.
const giorno = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Data nel formato AAAA-MM-GG');
const notizie = defineCollection({
    loader: glob({ pattern: '*.md', base: './src/content/notizie' }),
    schema: ({ image }) =>
        z.object({
            titolo: z.string(),
            // Publication date, YYYY-MM-DD.
            data: giorno,
            // One line shown in the lists.
            riassunto: z.string(),
            // Last day the news is shown in the home page, YYYY-MM-DD (e.g. the day of the event).
            // Without it, it stays there (the strip shows at most two rows, the newest first).
            fino: giorno.optional(),
            // Flyer, shown next to the text.
            volantino: image().optional(),
            volantinoAlt: z.string().optional(),
        }),
});

export const collections = { storia, archivio, documenti, notizie };
