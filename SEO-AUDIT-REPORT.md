# SEO Audit Report — www.liar-entertainer.com

**Datum:** 7. April 2026
**Audit-Typ:** Vollständiges SEO-Audit mit Überprüfung der Claude-Code-Vorschläge
**Geprüfte Seiten:** 97 (.astro-Dateien), 100+ URLs in Sitemap
**Business-Typ:** Local Service Business (SAB — Service Area Business)

---

## SEO Health Score: 62 / 100

| Kategorie | Score | Gewicht | Gewichtet |
|-----------|-------|---------|-----------|
| Technical SEO | 55/100 | 22% | 12.1 |
| Content Quality | 65/100 | 23% | 15.0 |
| On-Page SEO (Meta-Tags) | 50/100 | 20% | 10.0 |
| Schema / Structured Data | 80/100 | 10% | 8.0 |
| Performance | 70/100 | 10% | 7.0 |
| AI Search Readiness | 85/100 | 10% | 8.5 |
| Images | 30/100 | 5% | 1.5 |
| **Gesamt** | | | **62.1** |

---

## Executive Summary

### Top 5 Kritische Probleme

1. **SITEMAP ↔ CANONICAL MISMATCH** — Sitemap verwendet `https://liar-entertainer.com/` (ohne www), Canonical-Tags verwenden `https://www.liar-entertainer.com/`. Google sieht zwei verschiedene URLs für jede Seite.
2. **ALTE WORDPRESS-URLs NOCH IN GOOGLE INDEXIERT** — Google zeigt noch alte Pfade wie `/clown/kindergeburtstag/geburtstag-in-bottrop/`, `/content/impressum/`, `/tag/recklinghausen/` — diese sind NICHT in der .htaccess-Redirect-Liste.
3. **57 City-Pages mit fast identischen Meta-Descriptions** — Massive Duplicate-Content-Signale bei den Descriptions.
4. **~30 Titles über 70 Zeichen** — Werden in SERPs abgeschnitten. Schlimmster Fall: kinderzauberer-in-bottrop mit 97 Zeichen.
5. **Grammatikfehler in 18 Clown-Pages** — "DER französischer" statt "DER französische" in allen clown-in-* Descriptions.

### Top 5 Quick Wins

1. `astro.config.mjs` → `site` auf `https://www.liar-entertainer.com` ändern (behebt Sitemap-Mismatch sofort)
2. Fehlende 301-Redirects für alte WordPress-URLs in .htaccess ergänzen
3. Bühnenzauberer: "300+" → "400+" in Description und Content korrigieren
4. "mitTOP" → "mit TOP" auf kinderzauberer-in-dorsten fixen
5. Alle Clown-Descriptions: Grammatikfehler "DER französischer" → "DER französische" korrigieren

---

## 1. KRITISCH — Sitemap ↔ Canonical URL Mismatch

### Das Problem
```
astro.config.mjs:  site: 'https://liar-entertainer.com'     ← OHNE www
.htaccess:         RewriteRule → www.liar-entertainer.com     ← MIT www
Canonical-Tags:    https://www.liar-entertainer.com/...       ← MIT www
Sitemap-URLs:      https://liar-entertainer.com/...           ← OHNE www
```

### Warum das kritisch ist
Google empfängt widersprüchliche Signale: Die Sitemap meldet URLs ohne www, die Canonical-Tags zeigen URLs mit www. Das kann dazu führen, dass Google die falsche Version indexiert oder beide Versionen als separate Seiten behandelt (Duplicate Content).

### Fix
```javascript
// astro.config.mjs — Zeile 5 ändern:
site: 'https://www.liar-entertainer.com',  // MIT www!
```

Nach dem Fix: Sitemap neu generieren, in Google Search Console einreichen.

### Zusätzlich in der Sitemap
Die Sitemap enthält noch zwei URLs, die per .htaccess 301-redirected werden:
- `https://liar-entertainer.com/clown/clown-zauberer/` → redirected zu `/clown/clownshow/`
- `https://liar-entertainer.com/zauberer/zaubershow/karneval/` → redirected zu `/clown/karneval/`

Diese sollten aus der Sitemap entfernt werden.

---

## 2. KRITISCH — Alte WordPress-URLs noch bei Google indexiert

### Gefundene alte URLs in Google (die NICHT korrekt redirected werden)

