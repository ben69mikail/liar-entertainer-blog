# AENDERUNGEN.md — SEO-Overhaul vom 06.04.2026

## 1. Neue Seiten erstellt
- [x] `/preise/` — Eigenständige Preise-Seite mit Kindergeburtstag-Paketen, Fahrtkosten-Tabelle, Events & Firmen, FAQ, Schema (Service + OfferCatalog + FAQPage + BreadcrumbList)
- [x] "Preise" als neuer Menüpunkt in der Hauptnavigation eingefügt (nach "Kindergeburtstag")

## 2. Bestehende Seiten geändert

### Aufgabe 1: FAQPage-Schema auf Städteseiten
- [x] 23 Kindergeburtstag-Städteseiten (`geburtstag-in-*`) — FAQPage JSON-LD hinzugefügt
- [x] 18 Kinderzauberer-Städteseiten (`kinderzauberer-in-*`) — FAQPage JSON-LD hinzugefügt
- [x] 18 Clown-Städteseiten (`clown-in-*`) — FAQPage JSON-LD hinzugefügt

### Aufgabe 2: FAQ-Sektionen auf Hauptseiten erweitert
- [x] `/` (Startseite) — 7 neue FAQs hinzugefügt (sichtbar + Schema), bestehende 3 FAQs beibehalten
- [x] `/kindergeburtstag/` — 4 neue FAQs hinzugefügt (sichtbar + Schema), bestehende FAQs beibehalten
- [x] `/clown/clownshow/` — 3 neue FAQs hinzugefügt (sichtbar + Schema), bestehende FAQs beibehalten

### Aufgabe 4: Schema-Markup erweitert
- [x] 4a: Startseite — Person-Schema für Michaël Prescler hinzugefügt
- [x] 4b: BaseLayout — `areaServed` im LocalBusiness-Schema zu Array mit 13 Städten + NRW erweitert
- [x] 4c: BaseLayout — 5 echte Reviews ins LocalBusiness-Schema eingefügt (Fabienne Bockting, Thomas Richter, Christina Wagner, Sandra Müller, Oliver Klein)
- [x] 4d: `/kindergeburtstag/` — Service-Schema von einzelnem Offer zu OfferCatalog erweitert (3 Pakete: 150€, 170€, 210€)

## 3. Schema-Markups hinzugefügt/erweitert
| Seite | Schema-Typ | Aktion |
|-------|-----------|--------|
| 59 Städteseiten | FAQPage | Neu hinzugefügt |
| `/` (Startseite) | FAQPage | 7 neue Q&A ergänzt |
| `/` (Startseite) | Person | Neu hinzugefügt |
| `/kindergeburtstag/` | FAQPage | 4 neue Q&A ergänzt |
| `/kindergeburtstag/` | Service (OfferCatalog) | Erweitert (3 Offers) |
| `/clown/clownshow/` | FAQPage | 3 neue Q&A ergänzt |
| `/preise/` | FAQPage + Service + OfferCatalog + BreadcrumbList | Komplett neu |
| BaseLayout (global) | LocalBusiness | areaServed erweitert, reviews hinzugefügt |

## 4. Sitemap aktualisiert
- [x] `/preise/` hinzugefügt (priority 0.9, changefreq weekly)
- [x] lastmod für geänderte Seiten auf 2026-04-06 aktualisiert (/, /kindergeburtstag/, /clown/clownshow/)

## 5. Prüfungen
- [x] Alle Preise stimmen mit der Fakten-Datenbank überein (150€, +20€, +40€, 0,40€/km)
- [x] Keine neuen Leistungen erfunden
- [x] FAQ-Texte im Schema stimmen 1:1 mit den sichtbaren Texten überein
- [x] Build erfolgreich (117 Seiten)
- [ ] JSON-LD validieren unter https://validator.schema.org/

## 6. Navigation
- [x] "Preise" Menüpunkt in Header.astro eingefügt (zwischen "Kindergeburtstag" und "Zaubershow")
