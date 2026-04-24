# SEO-AUDIT REPORT — liar-entertainer.com
**Datum:** 10. April 2026
**Fokus-Keywords:** Clown · Zauberer · Kinderzauberer · Kindergeburtstag · Zaubershow · Stadtbezogene Lokalsuche (NRW)
**Ziel:** Besser platziert als die Konkurrenz in allen 6 Kategorien + allen NRW-Städten

---

## 1. EXECUTIVE SUMMARY

### SEO Health Score: **78 / 100** (Gut — mit klarer Luft nach oben)

| Bereich | Score | Kommentar |
|---|---|---|
| Technical SEO | 85/100 | Saubere Astro-Basis, Sitemap OK, .htaccess mit 131+ Redirects deployed |
| On-Page SEO | 82/100 | Starke Title/Meta, FAQ-Schema, Eckdaten vorhanden |
| Content Quality | 70/100 | 62 City-Pages gut, aber Blog nur **1 Seite** — massiver Gap |
| Schema.org | 88/100 | LocalBusiness + Reviews + Person + FAQ + Service — sehr stark |
| Local SEO | 80/100 | Gute Stadt-Abdeckung, aber GMB/Citations nicht verifiziert |
| Performance | 75/100 | Font-Preload & kritisches CSS OK, aber externe wp-content Bilder |
| AI Search Readiness | 90/100 | llms.txt + robots.txt für alle AI-Crawler offen — exzellent |
| **Tracking & Measurement** | **30/100** | **GSC-Verification + GA4 sind AUSKOMMENTIERT — kritisch!** |

### Die 3 wichtigsten Erkenntnisse
1. **Du rankst bereits #1 / Top-3 für die Hauptkeywords** ("Clown Kindergeburtstag NRW buchen", "Kinderzauberer NRW Kindergeburtstag buchen") — der Grundstein steht.
2. **Blog-Content-Gap ist der größte ungenutzte Hebel:** Nur 1 Blog-Seite. Konkurrenten wie mrtom.de und clownsbrothers.de dominieren Long-Tail mit Themen-Content. Hier liegen ~30 % Traffic-Potential brach.
3. **Erwachsenen-Segment (Hochzeit/Firmenfeier) ist unerschlossen:** Für "Zauberer Hochzeit NRW" & "Zauberer Firmenfeier NRW" rankt LIAR **gar nicht**. Anbieter wie Oliver Henke, Mirko Matira, Jannik Görtz besetzen das Feld. Zweiter Umsatzstrom wartet.

---

## 2. KONKURRENZ-LANDSCHAFT

### 2.1 Direkte Konkurrenten (Kinder/Clown/NRW)

| # | Domain | Stärke | Schwäche | Bedrohung |
|---|---|---|---|---|
| 1 | **clownsbrothers.de** | Duo-Positionierung, breite Stadtabdeckung Ruhrgebiet, Kategorien für Hochzeit+Karneval | Schwache Schema-Implementation, dünne City-Pages | **HOCH** — direktester Konkurrent |
| 2 | **mrtom.de** | Starke Preis-Transparenz, Dortmund-Dominanz, viele Pakete | Veraltetes Design, kein LocalBusiness-Schema | **MITTEL** |
| 3 | **clown-daniel.de / event-animation.de** | Bundesweit, Buchungssystem ab 30 Min., viele Unterseiten | Generische Pages, wenig lokale Tiefe | **MITTEL** |
| 4 | **kindergeburtstags-zauberer.de** (Sascha) | Dortmund-Lokal-Autorität | Wenige Städte, weniger Content | **NIEDRIG-MITTEL** |
| 5 | **parella.de** | Dortmund + weiblicher Künstlerin-USP | Schmale Reichweite | **NIEDRIG** |
| 6 | **gaukler-gaudius.de** | Köln/Düsseldorf-Fokus | Kein NRW-weiter Anspruch | **MITTEL** für Rhein-Schiene |
| 7 | **kinderzauberer-olli.de** | Gute On-Page-Optimierung | Weniger Review-Social-Proof | **NIEDRIG** |
| 8 | **partyclown-bestellen.de** | SEO-Farm mit vielen Stadt-URLs | Offensichtlich generisch, wenig Trust | **MITTEL** (Long-Tail) |