| Alte URL (bei Google indexiert) | Korrekte neue URL | Redirect vorhanden? |
|---|---|---|
| `/content/impressum/` | `/impressum/` | ❌ FEHLT |
| `/content/kontakt/` | `/kontakt/` | ❌ FEHLT |
| `/tag/recklinghausen/` | `/blog/` oder Homepage | ⚠️ Nur generisch `/tag/*` → `/blog/` |
| `/clown/kindergeburtstag/` | `/kindergeburtstag/` | ❌ FEHLT |
| `/clown/kindergeburtstag/geburtstag-in-bottrop/` | `/kindergeburtstag/geburtstag-in-bottrop/` | ❌ FEHLT |
| `/clown/kindergeburtstag/geburtstag-in-duesseldorf/` | `/kindergeburtstag/geburtstag-in-duesseldorf/` | ❌ FEHLT |
| `/clown/zauberer/zaubershow/strassen-sommer-fest/` | `/zauberer/zaubershow/strassen-sommer-fest/` | ❌ FEHLT |
| `/kinder-festival-mit-clown-liar/` | `/blog/...` (entsprechender Blog-Post) | ❌ FEHLT |

### Warum das kritisch ist
- Jede alte URL, die Google kennt und die zu einer 404-Seite führt, verschwendet Crawl-Budget
- Bestehende Backlinks zu diesen alten URLs geben keinen Link-Juice weiter
- Nutzer, die über alte Google-Ergebnisse kommen, landen im Nirgendwo

### Fix — Diese Redirects in `.htaccess` ergänzen
```apache
# Alte WordPress URL-Struktur: /content/xxx/ → /xxx/
RewriteRule ^content/(.*)$ /$1 [R=301,L]

# Alte Struktur: /clown/kindergeburtstag/ → /kindergeburtstag/
RewriteRule ^clown/kindergeburtstag/?$ /kindergeburtstag/ [R=301,L]
RewriteRule ^clown/kindergeburtstag/(.*)$ /kindergeburtstag/$1 [R=301,L]

# Alte verschachtelte Pfade
RewriteRule ^clown/zauberer/(.*)$ /zauberer/$1 [R=301,L]

# Alte Blog-Posts ohne /blog/ Prefix
RewriteRule ^kinder-festival-mit-clown-liar/?$ /blog/ [R=301,L]
```

**EMPFEHLUNG:** In Google Search Console unter "Seiten" → "Nicht indexiert" prüfen, welche alten URLs Google noch kennt. ALLE davon brauchen 301-Redirects.

---

## 3. META-TAG ANALYSE — Bewertung der Claude-Code-Vorschläge

### Vorschläge, die ich BESTÄTIGE (✅ korrekt)

| Problem | Claude-Code-Vorschlag | Meine Bewertung |
|---------|----------------------|-----------------|
| "DER französischer" (Grammatik) | Auf allen 18 clown-in-* fixen | ✅ Korrekt — Grammatikfehler fixen |
| Titles über 70 Zeichen | Kürzen auf max 60 Zeichen | ✅ Korrekt — Google schneidet bei ~60 ab |
| "mitTOP" Tippfehler | kinderzauberer-in-dorsten fixen | ✅ Korrekt — Leerzeichen einfügen |
| "300+" → "400+" | buehnen-zauberer | ✅ BESTÄTIGT — Live-Seite zeigt noch "300+" |
| "...ICH!" unprofessionell | Aus allen kinderzauberer-in-* entfernen | ✅ Korrekt — wirkt unprofessionell |
| Descriptions zu kurz | blog, galerie, zauberer, schule | ✅ Korrekt — unter 140 Zeichen |

### Vorschläge, die ich VERBESSERN würde (🔧)

#### Title-Muster für City-Pages

**Claude-Code-Vorschlag:**
```
Kindergeburtstag in [Stadt] | Clown Zauberer LIAR ab 150€
```

**Mein verbesserter Vorschlag:**
```
Kindergeburtstag [Stadt] | Zaubershow ab 150€ ✓ LIAR
```

**Warum besser:**
- "in" weglassen spart 3 Zeichen → mehr Platz für Keyword-Varianten
- "Zaubershow" als zusätzliches Keyword (statt "Clown Zauberer" zu wiederholen)
- ✓ als visueller Eye-Catcher in SERPs (funktioniert besser als Emojis)
- LIAR am Ende als Brand-Signal

**Aber Achtung:** Aktuell haben die geburtstag-in-* Seiten schon überarbeitete Titles (z.B. "Geburtstag in Essen - Witzig! Magisch! Unvergesslich! | Clown Zauberer LIAR" = 75 Zeichen). Diese sind noch zu lang, aber das Muster ist bereits besser als der Claude-Code-Vorschlag.

#### Description-Muster für City-Pages

