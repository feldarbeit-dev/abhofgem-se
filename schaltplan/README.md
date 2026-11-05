# 30kV Freischaltplaner (Netzservice Gmunden)

Web-App (eine HTML-Datei, kein Server nötig) zum Planen von Freischaltungen im 30kV-Netz.

## Benutzung

`index.html` im Browser öffnen (am besten über einen einfachen Webserver, damit der Hintergrundplan `netzplan-30kv.jpg` geladen wird, z. B. `python3 -m http.server` in diesem Ordner).

**Freischalten**
1. In der Karte eine Leitung (Leitungsabschnitt) oder eine Station antippen – oder oben suchen.
2. Die App zeigt grafisch:
   - den Freischaltbereich (rot),
   - die zu betätigenden Schalter mit Schritt-Nummer (rot = AUS, grün = EIN),
   - den Netzzustand nach der Freischaltung (Leitungsfarbe = speisender UW-Abgang, grau = spannungslos).
3. Rechts steht die Schaltfolge: Vorbereitung, Freischalten, Wiederversorgung über Trennstellen, NS-Seite, 5 Sicherheitsregeln, Rückschaltung. Schritte können abgehakt, gedruckt oder als Text kopiert werden.

Optionen: *Ganze Station* oder *nur Transformator*, und *Umschalten ohne Unterbrechung* (Trennstelle zuerst schließen = Ringschluss; Warnung, wenn verschiedene UW beteiligt sind).

**Netz bearbeiten**
- `+ Station` / `+ Abzweig` / `+ UW`: in die Karte tippen; auf eine Leitung tippen = in die Leitung einfügen.
- `Leitung zeichnen`: Station A → Knickpunkte → Station B.
- Schalter antippen = EIN (blau) ⇄ AUS/Trennstelle (gelb).
- Schaltertypen je Leitungsende: Lasttrennschalter (Kreis), Leistungsschalter (UW, Quadrat abgerundet), Trennschalter (Quadrat) oder kein Schalter (Stichstation / Abzweig).
- Daten werden im Browser gespeichert; mit **Export JSON / Import JSON** sichern und weitergeben.

## Funktionsweise

- Netzmodell: Knoten (UW, Station, Abzweig) + Leitungsabschnitte; an jedem Leitungsende optional ein Schalter mit Normalstellung.
- Freischaltbereich = Ziel + alles, was ohne Schalter dranhängt (z. B. über T-Abzweige). Die Schalter an der Grenze werden ausgeschaltet.
- Danach wird geprüft, welche Stationen spannungslos würden. Trennstellen werden so lange geschlossen (größter Gewinn zuerst), bis alles wieder versorgt ist, was versorgt werden kann.

## Wichtig

- Das **Beispielnetz** deckt nur den Bereich UW Gmunden – Altmünster – Traunkirchen ab und wurde aus dem Übersichtsplan abgelesen. Nummern, Namen, Schalter und Trennstellen bitte prüfen; das übrige Netz ist im Editor zu ergänzen.
- Die Schaltfolge ist ein Vorschlag auf Basis der erfassten Daten (Normalschaltzustand) und ersetzt nicht die Prüfung durch Schaltberechtigte und die gültigen Betriebsvorschriften.
