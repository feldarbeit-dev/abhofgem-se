# Homepage der Sportunion Gschwandt

Statische Website mit [Astro](https://astro.build). Sie ersetzt die bisherige Wix-Seite und kostet im Betrieb nur die Domain.

## Inhalte pflegen (ohne Programmieren)

Der Editor ist [Pages CMS](https://app.pagescms.org): mit GitHub anmelden, dieses Repository auswählen. Es gibt vier Bereiche:

| Bereich | Datei | Inhalt |
| --- | --- | --- |
| Termine | `src/content/termine/*.md` | Veranstaltungen und Kurse mit Anmeldung |
| Aktuelles | `src/content/aktuelles/*.md` | Beiträge |
| Sektionen | `src/data/sektionen.yml` | Texte, Trainingszeiten, Kurse, Ansprechpersonen |
| Verein | `src/data/verein.yml` | Adresse, E-Mail, Obmann, Social Media, Tally-Links, Tarife |

Jede Information steht nur an einer Stelle. Die Kontaktseite sammelt die Ansprechpersonen zum Beispiel aus den Sektionen.

- **Bilder** landen in `public/bilder`.
- **Anmeldung zu einem Termin:** in Tally ein Formular anlegen und den Link (`https://tally.so/r/…`) beim Termin eintragen. Die Seite bettet das Formular ein.
- **Vergangene Termine** verschwinden von selbst aus den Listen, ein abgelaufener Saisonstart ebenso.
- **Neue Sektion:** in „Sektionen“ anlegen und den slug zusätzlich in `.pages.yml` bei `sektion_auswahl` eintragen. Eine Unterseite entsteht über das Feld „Unterseite von“ (zum Beispiel `fussball` → `/fussball/nachwuchs`).

Nach dem Speichern baut Cloudflare die Seite neu, nach ein bis zwei Minuten ist die Änderung online.

## Hosting: Cloudflare Pages

- Build-Befehl: `npm run build`
- Ausgabeverzeichnis: `dist`
- Umgebungsvariable: `NODE_VERSION` = `22.23.4` oder neuer (in `.nvmrc` hinterlegt)

## Lokal entwickeln

```bash
npm install
```

```bash
npm run dev
```

## Aufbau

- `src/lib/daten.ts` liest alle Daten und enthält die Hilfsfunktionen (Datum, Tally-Link, Filter).
- `src/pages/[...slug].astro` ist die eine Vorlage für alle Sektionsseiten.
- `src/styles/global.css` enthält ganz oben die Vereinsfarben und Schriften.
- Schriften liegen lokal im Projekt (`@fontsource`), es gibt keine Cookies und keine Tracker.