**Claude-Code-Vorschlag (identisch für alle):**
```
Kindergeburtstag in [Stadt] mit Clown Zauberer LIAR ✓ Zaubershow ab 150€ ✓ Ballonmodellage ✓ Glitzer Tattoos ✓ 400+ Top-Bewertungen ✓ Jetzt buchen!
```

**Mein verbesserter Vorschlag (EINZIGARTIG pro Stadt):**

Für geburtstag-in-essen:
```
Kindergeburtstag in Essen feiern! Clown Zauberer LIAR ✓ Zaubershow ab 150€ ✓ Ballonmodellage ✓ 400+ Bewertungen. Auch in Mülheim & Oberhausen.
```

Für geburtstag-in-bochum:
```
Kindergeburtstag in Bochum unvergesslich machen! Clown LIAR ✓ Zaubershow ab 150€ ✓ Glitzer-Tattoos ✓ 400+ Bewertungen. Auch in Herne & Dortmund.
```

**Warum besser:**
- Jede Description erwähnt 2-3 **Nachbarstädte** → einzigartig pro Seite
- Abwechselnde Formulierungen ("feiern!", "unvergesslich machen!", "mit Zauber!") → kein Duplicate
- Google belohnt einzigartige Descriptions mit höherer CTR

### Vorschläge, die ich ABLEHNE (❌)

| Vorschlag | Warum ich ablehne |
|-----------|-------------------|
| LIAR in JEDEN Title | Für City-Pages nicht nötig — der Brand steht schon im `og:site_name` und Schema.org. Platz lieber für Keywords nutzen. LIAR sollte nur bei Hauptseiten im Title stehen. |
| Emojis komplett entfernen | Die ✓-Checkmarks in der Homepage-Description funktionieren gut. Nur die ⭐ im Title entfernen (rendert nicht überall). ✓ dagegen rendert zuverlässig. |

### NEUE Probleme, die Claude Code NICHT gefunden hat

| Problem | Betroffene Seiten | Schwere |
|---------|-------------------|---------|
| Sitemap ↔ Canonical Mismatch (www vs. non-www) | ALLE 100+ Seiten | 🔴 KRITISCH |
| Alte WordPress-URLs ohne 301-Redirect | Mind. 8 URLs bei Google indexiert | 🔴 KRITISCH |
| Sitemap enthält redirect-Ziel-URLs | clown-zauberer, karneval | 🟡 MITTEL |
| `og:type` ist überall "website" statt "LocalBusiness" | Alle Seiten | 🟡 MITTEL |
| Keine `hreflang`-Tags für französischen Content | Bühnenzauberer bietet "auch auf Französisch" | 🟢 NIEDRIG |
| City-Pages lastmod in Sitemap = 2023 | Alle 59 City-Pages | 🟡 MITTEL |
| `astro.config.mjs` site ohne www | 1 Stelle | 🔴 KRITISCH |

---

## 4. TECHNICAL SEO

### Robots.txt — ✅ GUT
- Alle wichtigen AI-Crawler erlaubt (GPTBot, ClaudeBot, PerplexityBot, Bingbot)
- Sitemap korrekt verlinkt
- Nur danke-Seite und 404 blockiert

### Sitemap — ⚠️ VERBESSERUNGSBEDARF
- **Positiv:** 100+ URLs, image:image Tags für Hauptseiten, Prioritäten gesetzt
- **Problem 1:** URLs ohne www (s.o.)
- **Problem 2:** lastmod für City-Pages = August 2023 (seit 3 Jahren nicht aktualisiert!)
- **Problem 3:** 2 URLs drin, die 301-redirected werden
- **Problem 4:** Blog-Posts haben image-Tags, City-Pages nicht → City-Pages sollten auch image-Tags bekommen
- **Empfehlung:** lastmod nach jeder Aktualisierung updaten. Google wertet veraltete lastmod als Signal, dass der Content nicht gepflegt wird.

### Canonical-Tags — ✅ GUT (nach Site-Fix)
- Alle Seiten haben Canonical-Tags
- HTTPS + www + trailing slash korrekt
- Canonical normalisiert in BaseLayout

### Security Headers — ✅ GUT
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy gesetzt

### Caching — ✅ GUT
- Gzip-Kompression aktiv
- 1 Jahr Cache für Assets, 1 Stunde für HTML
- Immutable für Astro-Hashed-Assets

---

## 5. SCHEMA / STRUCTURED DATA — 80/100

### Was vorhanden ist (✅)
- **LocalBusiness** Schema auf jeder Seite (global im BaseLayout)
  - Vollständige NAP-Daten (Name, Adresse, Telefon)
  - 13 Service-Areas + NRW
  - AggregateRating: 5.0 / 400 Reviews
  - 5 individuelle Reviews eingebettet