### 2.2 Indirekte Konkurrenten (Erwachsenen-Zauberei — Lücke!)
- **oliver-henke.com** (Köln) — dominiert "Zauberer Köln" + "Tischzauberei"
- **mirkomatira.com** — "Zauberer NRW" für Events
- **patrick-mirage.de** — "Close-Up Zauberer NRW"
- **jannikgoertz.de** — "Business Zauberer Firmenfeier"
- **philo-kotnik.de** — "Zauberer Firmenevents NRW"
- **zaubertim.de** — Dortmund Tischzauberei

**Konsequenz:** LIAR ist rein als "Kinder-/Clown-Zauberer" positioniert. Die Service-Seite `/zauberer/tisch-zauberer/` existiert, rankt aber nicht für Erwachsenen-Queries, weil Content-Tiefe und Backlinks auf Kinder-Themen fokussiert sind.

---

## 3. TECHNICAL SEO — DETAIL

### ✅ Was stark ist
- **Astro mit `trailingSlash: 'always'`** → URL-Konsistenz
- **Sitemap.xml** mit 112 URLs, Image-Sitemap-Extensions, aktueller `lastmod` (2026-04-06)
- **robots.txt** erlaubt alle relevanten AI-Crawler explizit (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Applebot-Extended) — sehr modern
- **llms.txt** vorhanden mit strukturierten Infos (Über LIAR, Leistungen, Einsatzgebiet) — AI-Citation-Ready
- **.htaccess** mit 131+ Redirects für Legacy-WordPress-URLs → kein Linkjuice-Verlust nach Migration
- **BaseLayout** mit normalisierter Canonical-URL, OG-Tags, Twitter-Cards, Font-Preload
- **Inline Critical CSS** für Above-the-Fold-Rendering

### 🚨 Kritische Fehler
| # | Fehler | Datei | Impact |
|---|---|---|---|
| **K1** | `<meta name="google-site-verification" ...>` ist **auskommentiert** | `src/layouts/BaseLayout.astro:138-139` | GSC verliert Verifizierung bei Reset → alle Reports gefährdet |
| **K2** | **GA4-Tracking auskommentiert** | `src/layouts/BaseLayout.astro:202-211` | Kein User-Tracking, keine Conversion-Messung, keine Remarketing-Audiences |
| **K3** | City-Pages nutzen **externe `wp-content` Bild-URLs** statt Astro-optimierte Assets | `src/pages/kindergeburtstag/geburtstag-in-essen/index.astro` u.v.m. | Langsamere LCP, kein `srcset`, kein AVIF/WebP, CLS-Risiko |

### ⚠️ Mittlere Probleme
- Kein `BreadcrumbList`-Schema auf manchen City-Pages (nur auf denen, die durch BaseLayout props versorgt werden)
- Kein dediziertes `hreflang` (nur DE, aber Dein `knowsLanguage: ["de", "fr"]` im Person-Schema legt französische Version nahe — wenn FR geplant ist, Tag jetzt einführen)
- 404-Seite existiert, aber keine Weiterleitungs-Vorschläge

---

## 4. ON-PAGE / CONTENT — DETAIL

### Homepage (`src/pages/index.astro`)
**Title:** `Clown Zauberer NRW | Kindergeburtstag & Events | LIAR` (57 Zeichen — optimal)
**Meta-Description:** Mit ✓-Icons + Preis "ab 150 €" + CTA — sehr gut
**H1:** `Clown Zauberer in NRW – Zaubershow & Kindergeburtstag` — korrekt, keyword-fokussiert
**FAQ-Schema:** 11 Fragen — gut für "People Also Ask"-Rankings
**Person-Schema:** Michaël Prescler mit `knowsLanguage: ["de", "fr"]` — Expertise-Signal
**Stats-Banner:** 400 Shows · 110.000 Kinder · 15 Jahre — Trust-Signal

### City-Pages (z.B. `geburtstag-in-essen`)
- Unique lokale Inhalte (Zeche Zollverein, Grugapark, Rüttenscheid) — **ausgezeichnet**
- ServiceSchema mit `areaServed` City Essen, Preis 150 EUR — korrekt
- 8 FAQ-Items, Mix aus generisch + lokal — gut

