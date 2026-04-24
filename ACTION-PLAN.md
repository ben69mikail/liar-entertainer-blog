# SEO ACTION-PLAN — liar-entertainer.com
**Ziel:** Besser platziert als die Konkurrenz in Clown · Zauberer · Kinderzauberer · Kindergeburtstag · Zaubershow + allen NRW-Städten
**Zeithorizont:** 12 Wochen bis zum messbaren Ranking-Sprung
**Prinzip:** Erst die kritischen Tracking-Lücken, dann Content-Offensive, dann lokaler Ausbau, dann Erwachsenen-Segment als zweiter Umsatzkanal.

---

## PHASE 0 — SOFORT (diese Woche, < 2 Stunden Arbeit)

### 🔥 P0-1: GSC-Verification aktivieren
**Datei:** `src/layouts/BaseLayout.astro`, Zeile 138–139
**Aktion:** Kommentar entfernen und echten Google-Site-Verification-Code einsetzen
```astro
<meta name="google-site-verification" content="DEIN_ECHTER_CODE" />
```
**Warum:** Ohne Verification kein Zugriff auf GSC-Daten — Du bist ranking-blind.
**Aufwand:** 5 Min.

### 🔥 P0-2: GA4-Tracking aktivieren
**Datei:** `src/layouts/BaseLayout.astro`, Zeile 202–211
**Aktion:** GA4-Snippet einkommentieren mit deiner GA4-Property-ID
**Warum:** Ohne Tracking keine Conversion-Daten, keine Optimierung, kein Remarketing. Jede Woche ohne GA4 = verlorene Daten für immer.
**Aufwand:** 5 Min.

### 🔥 P0-3: Google Business Profile prüfen & auffrischen
- NAP identisch zu Schema: "Beethovenstr. 15, 45966 Gladbeck"
- Alle 14 Service-Cities als Einzugsgebiet eintragen
- 5+ aktuelle Fotos (Show-Impressionen, Ballons, glückliche Kinder)
- Posts der letzten Woche? Falls nein: 3 Posts anlegen
- Q&A-Sektion: häufigste Fragen selbst beantworten
**Aufwand:** 45–60 Min.

### 🔥 P0-4: `aggregateRating` sanity check
**Problem:** Schema behauptet `reviewCount: "400"` — sind das wirklich 400 externe, verifizierbare Bewertungen (Google + Facebook + ProvenExpert zusammen)? Falls nicht, sofort korrigieren, sonst Google-Penalty-Risiko.
**Aufwand:** 15 Min.

---

## PHASE 1 — TECHNISCHE FUNDAMENTE (Woche 1–2)

### P1-1: VideoObject-Schema für Homepage-Video
**Datei:** `src/pages/index.astro`
Füge dem JSON-LD-Block ein VideoObject-Schema hinzu (Titel, Beschreibung, Thumbnail, Upload-Datum, Dauer, contentUrl, embedUrl). Google zeigt Videos mit Schema prominent in SERPs.
**Aufwand:** 20 Min.
**Impact:** Sichtbarere Homepage in SERPs

### P1-2: Product/Offer-Schema für die 3 Preiskarten
Auf `/kindergeburtstag/` und allen City-Pages: Jede der 3 Karten (Zaubershow 150€, Ballonmodellage +20€, Glitzer +40€) als `Offer` im `hasOfferCatalog` des Service-Schemas — damit Google Rich Snippets mit Preisen anzeigen kann.
**Aufwand:** 1 h einmalig, dann Template-Reuse
**Impact:** CTR-Boost durch Preis-Snippets in SERPs

### P1-3: City-Page-Bilder auf Astro-Pipeline migrieren
- Alle `https://liar-entertainer.com/wp-content/uploads/...`-URLs lokalisieren
- Nach `src/assets/cities/<stadt>/...` kopieren
- `<Image />` aus `astro:assets` mit `width`, `height`, `alt`, `loading="eager"` für Hero / `"lazy"` für Rest
- Automatisches WebP + AVIF + `srcset`
**Aufwand:** 1 Wochenende (alle 62 City-Pages)
**Impact:** LCP −30 bis −50%, CLS auf 0, bessere Google-Bildersuche-Sichtbarkeit