- **Service** Schema auf City-Pages (mit City-spezifischem areaServed)
- **FAQPage** Schema auf Pages mit FAQ-Sektionen
- **BreadcrumbList** Schema auf Unterseiten
- **Article** Schema auf Blog-Posts

### Was FEHLT oder verbessert werden sollte (⚠️)

1. **Event-Schema fehlt** — Für Auftritte/Shows könnte `Event`-Schema ergänzt werden
2. **Offer-Schema fehlt** — Preise (ab 150€) könnten als `Offer` im Service-Schema integriert werden:
```json
{
  "@type": "Service",
  "offers": {
    "@type": "Offer",
    "price": "150",
    "priceCurrency": "EUR",
    "description": "Zaubershow für Kindergeburtstag"
  }
}
```
3. **VideoObject fehlt** — Falls Videos auf der Seite sind
4. **Review-Snippet Risiko** — Die 5 hardcodierten Reviews im LocalBusiness-Schema sollten echte Google-Reviews sein. Google kann Fake-Review-Markup abstrafen.

---

## 6. CONTENT QUALITY & E-E-A-T

### Positiv (✅)
- **Experience:** Blog-Posts berichten von echten Events (Fotos, Ortsnamen, Daten)
- **Expertise:** 15 Jahre Erfahrung, 400+ Shows/Jahr kommuniziert
- **Authority:** Über-mich-Seite vorhanden, echte Referenzen
- **Trust:** Google-Reviews (400+), Impressum vorhanden, DSGVO-Seite

### Verbesserungspotenzial (⚠️)
- **City-Page-Content:** Die 59 City-Pages haben teilweise sehr dünnen Content (nur zusammengeschraubtes WordPress-HTML). Wenn die Seiten wie geplant (CLAUDE.md) neu aufgebaut werden, wird das deutlich besser.
- **Blog:** 30 Posts — gute Frequenz. Aber keine interne Verlinkung von Blog zu Service-Seiten.
- **Über-mich:** Braucht stärkere E-E-A-T-Signale (Zertifikate, Ausbildung, Medienauftritte)

---

## 7. AI SEARCH READINESS — 85/100

### Sehr gut (✅)
- **llms.txt vorhanden** — Sauber formatiert mit allen Services, Einsatzgebiet, Kontaktdaten
- **robots.txt erlaubt AI-Crawler** — GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot alle erlaubt
- **Strukturierte Daten** — JSON-LD für LocalBusiness, Service, FAQ, BreadcrumbList
- **Klare NAP-Daten** — Name, Adresse, Telefon in llms.txt UND Schema

### Fehlt noch (⚠️)
- **llms-full.txt** — Eine erweiterte Version mit FAQ-Antworten und detaillierter Service-Beschreibung würde AI-Suchmaschinen helfen, bessere Antworten zu geben
- **Strukturierte FAQ auf Hauptseiten** — Die FAQ-Sektionen mit FAQPage-Schema sind perfekt für AI-Citation

---

## 8. LOCAL SEO

### Positiv (✅)
- NAP-Konsistenz: Überall gleiche Daten (Brüsseler Str. 97, 45966 Gladbeck)
- Service-Areas definiert (13 Städte + NRW)
- City-Pages für 59 Städte
- Google-Reviews werden erwähnt (400+)

### Verbesserungspotenzial (⚠️)
- **Google Business Profile:** Nicht überprüfbar, aber sicherstellen, dass NAP identisch ist
- **Structured Data für Service Areas:** Die City-Pages haben `areaServed` als City-Name — könnte um `geo`-Koordinaten erweitert werden
- **Lokale Blog-Posts:** Vorhanden und gut (Gelsenkirchen, Dortmund, Duisburg etc.)
- **Fehlende City-Pages:** Gladbeck hat eine clown-in-gladbeck und geburtstag-in-gladbeck, aber KEINE kinderzauberer-in-gladbeck Seite (obwohl Gladbeck der Hauptstandort ist!)

---

## 9. IMAGE SEO — 30/100

### Probleme
- **Alle Bilder liegen noch auf der alten WordPress-Domain** (liar-entertainer.com/wp-content/uploads/)
- Bilder werden nicht lokal gehostet → zusätzlicher DNS-Lookup + Abhängigkeit von WordPress-Server
- Keine WebP/AVIF-Optimierung
- Alt-Texte auf City-Pages oft generisch oder fehlend