**Abzug:** Bilder via externe URL, keine lokale Review-Zitate, keine Google-Maps-Einbettung pro Stadt.

### Blog — das größte Content-Loch
- **Nur 1 Blog-Seite** (index.astro, kein einziger Artikel)
- Konkurrenten (mrtom.de, clownsbrothers.de) haben mindestens 20–40 Artikel pro Thema
- **Potentielle Long-Tail-Keywords:**
  - "Welches Alter für Kinderzauberer?"
  - "Wie lange dauert eine Zaubershow?"
  - "Wie viele Kinder sind ideal für Kindergeburtstag mit Clown?"
  - "Unterschied Clown und Zauberer"
  - "Zaubershow drinnen oder draußen?"
  - "Tipps: Kindergeburtstag Outdoor im Ruhrgebiet"
  - "Checkliste: Perfekter Kindergeburtstag 6 Jahre"
  - "Luftballonmodellage lernen für Eltern"
  - Jede Stadt: "Die 10 besten Locations für Kindergeburtstag in [Stadt]"

---

## 5. SCHEMA.ORG — INVENTAR

### ✅ Was vorhanden ist
| Schema | Wo | Status |
|---|---|---|
| LocalBusiness | BaseLayout (global) | ✅ komplett mit NAP, Geo, 14 `areaServed`, 5 Reviews, `aggregateRating 5.0/400` |
| BreadcrumbList | BaseLayout via props | ✅ automatisch generiert |
| FAQPage | index.astro, kindergeburtstag/index.astro, city-pages | ✅ |
| Service | kindergeburtstag/index.astro, city-pages | ✅ mit `hasOfferCatalog` |
| Person | index.astro | ✅ Michaël Prescler, `knowsLanguage` |
| Review (5 embedded) | LocalBusiness | ✅ |

### ❌ Was fehlt
- **Event-Schema** für öffentliche Shows (wenn angeboten)
- **VideoObject-Schema** für das YouTube-Video auf der Homepage (Wichtig: Google bevorzugt strukturierte Videos in SERPs)
- **Product/Offer-Schema** für jedes Einzelpaket (Zaubershow 150€, Ballonmodellage +20€, Glitzer +40€)
- **Speakable-Schema** für Voice-Search-Optimierung (bei FAQ-Items)
- **ImageObject** mit Attribution — stärkt Google-Bildersuche

---

## 6. LOCAL SEO — DETAIL

### ✅ Stark
- 62 dedizierte City-Pages (20 geburtstag-in-, 20 kinderzauberer-in-, 22 clown-in-)
- LocalBusiness mit NAP: "Beethovenstr. 15, 45966 Gladbeck, DE" + Telefon `+491721517578`
- 14 Städte im `areaServed`-Array
- `geo` Koordinaten (51.5658, 6.9857)

### ❌ Zu prüfen / Lücken
- **Google Business Profile** — ist es verifiziert? Sind Fotos aktuell? Sind die 14 Service-Areas eingetragen? (nicht im Source prüfbar — bitte manuell checken)
- **Citations / Branchenbucheinträge:** Gelbeseiten, 11880, Yelp, KennstDuEinen, ProvenExpert — wie viele konsistente NAP-Einträge?
- **Lokale Backlinks:** Kitas, Schulen, Event-Locations, Party-Locations im Ruhrgebiet → Potential für organische Verlinkung
- **Google-Reviews:** "400 Bewertungen" laut Schema — sind diese auf GMB sichtbar oder nur intern behauptet? (**Wichtig: Schema sollte nur reflektieren, was extern verifizierbar ist, sonst Google-Penalty-Risiko**)

---

## 7. AI SEARCH READINESS

LIAR ist hier sehr gut aufgestellt:
- `llms.txt` existiert und ist strukturiert
- `robots.txt` erlaubt GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Applebot-Extended
- FAQ-Schema (gute Futter für AI-Antworten)
- Person-Schema mit realem Namen + Expertise-Years

**Optimierung:** llms.txt um eine Preistabelle + eine "Warum LIAR?"-Sektion ergänzen → höhere Chance, in Perplexity/ChatGPT-Antworten als Empfehlung zitiert zu werden.