### P1-4: llms.txt um Preistabelle + USP-Sektion erweitern
Füge eine klar strukturierte Preisliste + "Warum LIAR?"-Block (400 Shows, 110k Kinder, 15 Jahre, zweisprachig DE/FR, Ballon + Glitzer + Zauber aus einer Hand) hinzu. Das macht LIAR als Empfehlung in Perplexity/ChatGPT/Claude 10× wahrscheinlicher.
**Aufwand:** 20 Min.
**Impact:** AI-Citation-Traffic (wachsender Kanal)

---

## PHASE 2 — CONTENT-OFFENSIVE (Woche 2–8)

**Ziel:** Aus 1 Blog-Seite → 25+ Artikel → +30% organischer Long-Tail-Traffic

### P2-1: Pillar-Content Blog (10 Hauptartikel in 4 Wochen)

| # | Titel (SEO-optimiert) | Keyword-Fokus | Länge |
|---|---|---|---|
| 1 | Was kostet ein Zauberer zum Kindergeburtstag in NRW? Der ehrliche Preisvergleich 2026 | "Zauberer Kindergeburtstag Kosten" | 1800 Wörter |
| 2 | Ab welchem Alter macht ein Kinderzauberer Sinn? | "Kinderzauberer Alter" | 1200 Wörter |
| 3 | Wie lange sollte eine Zaubershow für Kinder dauern? | "Zaubershow Dauer Kinder" | 1000 Wörter |
| 4 | Clown oder Zauberer? Was ist besser für den Kindergeburtstag? | "Clown oder Zauberer Kindergeburtstag" | 1400 Wörter |
| 5 | Checkliste: Perfekter Kindergeburtstag mit 6–10 Jahren | "Kindergeburtstag Checkliste" | 2000 Wörter |
| 6 | Luftballonmodellage für Kindergeburtstag: Figuren, Dauer, Kosten | "Luftballonmodellage Kindergeburtstag" | 1300 Wörter |
| 7 | Kindergeburtstag im Ruhrgebiet: 15 beste Locations | "Kindergeburtstag Ruhrgebiet Locations" | 2200 Wörter |
| 8 | Zaubershow drinnen oder draußen? Vor- und Nachteile | "Zaubershow drinnen draußen" | 900 Wörter |
| 9 | Glitzer-Tattoos für Kinder: Hautverträglich & langanhaltend | "Glitzer Tattoos Kinder" | 1100 Wörter |
| 10 | 7 Fehler bei der Buchung eines Kinderzauberers (und wie du sie vermeidest) | "Kinderzauberer buchen Tipps" | 1500 Wörter |

**Jeder Artikel muss haben:**
- H1 mit Haupt-Keyword
- 3–5 H2-Unterpunkte mit LSI-Keywords
- FAQ-Block am Ende (mit FAQPage-Schema)
- 2–3 interne Links zu relevanten City-Pages
- 1 interner Link zur `/kontakt/`-Seite
- Autor-Box mit Michaël Prescler (Person-Schema-Referenz)
- Veröffentlichungs-Datum + `datePublished`/`dateModified`
- Mindestens 1 eigenes Bild + 1 Embedded-Video (wo sinnvoll)

### P2-2: Stadt-spezifischer Long-Tail-Content (15 Artikel)
Für die Top-15-Städte jeweils einen Artikel:
- "Die 10 besten Locations für Kindergeburtstag in [Stadt]"
- Verlinkt auf die bestehende `geburtstag-in-[stadt]`-Page
- Verlinkt auf die `kinderzauberer-in-[stadt]`-Page
- Lokale Hooks: Museen, Parks, Indoor-Spielplätze, besondere Events
- **Vorteil:** Long-Tail-Traffic + interne Verlinkung stärkt die City-Pages selbst