### Empfehlung
- Bilder lokal in `/public/images/` hosten
- WebP mit Fallback verwenden
- Astro `<Image />` Component nutzen für automatische Optimierung

---

## PRIORITIERTER AKTIONSPLAN

### 🔴 KRITISCH (sofort beheben)

1. **`astro.config.mjs`:** `site` von `'https://liar-entertainer.com'` auf `'https://www.liar-entertainer.com'` ändern
2. **Sitemap neu generieren** nach dem Site-Fix
3. **Fehlende 301-Redirects** für alte WordPress-URLs in `.htaccess` ergänzen (siehe Abschnitt 2)
4. **Redirect-URLs aus Sitemap entfernen** (clown-zauberer, karneval)
5. **Grammatikfehler fixen:** "DER französischer" → "DER französische" in allen 18 clown-in-* Descriptions
6. **Tippfehler fixen:** "mitTOP" → "mit TOP" auf kinderzauberer-in-dorsten

### 🟡 HOCH (innerhalb 1 Woche)

7. **Titles kürzen** — Alle City-Page-Titles auf max 60 Zeichen
8. **Descriptions einzigartig machen** — Jede City-Page braucht eine individuelle Description mit Nachbarstädten
9. **"300+" → "400+"** auf buehnen-zauberer (Description + Content)
10. **"...ICH!"** aus allen kinderzauberer-in-* Descriptions entfernen
11. **City-Page lastmod** in Sitemap aktualisieren (von 2023 auf aktuelles Datum)
12. **Zu kurze Descriptions** für blog, galerie, zauberer, schule auf 140-160 Zeichen erweitern

### 🟡 MITTEL (innerhalb 1 Monat)

13. **Emojis in Titles:** ⭐ aus dem Homepage-Title entfernen (✓ in Descriptions ist OK)
14. **Offer-Schema** zu Service-Schemas auf Preise- und Kindergeburtstag-Seiten hinzufügen
15. **kinderzauberer-in-gladbeck** Seite erstellen (Hauptstandort fehlt!)
16. **og:type** auf Service-Seiten auf "website" lassen (OK), aber `article` für Blog-Posts setzen
17. **Interne Verlinkung** von Blog-Posts zu Service-Seiten stärken
18. **image:image** Tags in Sitemap für City-Pages ergänzen

### 🟢 NIEDRIG (Backlog)

19. **Bilder lokal hosten** statt von wp-content/uploads/
20. **llms-full.txt** erstellen mit erweiterten FAQ und Service-Details
21. **Über-mich Seite** mit stärkeren E-E-A-T-Signalen erweitern
22. **Event-Schema** für aktuelle/vergangene Auftritte ergänzen
23. **hreflang** für französischen Content prüfen
24. **Blog-Descriptions** individualisieren (aktuell oft generisch)

---

## VERGLEICH: Meine Empfehlungen vs. Claude-Code-Vorschläge

| Thema | Claude-Code | Mein Urteil | Mein Vorschlag |
|-------|-------------|-------------|----------------|
| Title-Länge max 60 | ✅ Korrekt | ✅ Übernehmen | Identisch |
| Descriptions einzigartig | ✅ Korrekt | 🔧 Verbessern | Mit Nachbarstädten individualisieren |
| Grammatik/Tippfehler | ✅ Korrekt | ✅ Übernehmen | Identisch |
| "300+" → "400+" | ✅ Korrekt | ✅ Übernehmen | Identisch |
| "...ICH!" entfernen | ✅ Korrekt | ✅ Übernehmen | Identisch |
| LIAR in jeden Title | ✅ Vorgeschlagen | ❌ Ablehnen | Nur auf Hauptseiten, nicht auf City-Pages |
| Emojis komplett weg | ✅ Vorgeschlagen | 🔧 Differenzieren | ⭐ weg, ✓ behalten |
| **Sitemap www-Fix** | ❌ Nicht erkannt | 🔴 KRITISCH | astro.config.mjs sofort fixen |
| **Alte URL-Redirects** | ❌ Nicht erkannt | 🔴 KRITISCH | Fehlende Redirects ergänzen |
| **lastmod veraltet** | ❌ Nicht erkannt | 🟡 HOCH | Sitemap-Daten aktualisieren |
| **Offer-Schema** | ❌ Nicht erkannt | 🟡 MITTEL | Preise als Schema ergänzen |
| **Gladbeck-Page fehlt** | ❌ Nicht erkannt | 🟡 MITTEL | kinderzauberer-in-gladbeck erstellen |

---

*Erstellt am 7. April 2026 — SEO Audit für www.liar-entertainer.com*
