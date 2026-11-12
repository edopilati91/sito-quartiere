import { getCollection, type CollectionEntry } from 'astro:content';

export type Notizia = CollectionEntry<'notizie'>;

// Today's date in Italy, YYYY-MM-DD. The site is static: this is the day of the build
// (the deploy workflow rebuilds it every night).
const oggi = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Rome' });

/** All the news, newest first. */
export async function tutteLeNotizie(): Promise<Notizia[]> {
    return (await getCollection('notizie')).sort((a, b) => b.data.data.localeCompare(a.data.data));
}

/** The current news, newest first: those not past their "fino" date. */
export async function notizieInEvidenza(): Promise<Notizia[]> {
    const giorno = oggi();
    return (await tutteLeNotizie()).filter((n) => !n.data.fino || n.data.fino >= giorno);
}

/** "3 marzo 2026" from "2026-03-03". */
export function formattaData(data: string): string {
    return new Date(`${data}T12:00:00Z`).toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });
}