### P2-3: YouTube-Content-Synergy
- 3 kurze Show-Clips pro Monat auf YouTube hochladen
- Jeden Clip als VideoObject-Schema auf der passenden Seite einbetten
- YouTube-Titel mit Stadt + "Kinderzauberer" / "Clown Zauberer" optimieren
- **Effekt:** Doppel-Ranking (YouTube + Website) für Long-Tail-Queries

---

## PHASE 3 — LOCAL SEO DOMINANZ (Woche 3–8, parallel)

### P3-1: NAP-Citations-Aufbau
Mindestens 15 konsistente Brancheneinträge mit identischer NAP:
- Gelbeseiten.de
- 11880.com
- Das Örtliche
- KennstDuEinen.de
- Yelp DE
- ProvenExpert (Review-Plattform)
- Crabbel.de (Event-Portal)
- Eventzone.de
- Mietmeile.de (Crucial — Konkurrent listet dort)
- Kindergeburtstag.events
- Eventpeppers.com
- Bluenote.de
- Gigmit.com
- Ruhrgebiet-Branchenverzeichnisse (mindestens 3)

**Wichtig:** NAP muss **Zeichen-für-Zeichen identisch** sein. "Beethovenstr. 15" vs "Beethovenstraße 15" → Google sieht das als 2 verschiedene Einträge.

### P3-2: Lokale Backlinks organisch aufbauen
Zielgruppe für Outreach:
- **Kitas im Ruhrgebiet** (Event-Tipps-Sektion ihrer Website)
- **Grundschulen** (Anbieter-Empfehlungen für Klassenfeste)
- **Event-Locations** (kinderfreundliche Räumlichkeiten — Tausch: "Unsere Empfehlungen")
- **Lokale Blogs** / Mami-Blogs (Gast-Artikel "Kindergeburtstag im Ruhrgebiet")
- **Karnevalsvereine** (für Clown-Auftritte, die dort empfohlen werden können)

**Ziel:** 20 Backlinks in 8 Wochen, jeweils von `.de`-Domains mit thematischem Bezug.

### P3-3: Google-Reviews-Strategie
- Nach jedem Event: Automatische E-Mail mit Bitte um Google-Review + direktem Link
- Ziel: 20 neue Google-Reviews in 12 Wochen
- Alle negativen Reviews (falls vorhanden) professionell beantworten
- Positive Reviews als Social-Proof auf Website einbinden (Review-Widget)

---

## PHASE 4 — ERWACHSENEN-SEGMENT (Woche 6–12)

**Lücke:** LIAR rankt 0 für "Zauberer Hochzeit NRW", "Zauberer Firmenfeier NRW", "Tischzauberer Köln".
**Gelegenheit:** Zweites Umsatzstandbein zu minimalen Mehrkosten.

### P4-1: Erwachsenen-Service-Pages auffrischen
Bestehende Seiten:
- `/zauberer/tisch-zauberer/` — ausbauen: eigene H1 "Tischzauberer NRW für Hochzeit & Firmenfeier", 1500+ Wörter, FAQ, ServiceSchema, 5 spezifische FAQs
- `/zauberer/buehnen-zauberer/` — gleicher Ausbau
- **Neue Seite:** `/zauberer/hochzeit/` mit Hochzeit-spezifischem Content
- **Neue Seite:** `/zauberer/firmenfeier/` mit B2B-Content (Product-Placement-Zauberei, Marken-Integration)

### P4-2: 10 Stadt-spezifische Adult-Landing-Pages
- `/zauberer/zauberer-koeln/` (greift Oliver Henke direkt an)
- `/zauberer/zauberer-dortmund/`
- `/zauberer/zauberer-essen/`
- `/zauberer/zauberer-duesseldorf/`
- `/zauberer/tischzauberer-koeln/` etc.
- Jede Seite 1200+ Wörter, ServiceSchema, lokale Hooks (z.B. welche Hotels/Event-Locations)

