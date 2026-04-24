# Deployment-Anleitung: liar-entertainer.com → IONOS Static Hosting

## Übersicht

Die fertige statische Website befindet sich im Ordner `dist/` und als ZIP-Datei:
**`liar-entertainer-static.zip`** (1.4 MB)

- **113 HTML-Seiten** vorgebaut (kein PHP, kein WordPress)
- **CSS:** 32 KB minifiziert, mit Build-Hash für perfektes Caching
- **SEO:** Alle Meta-Tags, Canonical URLs, Schema.org, Sitemap, robots.txt identisch zur WP-Site
- **.htaccess:** HTTPS-Redirect, Browser-Caching (1 Jahr für Assets), Gzip, Sicherheits-Header

---

## Schritt 1: Backup der aktuellen WordPress-Site

Vor dem Go-Live ein vollständiges Backup erstellen:

1. IONOS Control Panel öffnen → **Hosting** → **FTP-Zugang**
2. Mit FTP-Client (z.B. FileZilla) verbinden
3. Aktuelles Webroot-Verzeichnis (z.B. `/htdocs/`) komplett herunterladen
4. Alternativ: IONOS Backup-Funktion nutzen

---

## Schritt 2: WordPress-Datenbank sichern

1. IONOS Control Panel → **Datenbanken** → Export/Dump
2. Für spätere Referenz behalten (nicht für die statische Site nötig)

---

## Schritt 3: Statische Dateien hochladen

### Option A: IONOS File Manager (empfohlen für einfachen Upload)