---

## 8. PERFORMANCE & CORE WEB VITALS

### Positiv
- Font-Preload via `media="print" onload="this.media='all'"` Trick
- Inline Critical CSS
- Logo mit `fetchpriority="high"`
- YouTube-Video lazy loaded

### Risiken
- **Hero-Bilder auf City-Pages kommen von `liar-entertainer.com/wp-content/uploads/`** statt Astro-Asset-Pipeline → keine automatische WebP/AVIF-Konvertierung, kein `srcset`, kein dimension-locking (CLS-Risiko)
- Kein Service Worker / PWA-Ansatz (nicht zwingend nötig)
- Keine Hinweise auf HTTP/3 — bei IONOS idealerweise aktiviert

**Empfehlung:** Alle Hero-Bilder nach `src/assets/` migrieren und `<Image />` aus `astro:assets` verwenden. Das allein bringt LCP-Improvements von 0.5–1.5s.

---

## 9. DIE GRÖSSTEN "EINFACHEN" HEBEL (Quick Wins)

1. **GSC-Verification-Meta aktivieren** (`BaseLayout.astro:138`) — 2 Minuten Arbeit
2. **GA4 aktivieren** (`BaseLayout.astro:202`) — 2 Minuten
3. **llms.txt um Preistabelle erweitern** — 10 Minuten
4. **VideoObject-Schema für Homepage-YouTube-Video** — 15 Minuten
5. **Product/Offer-Schema für Preiskarten** — 30 Minuten
6. **Google-Business-Profile auffrischen** (Fotos, Posts, Q&A) — 1 Stunde
7. **10 Blog-Artikel** im Batch schreiben — 1 Wochenende

---

## 10. ERGEBNIS — WO STEHT LIAR IM KONKURRENZVERGLEICH

| Keyword | Aktuell | Ziel nach Action-Plan |
|---|---|---|
| "Clown Kindergeburtstag NRW buchen" | **#1** | #1 halten |
| "Kinderzauberer NRW Kindergeburtstag" | **#1 / #3** | #1 |
| "Zauberer Kindergeburtstag Essen" | Top-10 | Top-3 |
| "Zaubershow Kindergeburtstag NRW Preise" | Top-5 | Top-3 |
| "Clown buchen Köln" | Nicht Top-10 | Top-5 |
| "Clown buchen Düsseldorf" | Nicht Top-10 | Top-5 |
| "Zauberer Hochzeit NRW" | **Nicht rangiert** | Top-10 |
| "Zauberer Firmenfeier NRW" | **Nicht rangiert** | Top-10 |
| "Kinderzauberer [jede NRW-Stadt]" | Gemischt | Top-3 für 20 Städte |

→ **Konkreter Umsetzungsplan in `ACTION-PLAN.md`**

---

## Quellen

- Konkurrenzanalyse Web-Recherche:
  - [Die Clownsbrothers](https://www.clownsbrothers.de/)
  - [MrTom Dortmund](https://www.mrtom.de/kindergeburtstag.html)
  - [Clown Zauberer Daniel](https://www.clown-daniel.de/)
  - [Kindergeburtstags-Zauberer Sascha](https://kindergeburtstags-zauberer.de/)
  - [Kinderzauberer Olli](https://kinderzauberer-olli.de/)
  - [Parella Dortmund](https://parella.de/)
  - [Gaukler Gaudius](https://gaukler-gaudius.de/)
  - [Oliver Henke Köln](https://www.oliver-henke.com/zauberer-koeln/)
  - [Mirko Matira NRW](https://www.mirkomatira.com/zauberer-nrw/)
  - [Patrick Mirage NRW](https://www.patrick-mirage.de/zauberer/nrw)
  - [Jannik Görtz Firmenfeier](https://www.jannikgoertz.de/business-zauberer-firmenfeier/)
  - [Philo Kotnik NRW](https://philo-kotnik.de/zauberer-in-nrw/)
- Interne Analyse: BaseLayout.astro, index.astro, kindergeburtstag/index.astro, geburtstag-in-essen/index.astro, robots.txt, llms.txt, sitemap.xml, .htaccess