### P4-3: Backlink-Gap zum Gewinner ziehen
- Ahrefs/SEMrush-artige Analyse (später, wenn Budget da) der Backlinks von oliver-henke.com & mirkomatira.com
- 5–10 gleiche Quellen kontaktieren (Hochzeitsportale, Event-Location-Listen)

---

## PHASE 5 — MESSEN & ITERIEREN (fortlaufend)

### Weekly KPIs (im GA4 + GSC zu tracken)
1. Organischer Traffic pro Kategorie (Clown, Zauberer, Kinderzauberer, Kindergeburtstag, Zaubershow, Stadt-Pages)
2. Durchschnittliche Position für die Top-30 Keywords
3. Klicks & Impressions pro City-Page
4. Conversion-Rate (Kontaktformular-Absendungen / Sessions)
5. Backlink-Wachstum
6. Neue Google-Reviews

### Monthly Review-Rituale
- Welche Seiten gewinnen Positionen? → mehr interne Links dorthin lenken
- Welche Seiten verlieren? → Content-Update oder Konsolidierung
- Welche Queries bringen Clicks ohne dass wir dafür eine dedizierte Seite haben? → neue Seite bauen

---

## PRIORISIERTE ROADMAP ÜBERSICHT

| Woche | Kritische Aufgaben | Impact |
|---|---|---|
| **1** | GSC + GA4 aktivieren, GBP auffrischen, `aggregateRating` prüfen | Tracking steht |
| **1–2** | VideoObject + Product-Schema, llms.txt erweitern, Bilder-Migration beginnen | Rich Snippets |
| **2–4** | 5 Pillar-Blog-Artikel, NAP-Citations (15 Einträge), 5 Backlinks | Long-Tail beginnt |
| **4–6** | 5 weitere Pillar-Artikel, 5 Stadt-Long-Tail, Review-Kampagne starten | Momentum |
| **6–8** | Erwachsenen-Service-Pages ausbauen, restliche Stadt-Long-Tail-Artikel | Zweiter Kanal aktiv |
| **8–12** | Stadt-spezifische Adult-Pages, Backlink-Outreach für Erwachsenen-Markt | Dual-Dominanz |

---

## ERFOLGS-SCHWELLE NACH 12 WOCHEN

**Minimum-Ziele:**
- GSC/GA4 liefern saubere Daten
- 20+ Blog-Artikel live und indexiert
- 15+ neue Google-Reviews
- 15+ konsistente NAP-Citations
- 20+ neue Backlinks
- **Rankings:** Top-3 für alle 6 Haupt-Kategorie-Keywords + Top-3 für mindestens 15 NRW-Stadt-Keywords
- **Traffic:** +40% organisch vs. Baseline (nach GA4-Aktivierung gemessen)
- **Conversions:** mindestens +25% Kontaktanfragen

**Stretch-Ziele:**
- Top-1 für 3 der 6 Haupt-Kategorien
- Erste Rankings im Top-10 für "Zauberer Hochzeit NRW" oder "Firmenfeier NRW"
- 50+ Blog-Artikel, 30+ Reviews, 30+ Backlinks
- +60% organischer Traffic

---

## WAS DU HEUTE IN DEN NÄCHSTEN 30 MINUTEN MACHEN KANNST

1. GSC-Verification-Code in `BaseLayout.astro:138` einsetzen und deployen (5 Min)
2. GA4-Measurement-ID in `BaseLayout.astro:202` einsetzen und deployen (5 Min)
3. Google-Business-Profile öffnen, 3 neue Fotos hochladen, 1 Post schreiben (15 Min)
4. In ProvenExpert / Gelbeseiten-Account einloggen und NAP-Daten verifizieren (5 Min)

→ **Damit hast du die Voraussetzung für alle weiteren Optimierungen geschaffen und die Blind-Flug-Phase beendet.**
