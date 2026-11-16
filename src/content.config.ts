import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const leerAlsFehlend = (v: unknown) => (v === '' || v === null ? undefined : v);
const text = z.preprocess(leerAlsFehlend, z.string().optional());

const termine = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/termine' }),
  schema: z.object({
    titel: z.string(),
    datum: z.coerce.date(),
    uhrzeit: text,
    ort: text,
    sektion: text,
    bild: text,
    bild_alt: text,
    plaetze: z.preprocess(leerAlsFehlend, z.coerce.number().int().positive().optional()),
    anmeldelink: text,
  }),
});

const aktuelles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/aktuelles' }),
  schema: z.object({
    titel: z.string(),
    datum: z.coerce.date(),
    sektion: text,
    bild: text,
    bild_alt: text,
    auszug: text,
  }),
});

export const collections = { termine, aktuelles };