1. [mein.ionos.de](https://mein.ionos.de) öffnen
2. **Hosting** → **File Manager** → Webroot öffnen (meist `/htdocs/` oder `public_html/`)
3. Alle bisherigen WordPress-Dateien löschen:
   - `wp-admin/`, `wp-content/`, `wp-includes/`
   - `wp-config.php`, `wp-login.php`, `xmlrpc.php`
   - Alle anderen WP-Dateien (NICHT `.htaccess` – wird durch neue ersetzt)
4. Inhalt von `liar-entertainer-static.zip` hochladen und entpacken
   - **WICHTIG:** Den Inhalt von `dist/` hochladen, NICHT den `dist/`-Ordner selbst
   - D.h. `index.html`, `_astro/`, `clown/`, `kindergeburtstag/`, etc. liegen direkt im Webroot

### Option B: FTP mit FileZilla

1. FTP-Zugangsdaten aus IONOS Control Panel holen
2. FileZilla verbinden: `ftp.liar-entertainer.com` oder IONOS FTP-Host
3. Lokalen `dist/`-Ordner-Inhalt in Remote-Webroot hochladen
4. Überschreiben von bestehenden Dateien bestätigen

### Verzeichnisstruktur im Webroot nach Upload:

```
/htdocs/
├── .htaccess          ← Apache-Konfiguration (HTTPS, Cache, Gzip)
├── index.html         ← Startseite
├── 404.html           ← Fehlerseite (ErrorDocument 404 /404/index.html)
├── robots.txt
├── sitemap.xml
├── _astro/
│   └── _slug_.Dg8c8iyp.css   ← Gesamtes CSS (minifiziert, gecacht)
├── clown/
│   ├── index.html
│   ├── clown-zauberer/
│   │   └── index.html
│   ├── ballonmodellage/
│   ├── clownshow/
│   ├── glitzer-tattoo/
│   └── walk-act/
├── kindergeburtstag/
│   ├── index.html
│   └── geburtstag-in-[stadt]/
├── kinderzauberer/
│   ├── index.html
│   └── kinderzauberer-in-[stadt]/
├── zauberer/
│   ├── index.html
│   ├── tisch-zauberer/
│   ├── buehnen-zauberer/
│   └── zaubershow/
├── kontakt/
├── galerie/
├── blog/
├── impressum/
├── agbs/
├── datenschutzerklaerung-2/
└── ueber-mich/
```

---

## Schritt 4: .htaccess prüfen

Die `.htaccess` im Webroot muss die neue Datei sein (aus `dist/.htaccess`). Sie enthält:
- HTTPS-Erzwingung (HTTP → HTTPS 301)
- www-Erzwingung (non-www → www 301)
- Trailing-Slash-Redirect (für Astro-Directory-Output)
- WordPress-Schutz-Redirects (wp-admin → Startseite)
- Gzip-Kompression
- Browser-Caching (CSS/JS: 1 Jahr immutable, HTML: 1 Stunde)
- Sicherheits-Header (X-Frame-Options, CSP, etc.)

**Achtung:** IONOS verwendet Apache. Falls `mod_rewrite` oder `mod_headers` nicht aktiv ist, im IONOS Control Panel unter **Hosting-Einstellungen** aktivieren, oder Support kontaktieren.

---

## Schritt 5: DNS / Domain-Einstellungen

Falls die Domain noch auf den alten Server zeigt, nichts ändern – der Server ist derselbe (IONOS). Die Website-Dateien wurden nur ausgetauscht.

Falls Migration auf einen anderen Server:
1. A-Record: Neue Server-IP eintragen
2. TTL auf 300s (5 Min) setzen vor der Migration
3. Warten bis DNS propagiert (~15-60 Min)

---

## Schritt 6: Funktionstest nach Upload

Folgende URLs manuell testen:

| URL | Erwartetes Ergebnis |
|-----|---------------------|
| `http://liar-entertainer.com` | 301 → `https://www.liar-entertainer.com/` |
| `https://liar-entertainer.com` | 301 → `https://www.liar-entertainer.com/` |
| `https://www.liar-entertainer.com/` | Startseite lädt korrekt |
| `https://www.liar-entertainer.com/clown/clown-zauberer/` | Service-Seite |
| `https://www.liar-entertainer.com/kindergeburtstag/` | Kindergeburtstag-Seite |
| `https://www.liar-entertainer.com/kontakt/` | Kontakt-Formular |
| `https://www.liar-entertainer.com/sitemap.xml` | XML-Sitemap |
| `https://www.liar-entertainer.com/robots.txt` | robots.txt |
| `https://www.liar-entertainer.com/irgendwas-404/` | Custom 404-Seite |
| `https://www.liar-entertainer.com/wp-admin/` | 301 → Startseite |

---

## Schritt 7: Google Search Console

1. [Google Search Console](https://search.google.com/search-console) öffnen
2. Neue Sitemap einreichen: `https://www.liar-entertainer.com/sitemap.xml`
3. **URL-Inspektion** für wichtige Seiten durchführen
4. **Index-Abdeckung** in den nächsten Tagen beobachten

---

## Rebuild nach Änderungen

Wenn Inhalte geändert werden sollen:

```bash
# Im Projektordner:
cd "C:/Users/ben_m/Claude Code/Homepage Neu"

# Build neu erstellen:
npm run build

# Neue ZIP erstellen:
# Windows PowerShell:
Compress-Archive -Path 'dist\*' -DestinationPath 'liar-entertainer-static.zip' -Force

# Dann wieder per FTP/File Manager hochladen
```

---

## Performance-Benchmark

Nach dem Go-Live mit [PageSpeed Insights](https://pagespeed.web.dev/) prüfen:

- Ziel: **Lighthouse Score > 95** (Performance, SEO, Accessibility)
- **LCP** (Largest Contentful Paint): < 2.5s
- **FCP** (First Contentful Paint): < 1.8s
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTFB** (Time to First Byte): < 600ms (statisch, kein PHP)

Typische Verbesserung gegenüber WordPress: **5–10× schneller**

---

## Troubleshooting

### Seiten zeigen 404:
- Prüfen ob `index.html` im entsprechenden Unterordner liegt
- Prüfen ob `.htaccess` korrekt hochgeladen wurde
- IONOS: `mod_rewrite` in Hosting-Einstellungen aktivieren

### CSS lädt nicht:
- Prüfen ob `_astro/` Ordner hochgeladen wurde
- Browser-Cache leeren (Ctrl+Shift+R)

### HTTPS-Redirect funktioniert nicht:
- IONOS SSL-Zertifikat prüfen (Let's Encrypt ist kostenlos bei IONOS)
- Im Control Panel: **SSL** → Zertifikat aktivieren

### WordPress-URLs erscheinen noch in Google:
- Normal – dauert 2–4 Wochen bis Google re-crawlt
- Sitemap nochmals in Search Console einreichen
- URL-Inspektion für wichtige Seiten manuell anstoßen
