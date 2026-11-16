// Zentrale Stelle, an der alle Daten gelesen werden. Seiten greifen nur über diese Datei zu.
import { parse } from 'yaml';
import { getCollection, type CollectionEntry } from 'astro:content';
import vereinRoh from '../data/verein.yml?raw';
import sektionenRoh from '../data/sektionen.yml?raw';

export interface Person { name: string; funktion?: string; telefon?: string; email?: string }
export interface Gruppe {
  name: string; tag?: string; zeit?: string; ort?: string;
  ansprechperson?: string; telefon?: string; start?: string;
}
export interface Sektion {
  slug: string; name: string; eltern?: string; darstellung?: 'training' | 'kurse';
  kurztext?: string; text?: string;
  links?: { titel: string; url: string }[];
  gruppen?: Gruppe[]; ansprechpersonen?: Person[];
}
export interface Verein {
  name: string; kurzname: string; slogan?: string;
  adresse: { strasse: string; plz: string; ort: string };
  zvr: string; email: string; obmann?: string; kartenlink?: string;
  facebook?: string; instagram?: string;
  tally: { beitritt?: string; kontakt?: string };
  tarife?: { name: string; preis: string; hinweis?: string }[];
}

export const verein = parse(vereinRoh) as Verein;
export const sektionen = ((parse(sektionenRoh)?.sektionen ?? []) as Sektion[]).filter((s) => s?.slug);

export const WOCHENTAGE = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

export const hauptsektionen = sektionen.filter((s) => !s.eltern);
export const untersektionen = (slug: string) => sektionen.filter((s) => s.eltern === slug);
export const sektion = (slug?: string) => sektionen.find((s) => s.slug === slug);
export const sektionPfad = (s: Sektion) => (s.eltern ? `/${s.eltern}/${s.slug}` : `/${s.slug}`);
/** Slugs der Sektion und ihrer Unterseiten (für Termine/Beiträge auf der Sektionsseite). */
export const mitUnterseiten = (slug: string) => [slug, ...untersektionen(slug).map((s) => s.slug)];

export const kartenlink =
  verein.kartenlink ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${verein.adresse.strasse}, ${verein.adresse.plz} ${verein.adresse.ort}`,
  )}`;

// ---- Datum ----
/** Heutiges Datum in Österreich als JJJJ-MM-TT. */
export const heute = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Vienna' }).format(new Date());
export const iso = (d: Date) => d.toISOString().slice(0, 10);
const fmt = (d: Date | string, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('de-AT', { timeZone: 'UTC', ...o }).format(new Date(d));
export const datumLang = (d: Date | string) => fmt(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
export const datumKurz = (d: Date | string) => fmt(d, { day: 'numeric', month: 'long', year: 'numeric' });
export const tagZahl = (d: Date) => fmt(d, { day: 'numeric' });
export const monatKurz = (d: Date) => fmt(d, { month: 'short' }).replace('.', '');
export const istZukunft = (d?: string) => !!d && String(d).slice(0, 10) >= heute();

// ---- Termine und Beiträge ----
export type Termin = CollectionEntry<'termine'>;
export type Beitrag = CollectionEntry<'aktuelles'>;

/** Kommende Termine (heute eingeschlossen), nächster zuerst. */
export async function kommendeTermine(slugs?: string[]) {
  const h = heute();
  return (await getCollection('termine'))
    .filter((t) => iso(t.data.datum) >= h && (!slugs || slugs.includes(t.data.sektion ?? '')))
    .sort((a, b) => +a.data.datum - +b.data.datum);
}
/** Beiträge, neuester zuerst. */
export async function beitraege(slugs?: string[]) {
  return (await getCollection('aktuelles'))
    .filter((b) => !slugs || slugs.includes(b.data.sektion ?? ''))
    .sort((a, b) => +b.data.datum - +a.data.datum);
}

// ---- Kleinkram ----
/** tally.so/r/ID → tally.so/embed/ID */
export function tallyEmbed(link?: string) {
  const id = link?.match(/tally\.so\/(?:r|embed)\/([\w-]+)/)?.[1];
  return id ? `https://tally.so/embed/${id}?alignLeft=1&hideTitle=1&transparentBackground=1` : undefined;
}
export const telLink = (t: string) => `tel:${t.replace(/[^\d+]/g, '')}`;
export const absaetze = (t?: string) => (t ?? '').split(/\n\s*\n/).map((a) => a.trim()).filter(Boolean);
