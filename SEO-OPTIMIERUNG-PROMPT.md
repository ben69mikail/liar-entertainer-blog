# SEO-KOMPLETT-OPTIMIERUNG — Prompt für Claude Code

> **Kontext:** Dieses Dokument enthält ALLE SEO-Änderungen, die an der Astro-Website `www.liar-entertainer.com` vorgenommen werden müssen. Die Änderungen basieren auf einem vollständigen SEO-Audit vom 07.04.2026, inklusive Google Search Console-Analyse (440 indexierte Seiten, 566 NICHT indexierte, davon 307 mit 404-Fehler).

---

## AUFGABE 1: KRITISCH — `astro.config.mjs` Site-URL fixen

**Datei:** `astro.config.mjs`

**Problem:** `site` steht auf `'https://liar-entertainer.com'` (ohne www). Die .htaccess erzwingt aber www. Dadurch generiert die Sitemap URLs ohne www, während Canonical-Tags www verwenden → Google sieht widersprüchliche Signale.

**Änderung:**
```javascript
// ALT:
site: 'https://liar-entertainer.com',

// NEU:
site: 'https://www.liar-entertainer.com',
```

---

## AUFGABE 2: KRITISCH — Fehlende 301-Redirects in `.htaccess`

**Datei:** `public/.htaccess`

**Problem:** Google Search Console zeigt 307 Seiten mit 404-Fehler. Das sind alte WordPress-URLs, für die KEIN Redirect existiert. Die URLs folgen bestimmten Mustern.

**Füge diese Redirect-Regeln in `public/.htaccess` ein — NACH den bestehenden WordPress-Redirects, ABER VOR der TrailingSlash-Regel und den allgemeinen Fallback-Regeln:**

```apache
# ============================================================
# ALTE WORDPRESS URL-STRUKTUREN → NEUE ASTRO-URLS (301)
# Basierend auf Google Search Console 404-Analyse (307 URLs)
# ============================================================

# --- MUSTER 1: /content/... → Entferne /content/ Prefix ---
# Alte WordPress-Struktur hatte /content/ vor Service-Seiten
RewriteRule ^content/kinderzauberer/?$ /kinderzauberer/ [R=301,L]
RewriteRule ^content/zauberer/tisch-zauberer/?$ /zauberer/tisch-zauberer/ [R=301,L]
RewriteRule ^content/zauberer/kinderzauberer/?$ /kinderzauberer/ [R=301,L]
RewriteRule ^content/zauberer/kinderzauberer/kinderzauberer-in-(.*)$ /kinderzauberer/kinderzauberer-in-$1 [R=301,L]
RewriteRule ^content/clown/clown-in-(.*)$ /clown/clownshow/clown-in-$1 [R=301,L]
RewriteRule ^content/glitzer-tattoos/?$ /clown/glitzer-tattoo/ [R=301,L]
RewriteRule ^content/preise-fuer-clown-oder-kinderzauberer/?$ /preise/ [R=301,L]
RewriteRule ^content/index\.php$ / [R=301,L]
# /content/ Blog-Posts → /blog/ (Catch-All für restliche /content/-URLs)
RewriteRule ^content/(.+)$ /blog/ [R=301,L]

# --- MUSTER 2: /clown/kindergeburtstag/... → /kindergeburtstag/... ---
# Alte verschachtelte Geburtstags-URLs unter /clown/
RewriteRule ^clown/kindergeburtstag/?$ /kindergeburtstag/ [R=301,L]
RewriteRule ^clown/kindergeburtstag/(.+)$ /kindergeburtstag/$1 [R=301,L]

# --- MUSTER 3: /clown/geburtstag/... → /kindergeburtstag/... ---
# Weitere alte Variante für Geburtstags-Seiten
RewriteRule ^clown/geburtstag/?$ /kindergeburtstag/ [R=301,L]
RewriteRule ^clown/geburtstag/(.+)$ /kindergeburtstag/$1 [R=301,L]

# --- MUSTER 4: /clown/zauberer/kinderzauberer/... → /kinderzauberer/... ---
# Alte tief verschachtelte Kinderzauberer-URLs
RewriteRule ^clown/zauberer/kinderzauberer/?$ /kinderzauberer/ [R=301,L]
RewriteRule ^clown/zauberer/kinderzauberer/kinderzauberer-in-([^/]+)/?$ /kinderzauberer/kinderzauberer-in-$1/ [R=301,L]
RewriteRule ^clown/zauberer/kinderzauberer/kinderzauberer-in-([^/]+)/.*$ /kinderzauberer/kinderzauberer-in-$1/ [R=301,L]
RewriteRule ^clown/zauberer/(.+)$ /zauberer/$1 [R=301,L]

# --- MUSTER 5: /clown-zauberer/... → Entsprechende neue URLs ---
RewriteRule ^clown-zauberer/clown/glitzer-tattoos/?$ /clown/glitzer-tattoo/ [R=301,L]
RewriteRule ^clown-zauberer/clown/geburtstag/(.+)$ /kindergeburtstag/$1 [R=301,L]
RewriteRule ^clown-zauberer/?$ /clown/clownshow/ [R=301,L]
RewriteRule ^clown-zauberer/(.+)$ /clown/clownshow/ [R=301,L]

# --- MUSTER 6: /clown-nrw/... → Passende Zielseiten ---
RewriteRule ^clown-nrw/clown-mieten-und-buchen-in-ihrer-stadt/clown-in-(.+)$ /clown/clownshow/clown-in-$1 [R=301,L]
RewriteRule ^clown-nrw/clown-kinderzauberer-kindergeburtstag/?$ /kindergeburtstag/ [R=301,L]
RewriteRule ^clown-nrw/?$ /clown/clownshow/ [R=301,L]
RewriteRule ^clown-nrw/(.+)$ /clown/clownshow/ [R=301,L]

# --- MUSTER 7: /clown/glitzer-tattoos (ohne trailing slash, falsche Schreibweise) ---
RewriteRule ^clown/glitzer-tattoos/?$ /clown/glitzer-tattoo/ [R=301,L]
RewriteRule ^clown-kindergeburtstag-extras/glitzer-tattoos/?$ /clown/glitzer-tattoo/ [R=301,L]
RewriteRule ^glitzer-tattoos/?$ /clown/glitzer-tattoo/ [R=301,L]
RewriteRule ^glitzer-tattoos-den-kindergeburtstag/?$ /clown/glitzer-tattoo/ [R=301,L]

# --- MUSTER 8: Alte Blog-Posts auf Root-Level (ohne /blog/ Prefix) ---
# Diese alten Posts lagen direkt unter / statt unter /blog/
RewriteRule ^kindernachmittag-in-der-schnittbar-mit-liar/?$ /blog/ [R=301,L]
RewriteRule ^ab-nach-witten/?$ /blog/ [R=301,L]
RewriteRule ^halloween-spektakel-fur-kinder/?$ /blog/ [R=301,L]
RewriteRule ^workshop-in-der-abenteuerkiste-in-greven/?$ /blog/ [R=301,L]
RewriteRule ^4-harwicker-fruehjahrsfest-mit-kinderzauberer/?$ /blog/ [R=301,L]
RewriteRule ^zauberer-liar-in-der-stadtteilbibliothek-luetgendortmund/?$ /blog/ [R=301,L]
RewriteRule ^karnevalsaison-startet-am-sonntag/?$ /blog/ [R=301,L]
RewriteRule ^clown-im-theater-don-kidschote/?$ /blog/ [R=301,L]
RewriteRule ^hoffest-hof-wulhorst-mit-clown-liar/?$ /blog/ [R=301,L]
RewriteRule ^karneval-in-gevelsberg/?$ /blog/ [R=301,L]
RewriteRule ^sommerfest-im-gartenverein-in-dortmund-mengede/?$ /blog/ [R=301,L]
RewriteRule ^stickerfreunde-kick-off-party-in-herdecke-mit-zauberer-liar/?$ /blog/ [R=301,L]
RewriteRule ^clown-liar-in-dortmund/?$ /blog/ [R=301,L]
RewriteRule ^clown-zauberer-liar-beim-1-harwicker-fruhjahrsfest-auf-brinkmanns-hof-in-gescher/?$ /blog/ [R=301,L]
RewriteRule ^toller-artikel-aus-nottuln-fuer-clown-und-zauberer/?$ /blog/ [R=301,L]
RewriteRule ^nikolaus-markt-in-bottrop-empfaengt-clown-zauberer-liar/?$ /blog/ [R=301,L]
RewriteRule ^bauernmarkt-in-waltrop-am-sonntag/?$ /blog/ [R=301,L]
RewriteRule ^luis-das-bistro-zauberer-liar-bei-eroffnungsfeier-in-gladbeck/?$ /blog/ [R=301,L]
RewriteRule ^100-jahre-volksgarten-kray/?$ /blog/ [R=301,L]
RewriteRule ^automeile-in-beckum/?$ /blog/ [R=301,L]
RewriteRule ^weihnachtsmarkt-hagen-clown-zauberer/?$ /blog/ [R=301,L]
RewriteRule ^clown-liar-in-essen-kray/?$ /blog/ [R=301,L]
RewriteRule ^geburtstagsangebot-clown-liar/?$ /blog/ [R=301,L]
RewriteRule ^zufallig-gefunden-clown-auch-auch-beim-spielplatzeroffnung/?$ /blog/ [R=301,L]
RewriteRule ^spielfest-zum-weltkindertag/?$ /blog/ [R=301,L]
RewriteRule ^drehorgel-rolf/?$ /blog/ [R=301,L]
RewriteRule ^nochn-clown/?$ /blog/ [R=301,L]
RewriteRule ^kindersitzung-xanten-januar-2018/?$ /blog/ [R=301,L]
RewriteRule ^clown-zauberer-liar-in-sauerland-am-sonntag-19-mai-2012/?$ /blog/ [R=301,L]
RewriteRule ^sport-meets-karneval/?$ /blog/ [R=301,L]
RewriteRule ^sommerfest-kgv-eilperfeld-in-hagen/?$ /blog/ [R=301,L]
RewriteRule ^clown-liar-im-autohaus-zumbuelt-fuer-die-automeile-2016/?$ /blog/ [R=301,L]
RewriteRule ^tolles-plakat-fuer-bottroper-spendenlauf/?$ /blog/ [R=301,L]
RewriteRule ^kinderzauberer-gelobt/?$ /blog/ [R=301,L]
RewriteRule ^preise-fuer-clown-oder-kinderzauberer/?$ /preise/ [R=301,L]
RewriteRule ^kinderzauberer-unterwegs-bei-dem-bildungswerk-essen/?$ /blog/ [R=301,L]
RewriteRule ^rhenania-bottrops-u8-junioren-laden-ein/?$ /blog/ [R=301,L]
RewriteRule ^5-sternen-clown-und-kinderzauberer-im-kindergarten/?$ /blog/ [R=301,L]
RewriteRule ^bewertung-und-fotos-vom-clown/?$ /galerie/ [R=301,L]
RewriteRule ^hotel-eroffnung-in-ennepetal-mit-clown-zauberer-liar/?$ /blog/ [R=301,L]
RewriteRule ^neue-bewertungen-fuer-clown-liar-shows/?$ /blog/ [R=301,L]
RewriteRule ^drk-luedenscheid-feiert-150-geburtstag/?$ /blog/ [R=301,L]
RewriteRule ^riesenseifenblasen-macht-spass/?$ /blog/ [R=301,L]
RewriteRule ^karneval-startet-in-oberhausen/?$ /blog/ [R=301,L]
RewriteRule ^liar-im-regenbogenhaus-in-dortmund/?$ /blog/ [R=301,L]
RewriteRule ^zauberworkshop-fur-kinder-in-essen-schonebeck/?$ /blog/ [R=301,L]
RewriteRule ^oktoberfest-fur-kinder-in-der-kinderwelt-recklinghausen/?$ /blog/ [R=301,L]
RewriteRule ^tolle-veranstaltung-in-prerow-clown/?$ /blog/ [R=301,L]
RewriteRule ^leuchtfeder-e-v-kunst-und-kultur/?$ /blog/ [R=301,L]
RewriteRule ^dortmunder-weihnachtsmarkt-eroeffnung-mit-clown-zauberer-liar/?$ /blog/ [R=301,L]
RewriteRule ^haltern-bittet-zu-tisch/?$ /blog/ [R=301,L]
RewriteRule ^fruehlingsfet-in-kray/?$ /blog/ [R=301,L]
RewriteRule ^der-zauberer-muss-zum-arzt-nach-bottrop/?$ /blog/ [R=301,L]
RewriteRule ^der-tennis-clown-mansour-barami/?$ /blog/ [R=301,L]
RewriteRule ^kinderkarneval-bei-den-wittringer-ritter-in-gladbeck/?$ /blog/ [R=301,L]
RewriteRule ^zauberworkshop-in-der-kinderwelt-recklinghausen/?$ /blog/ [R=301,L]
RewriteRule ^kinder-schmuecken-den-tannenbaum-auf-dem-robert-brauner-platz/?$ /blog/ [R=301,L]
RewriteRule ^in-reken-fuer-karneval-fuer-die-kinder/?$ /blog/ [R=301,L]
RewriteRule ^tanzschule-achim-juergens-in-essen/?$ /blog/ [R=301,L]
RewriteRule ^weihnachtsmarkt-bottrop-mit-kinderzauberer-liar/?$ /blog/ [R=301,L]
RewriteRule ^spendenlauf-in-bottrop-jeder-meter-zaehlt/?$ /blog/ [R=301,L]
RewriteRule ^kinderschuetzenfest-in-gahlen/?$ /blog/ [R=301,L]
RewriteRule ^100-jahriger-im-volksgarten-kray/?$ /blog/ [R=301,L]
RewriteRule ^plan-b-feiert-auftakt-mit-clown-liar/?$ /blog/ [R=301,L]
RewriteRule ^auch-in-geldern-fuer-karneval/?$ /blog/ [R=301,L]
RewriteRule ^clown-zauberer-liar-auf-hochzeit-und-taufe/?$ /blog/ [R=301,L]
RewriteRule ^dennis-treiblmair-und-michael-prescler-verzaubern-publikum/?$ /blog/ [R=301,L]
RewriteRule ^was-kostet-einen-clown-oder-zauberer-in-nrw/?$ /blog/ [R=301,L]
RewriteRule ^warum-einen-clown-oder-zauberer-fur-den-geburtstag-buchen/?$ /blog/ [R=301,L]
RewriteRule ^bottroper-weihnachtsmarkt-mit-clown-liar/?$ /blog/ [R=301,L]
RewriteRule ^adac-lenkt-autofahrer-zur-halde/?$ /blog/ [R=301,L]
RewriteRule ^gartencenter-schellewald-in-gladbeck/?$ /blog/ [R=301,L]
RewriteRule ^karneval-in-rommreskirchen-mit-clown-liar/?$ /blog/ [R=301,L]
RewriteRule ^ein-clown-im-seniorenzentrum-martineum-in-essen/?$ /blog/ [R=301,L]
RewriteRule ^zauberer-in-berlin-andre-kursch/?$ /blog/ [R=301,L]
RewriteRule ^geburtstag-40-jahre-rathaus-essen-mit-clown-zauberer-liar/?$ /blog/ [R=301,L]
RewriteRule ^sommerfest-mit-clown-liar-in-essen/?$ /blog/ [R=301,L]
RewriteRule ^zaubershow-auf-dem-hoffest-in-waltrop/?$ /blog/ [R=301,L]
RewriteRule ^rewe-neueroffnung-mit-clown-liar/?$ /blog/ [R=301,L]
RewriteRule ^clown-liar-bei-marcellino-in-dormagen/?$ /blog/ [R=301,L]
RewriteRule ^zauberer-liar-auf-dem-wetteraner-herbsfest/?$ /blog/ [R=301,L]
RewriteRule ^24-kinderfest-im-krayer-volksgarten/?$ /blog/ [R=301,L]
RewriteRule ^175-jaehriges-sparkasse-muelheim-nit-zauberer-liar/?$ /blog/ [R=301,L]
RewriteRule ^benefiz-aktion-in-gladbeck/?$ /blog/ [R=301,L]
RewriteRule ^benefiz-bottrop/?$ /blog/ [R=301,L]
RewriteRule ^zauberclown-liar-laedt-alle-kinder-in-drei-awo-kitas-ein/?$ /blog/ [R=301,L]
RewriteRule ^topmodel-party-fur-den-geburtstag/?$ /blog/ [R=301,L]
RewriteRule ^besuch-vom-zauberer-liar-auf-dem-weihnachtsmarkt-dortmund/?$ /blog/ [R=301,L]
RewriteRule ^halloween-zauberhafte-momente-fur-kinder-im-kulturtempel-gladbeck/?$ /blog/ [R=301,L]
RewriteRule ^kindergeburtstag-feiern-in-duesseldorf-bei-happy-kids/?$ /blog/ [R=301,L]
RewriteRule ^karnevalsaison-mit-clown-liar-fangt-an/?$ /blog/ [R=301,L]
RewriteRule ^zauberhafte-party-in-eisborn/?$ /blog/ [R=301,L]
RewriteRule ^liar-als-schwarzer-magier-fuer-halloween/?$ /blog/ [R=301,L]
RewriteRule ^dorstener-weihnachtsmarkt-mit-clown-und-kinderzauberer/?$ /blog/ [R=301,L]
RewriteRule ^nachwuchs-feiert-in-eisborn-karneval-mit-clown-liar/?$ /blog/ [R=301,L]
RewriteRule ^dorsten-weihnachtsmarkt-der-mr-trucker-kinderhilfe-zieht-besucher-an/?$ /blog/ [R=301,L]
RewriteRule ^die-kinderwelt-recklinghausen-empfangt-erneut-clown-zauberer-liar/?$ /blog/ [R=301,L]
RewriteRule ^die-mammutspiele-in-ahlen/?$ /blog/ [R=301,L]
RewriteRule ^kirmes-und-brunnenfest-mit-kinderzaubershow/?$ /blog/ [R=301,L]
RewriteRule ^cafe-schlaflos-heute-in-der-buecherei-gladbeck/?$ /blog/ [R=301,L]
RewriteRule ^kinderzauberer-besucht-kita-in-gelsenkirchen/?$ /blog/ [R=301,L]
RewriteRule ^musik-und-entertainment-mit-michael-voelkel/?$ /blog/ [R=301,L]
RewriteRule ^clown-zauberer-liar-empfiehlt-fire-fantasies-aus-bochum/?$ /blog/ [R=301,L]
RewriteRule ^dortmunder-weihnachtsmarkt-mit-liar/?$ /blog/ [R=301,L]
RewriteRule ^lustiges-hochzeitsfoto-vom-zauberer/?$ /blog/ [R=301,L]
RewriteRule ^fruehlingsfest-kray-mit-maedeltroedelmarkt/?$ /blog/ [R=301,L]
RewriteRule ^kinderparadies-im-westfalenpark/?$ /blog/ [R=301,L]
RewriteRule ^murray-und-der-zauberer/?$ /blog/ [R=301,L]
RewriteRule ^kinder-helfen-helden-zu-machen/?$ /blog/ [R=301,L]
RewriteRule ^naturheilpraxis-schreiber-in-haltern-am-see/?$ /blog/ [R=301,L]
RewriteRule ^zirkus-aus-der-kiste-auf-dem-spielplatz-clown-zauberer-liar-in-dortmund/?$ /blog/ [R=301,L]
RewriteRule ^bottroper-super-samstag-am-4-7/?$ /blog/ [R=301,L]
RewriteRule ^dpvkom-fordert-ein-herz-fuer-mitarbeiter-der-deutschen-post-dhl/?$ /blog/ [R=301,L]
RewriteRule ^zimtsternfest-mit-zauberer-liar-in-gladbeck/?$ /blog/ [R=301,L]
RewriteRule ^clown-und-kinderzauberer-in-der-kinderwelt-recklinghausen/?$ /blog/ [R=301,L]
RewriteRule ^familienfest-in-ramsdorf-mit-clown-liar/?$ /blog/ [R=301,L]

# --- MUSTER 9: Generischer Catch-All für restliche Root-Level Blog-Posts ---
# Alte Posts, die direkt unter / lagen und nicht einzeln abgefangen wurden
# ACHTUNG: Diese Regel muss NACH allen spezifischen Redirects stehen!
# Sie fängt URLs wie /2557-2/, /2156-2/ etc. ab
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^[a-z0-9][-a-z0-9]*/?$ /blog/ [R=301,L]

# --- MUSTER 10: /category/ mit Unterverzeichnissen (erweitert bestehende Regel) ---
# Bestehende Regel fängt schon /category/* ab, aber hier spezifische Mappings
RewriteRule ^category/kinderzauberer/?$ /kinderzauberer/ [R=301,L]
RewriteRule ^category/kinderzauberer-und-clown-aus-nrw-aktuell/?$ /blog/ [R=301,L]
RewriteRule ^category/kinderzauberer-und-clown-aus-nrw-aktuell/(.+)$ /blog/ [R=301,L]
RewriteRule ^category/entertainer/?$ /blog/ [R=301,L]
RewriteRule ^category/entertainer/(.+)$ /blog/ [R=301,L]
RewriteRule ^category/kultur-nrw/?$ /blog/ [R=301,L]
RewriteRule ^category/kultur-nrw/(.+)$ /blog/ [R=301,L]
RewriteRule ^category/zaubershow/?$ /zauberer/zaubershow/ [R=301,L]
RewriteRule ^category/zaubershow/(.+)$ /zauberer/zaubershow/ [R=301,L]
RewriteRule ^category/zauberer-2/?$ /zauberer/ [R=301,L]
RewriteRule ^category/zauberer-2/(.+)$ /zauberer/ [R=301,L]
RewriteRule ^category/clown-im-herzen/?$ /blog/ [R=301,L]
RewriteRule ^category/clown-im-herzen/(.+)$ /blog/ [R=301,L]
RewriteRule ^category/besondere-clowns/?$ /blog/ [R=301,L]
RewriteRule ^category/nette-locations/?$ /blog/ [R=301,L]
RewriteRule ^category/nette-locations/(.+)$ /blog/ [R=301,L]
RewriteRule ^category/presse/?$ /blog/ [R=301,L]
RewriteRule ^category/marketing/?$ /blog/ [R=301,L]
RewriteRule ^category/tolle-selbstandige/?$ /blog/ [R=301,L]
RewriteRule ^category/videos/?$ /galerie/ [R=301,L]
RewriteRule ^category/anleitung-fur-kinderspass/?$ /blog/ [R=301,L]
RewriteRule ^category/anleitung-fur-kinderspass/(.+)$ /blog/ [R=301,L]
RewriteRule ^category/kinder-geburtstag-anleitung-fur-kinderspass/?$ /blog/ [R=301,L]
RewriteRule ^category/gelsenkirchen-.*$ /blog/ [R=301,L]
RewriteRule ^category/wetter/?$ /blog/ [R=301,L]
```

**WICHTIG:** Kopiere auch die Redirects in `dist/.htaccess` (identischer Inhalt).

---

## AUFGABE 3: OPTIMIERTE META-TAGS — Alle Seiten

### Prinzip für optimale Descriptions
- **140-160 Zeichen** (Google zeigt max ~155 an)
- **Haupt-Keyword am Anfang** (Google boldet Suchbegriffe)
- **USPs mit ✓** (CTR-Booster, rendert zuverlässig in SERPs)
- **Call-to-Action am Ende** ("Jetzt buchen!", "Jetzt anfragen!")
- **Einzigartig pro Seite** — KEINE Duplikate

### Prinzip für optimale Titles
- **Max 60 Zeichen** (Google schneidet bei ~60 ab)
- **Haupt-Keyword am Anfang**
- **Brand (LIAR) nur bei Hauptseiten** — nicht bei City-Pages (Platz sparen)
- **Keine Emojis** im Title (⭐ rendert nicht überall)
- **Pipe `|` als Trenner** (Standard, gut lesbar)

---

### 3A. HAUPTSEITEN — Optimierte Titles + Descriptions

**Jede Änderung muss in der jeweiligen .astro-Datei im Frontmatter vorgenommen werden.**

#### Homepage — `src/pages/index.astro`
```
TITLE (NEU): Clown Zauberer NRW | Kindergeburtstag & Events | LIAR
  → 58 Zeichen (ALT war 64 mit ⭐ Emoji)

DESC (NEU): Clown Zauberer LIAR in NRW ✓ Zaubershow & Clownshow ✓ Kindergeburtstag ab 150€ ✓ 400+ Top-Bewertungen ✓ Ballonmodellage & Glitzer-Tattoos ✓ Jetzt buchen!
  → 163 Zeichen (BLEIBT — ist gut optimiert, knapp über 160 ist OK)
```

#### Kindergeburtstag — `src/pages/kindergeburtstag/index.astro`
```
TITLE: Kindergeburtstag mit Clown Zauberer | Ab 150€ | LIAR NRW
  → 60 Zeichen ✓ (prüfen ob aktueller Title passt, ggf. anpassen)

DESC (prüfen/optimieren): Kindergeburtstag mit Clown Zauberer LIAR ✓ Zaubershow ab 150€ ✓ Ballonmodellage ✓ Glitzer-Tattoos ✓ 400+ Top-Bewertungen in NRW ✓ Jetzt buchen!
  → 160 Zeichen ✓
```

#### Kinderzauberer — `src/pages/kinderzauberer/index.astro`
```
TITLE: Kinderzauberer NRW | TOP Bewertungen | Clown LIAR
  → 52 Zeichen ✓

DESC: Kinderzauberer LIAR in NRW buchen ✓ Lustige Zaubershow für Kindergeburtstag, Kita & Schule ✓ Ab 150€ ✓ 400+ Top-Bewertungen ✓ Jetzt unverbindlich anfragen!
  → 158 Zeichen ✓
```

#### Clownshow — `src/pages/clown/clownshow/index.astro`
```
TITLE: Clownshow NRW | Die witzigste Show | Clown LIAR
  → 50 Zeichen ✓

DESC: Die lustigste Clownshow in NRW ✓ Clown Zauberer LIAR für Kindergeburtstag, Fest & Event ✓ 400+ Top-Bewertungen ✓ Ab 150€ ✓ Comedy, Zauberei & Spaß ✓ Jetzt buchen!
  → 163 Zeichen ✓
```

#### Zauberer — `src/pages/zauberer/index.astro`
```
TITLE: Zauberer NRW | Zaubershow für Events | LIAR
  → 46 Zeichen ✓

DESC: Französischer Zauberer LIAR in NRW ✓ Professionelle Zaubershow für Kindergeburtstag, Hochzeit & Firmenevent ✓ Tischzauber & Bühnenzauberei ✓ 400+ Top-Bewertungen!
  → 162 Zeichen ✓
```

#### Bühnenzauberer — `src/pages/zauberer/buehnen-zauberer/index.astro`
```
TITLE: Bühnenzauberer NRW | Stand-up mit Eleganz | LIAR
  → 50 Zeichen ✓

DESC (NEU): Bühnenzauberer NRW ✓ Professionelle Stand-up Comedy-Zauberei ✓ 20-45 Min. für 10-150 Personen ✓ 400+ TOP-Bewertungen ✓ Auch auf Französisch ✓ Jetzt buchen!
  → 163 Zeichen ✓
  → WICHTIG: "300+" auf "400+" ändern! (auch im Content der Seite, nicht nur Description)
```

#### Tischzauberer — `src/pages/zauberer/tisch-zauberer/index.astro`
```
TITLE: Tischzauberer NRW | Close-up Magie | LIAR
  → 44 Zeichen ✓

DESC: Tisch Zauberer LIAR in NRW ✓ Close-up Magie für Hochzeit, Firmenevent & Geburtstag ✓ 400+ Top-Bewertungen ✓ Elegant & niveauvoll ✓ Jetzt unverbindlich anfragen!
  → 161 Zeichen ✓
```

#### Zaubershow — `src/pages/zauberer/zaubershow/index.astro`
```
TITLE: Zaubershow für Kinder NRW | Lustig & Magisch | LIAR
  → 53 Zeichen ✓

DESC: Die lustigste Zaubershow für Kinder in NRW ✓ Clown Zauberer LIAR ✓ Für Kindergeburtstag, Kita & Schule ✓ Ab 150€ ✓ 400+ Top-Bewertungen ✓ Kinder lachen & staunen!
  → 164 Zeichen ✓
```

#### Preise — `src/pages/preise/index.astro`
```
KEINE ÄNDERUNG — Ist gut optimiert (Title 64 Zeichen, Description 157 Zeichen) ✓
```

#### Ballonmodellage — `src/pages/clown/ballonmodellage/index.astro`
```
KEINE ÄNDERUNG — Ist gut optimiert ✓
```

#### Glitzer-Tattoo — `src/pages/clown/glitzer-tattoo/index.astro`
```
KEINE ÄNDERUNG — Ist gut optimiert ✓
```

#### Walk-Act — `src/pages/clown/walk-act/index.astro`
```
TITLE (prüfen): Walk Act NRW | Ballonkünstler & Zauberei | LIAR
  → 57 Zeichen ✓ (ALT war 71 — zu lang!)

DESC: Walk Act mit Ballonmodellage & Zauberei für Ihr Fest ✓ Clown Zauberer LIAR ✓ Für Stadtfest, Sommerfest & Events ✓ In ganz NRW ✓ Jetzt unverbindlich anfragen!
  → 158 Zeichen ✓
```

#### Karneval — `src/pages/clown/karneval/index.astro`
```
KEINE ÄNDERUNG — Ist gut optimiert ✓
```

#### Kindergarten/Kita — `src/pages/zauberer/zaubershow/kindergarten-kita/index.astro`
```
TITLE: Zaubershow Kindergarten & Kita NRW | LIAR
  → 44 Zeichen ✓

DESC: Zaubershow für Kindergarten & Kita in NRW ✓ Kinderzauberer LIAR bringt die ganze Kita zum Lachen ✓ Ab 150€ ✓ 400+ Top-Bewertungen ✓ Pädagogisch wertvoll ✓ Jetzt buchen!
  → 169 Zeichen (kürzen auf 158): Zaubershow für Kindergarten & Kita in NRW ✓ Kinderzauberer LIAR ✓ Ab 150€ ✓ 400+ Top-Bewertungen ✓ Pädagogisch wertvoll ✓ Jetzt buchen!
```

#### Schule — `src/pages/zauberer/zaubershow/schule/index.astro`
```
TITLE: Zaubershow für Schule NRW | TOP Bewertet | LIAR
  → 50 Zeichen ✓

DESC: Zaubershow für Ihre Schule in NRW ✓ Clown Zauberer LIAR bringt Kinder zum Lachen & Staunen ✓ 400+ Top-Bewertungen ✓ Für Schulfest & Projekttage ✓ Jetzt anfragen!
  → 162 Zeichen ✓
```

#### Straßen-/Sommerfest — `src/pages/zauberer/zaubershow/strassen-sommer-fest/index.astro`
```
TITLE: Straßenfest & Sommerfest Entertainment | LIAR NRW
  → 52 Zeichen ✓

DESC: Clown Zauberer LIAR für Ihr Straßenfest & Sommerfest ✓ Walk Act, Zaubershow & Ballonmodellage ✓ In ganz NRW ✓ 400+ Top-Bewertungen ✓ Jetzt unverbindlich anfragen!
  → 163 Zeichen ✓
```

#### Blog — `src/pages/blog/index.astro`
```
TITLE: Blog | Clown Zauberer LIAR — Aktuelles & Events
  → 50 Zeichen ✓

DESC: Neuigkeiten vom Clown Zauberer LIAR ✓ Berichte von Kindergeburtstagen, Stadtfesten & Events in NRW ✓ Tipps für die perfekte Kinderparty ✓ Fotos & Erfahrungsberichte
  → 165 Zeichen (kürzen auf 160): Neuigkeiten vom Clown Zauberer LIAR ✓ Berichte von Shows, Festen & Events in NRW ✓ Tipps für die perfekte Kinderparty ✓ Fotos & Erfahrungsberichte
```

#### Galerie — `src/pages/galerie/index.astro`
```
TITLE: Galerie | Clown Zauberer LIAR — Fotos & Videos
  → 49 Zeichen ✓

DESC: Galerie von Clown Zauberer LIAR ✓ Fotos & Videos von Zaubershow, Clownshow & Events in NRW ✓ Presseartikel & Referenzen ✓ 400+ begeisterte Kunden ✓ Überzeugen Sie sich!
  → 168 Zeichen (kürzen auf 158): Galerie von Clown Zauberer LIAR ✓ Fotos & Videos von Zaubershow, Clownshow & Events in NRW ✓ Presseartikel & Referenzen ✓ 400+ begeisterte Kunden!
```

#### Über mich — `src/pages/ueber-mich/index.astro`
```
TITLE: Über Clown Zauberer LIAR | Michael Prescler NRW
  → 50 Zeichen ✓

DESC: Lernen Sie Clown Zauberer LIAR kennen ✓ Michaël Prescler aus Gladbeck ✓ 15 Jahre Erfahrung ✓ 400+ Shows/Jahr ✓ Französischer Entertainer mit Herz & Humor in NRW
  → 161 Zeichen ✓
```

#### Kontakt — `src/pages/kontakt/index.astro`
```
TITLE: Kontakt | Clown Zauberer LIAR | Jetzt anfragen
  → 49 Zeichen ✓

DESC: Kontaktieren Sie Clown Zauberer LIAR ✓ Unverbindliche Anfrage ✓ Antwort innerhalb 24 Stunden ✓ Telefon: 0172 1517578 ✓ Aus Gladbeck für ganz NRW ✓ Jetzt Termin sichern!
  → 168 Zeichen (kürzen auf 160): Kontaktieren Sie Clown Zauberer LIAR ✓ Unverbindliche Anfrage ✓ Antwort in 24h ✓ Tel: 0172 1517578 ✓ Aus Gladbeck für ganz NRW ✓ Jetzt anfragen!
```

---

### 3B. CITY-PAGES — Optimierte Titles + Descriptions (EINZIGARTIG pro Stadt!)

**REGEL:** Jede City-Page muss eine EINZIGARTIGE Description haben. Das Geheimnis: **2-3 Nachbarstädte erwähnen** + **abwechselnde Formulierungen**.

**Änderungen in den jeweiligen `index.astro`-Dateien der City-Pages vornehmen (Frontmatter: `seoTitle` und `seoDescription`).**

---

#### GEBURTSTAG-IN-* (23 Seiten)

**Title-Muster:** `Kindergeburtstag [Stadt] | Zaubershow ab 150€`
→ Max 55 Zeichen, Keyword vorne, Preis als CTR-Booster

| Stadt | Title (max 60 Zeichen) | Description (140-160 Zeichen, EINZIGARTIG) |
|---|---|---|
| geburtstag-in-bochum | `Kindergeburtstag Bochum \| Zaubershow ab 150€` (46) | `Kindergeburtstag in Bochum mit Clown LIAR ✓ Zaubershow ab 150€ ✓ Ballonmodellage ✓ 400+ Bewertungen ✓ Auch in Herne & Dortmund ✓ Jetzt buchen!` (146) |
| geburtstag-in-bottrop | `Kindergeburtstag Bottrop \| Zaubershow ab 150€` (47) | `Kindergeburtstag in Bottrop feiern! Clown Zauberer LIAR ✓ Zaubershow ab 150€ ✓ Glitzer-Tattoos ✓ 400+ Bewertungen ✓ Auch in Gladbeck & Essen ✓ Buchen!` (153) |
| geburtstag-in-castrop-rauxel | `Kindergeburtstag Castrop-Rauxel \| Zaubershow ab 150€` (53) | `Kindergeburtstag in Castrop-Rauxel mit Clown LIAR ✓ Zaubershow ab 150€ ✓ Ballonmodellage ✓ 400+ Bewertungen ✓ Auch in Recklinghausen & Dortmund!` (148) |
| geburtstag-in-datteln | `Kindergeburtstag Datteln \| Zaubershow ab 150€` (47) | `Kindergeburtstag in Datteln unvergesslich feiern! Clown LIAR ✓ Zaubershow ab 150€ ✓ 400+ Bewertungen ✓ Auch in Waltrop & Recklinghausen ✓ Anfragen!` (151) |
| geburtstag-in-dinslaken | `Kindergeburtstag Dinslaken \| Zaubershow ab 150€` (49) | `Kindergeburtstag in Dinslaken mit Clown Zauberer LIAR ✓ Zaubershow ab 150€ ✓ Ballonmodellage ✓ 400+ Bewertungen ✓ Auch in Duisburg & Oberhausen!` (148) |
| geburtstag-in-dorsten | `Kindergeburtstag Dorsten \| Zaubershow ab 150€` (47) | `Kindergeburtstag in Dorsten mit Clown LIAR ✓ Zaubershow ab 150€ ✓ Glitzer-Tattoos ✓ 400+ Top-Bewertungen ✓ Auch in Marl & Haltern ✓ Jetzt buchen!` (150) |
| geburtstag-in-dortmund | `Kindergeburtstag Dortmund \| Zaubershow ab 150€` (48) | `Kindergeburtstag in Dortmund feiern! Clown Zauberer LIAR ✓ Zaubershow ab 150€ ✓ 400+ Bewertungen ✓ Auch in Bochum & Herne ✓ Jetzt unverbindlich anfragen!` (157) |
| geburtstag-in-duesseldorf | `Kindergeburtstag Düsseldorf \| Zaubershow ab 150€` (50) | `Kindergeburtstag in Düsseldorf mit Clown LIAR ✓ Zaubershow ab 150€ ✓ Ballonmodellage ✓ 400+ Bewertungen ✓ Auch in Duisburg & Mülheim ✓ Jetzt buchen!` (153) |
| geburtstag-in-duisburg | `Kindergeburtstag Duisburg \| Zaubershow ab 150€` (48) | `Kindergeburtstag in Duisburg unvergesslich machen! Clown LIAR ✓ Zaubershow ab 150€ ✓ 400+ Bewertungen ✓ Auch in Oberhausen & Dinslaken ✓ Anfragen!` (150) |
| geburtstag-in-essen | `Kindergeburtstag Essen \| Zaubershow ab 150€` (46) | `Kindergeburtstag in Essen feiern mit Clown LIAR ✓ Zaubershow ab 150€ ✓ Ballonmodellage & Glitzer-Tattoos ✓ 400+ Bewertungen ✓ Auch in Mülheim & Bochum!` (155) |
| geburtstag-in-gelsenkirchen | `Kindergeburtstag Gelsenkirchen \| Zaubershow ab 150€` (52) | `Kindergeburtstag in Gelsenkirchen mit Clown LIAR ✓ Zaubershow ab 150€ ✓ 400+ Top-Bewertungen ✓ Auch in Gladbeck & Herten ✓ Jetzt unverbindlich buchen!` (155) |
| geburtstag-in-gladbeck | `Kindergeburtstag Gladbeck \| Zaubershow ab 150€` (48) | `Kindergeburtstag in Gladbeck — Heimatstadt von Clown LIAR! ✓ Zaubershow ab 150€ ✓ Keine Fahrtkosten ✓ 400+ Bewertungen ✓ Ballonmodellage ✓ Jetzt buchen!` (157) |
| geburtstag-in-haltern-am-see | `Kindergeburtstag Haltern am See \| Zaubershow ab 150€` (54) | `Kindergeburtstag in Haltern am See mit Clown LIAR ✓ Zaubershow ab 150€ ✓ 400+ Bewertungen ✓ Auch in Marl & Dorsten ✓ Jetzt unverbindlich anfragen!` (150) |
| geburtstag-in-herne | `Kindergeburtstag Herne \| Zaubershow ab 150€` (46) | `Kindergeburtstag in Herne feiern! Clown Zauberer LIAR ✓ Zaubershow ab 150€ ✓ 400+ Top-Bewertungen ✓ Auch in Bochum & Gelsenkirchen ✓ Jetzt buchen!` (151) |
| geburtstag-in-herten | `Kindergeburtstag Herten \| Zaubershow ab 150€` (47) | `Kindergeburtstag in Herten unvergesslich machen! Clown LIAR ✓ Zaubershow ab 150€ ✓ 400+ Bewertungen ✓ Auch in Recklinghausen & Marl ✓ Jetzt anfragen!` (154) |
| geburtstag-in-marl | `Kindergeburtstag Marl \| Zaubershow ab 150€` (45) | `Kindergeburtstag in Marl mit Clown Zauberer LIAR ✓ Zaubershow ab 150€ ✓ Ballonmodellage ✓ 400+ Bewertungen ✓ Auch in Dorsten & Haltern ✓ Jetzt buchen!` (155) |
| geburtstag-in-moers | `Kindergeburtstag Moers \| Zaubershow ab 150€` (46) | `Kindergeburtstag in Moers feiern! Clown LIAR ✓ Zaubershow ab 150€ ✓ Glitzer-Tattoos ✓ 400+ Top-Bewertungen ✓ Auch in Duisburg & Dinslaken ✓ Buchen!` (152) |
| geburtstag-in-muelheim | `Kindergeburtstag Mülheim \| Zaubershow ab 150€` (48) | `Kindergeburtstag in Mülheim an der Ruhr mit Clown LIAR ✓ Zaubershow ab 150€ ✓ 400+ Bewertungen ✓ Auch in Essen & Oberhausen ✓ Jetzt buchen!` (145) |
| geburtstag-in-oberhausen | `Kindergeburtstag Oberhausen \| Zaubershow ab 150€` (50) | `Kindergeburtstag in Oberhausen mit Clown LIAR ✓ Zaubershow ab 150€ ✓ Ballonmodellage ✓ 400+ Top-Bewertungen ✓ Auch in Gladbeck & Bottrop ✓ Buchen!` (151) |
| geburtstag-in-recklinghausen | `Kindergeburtstag Recklinghausen \| Zaubershow ab 150€` (54) | `Kindergeburtstag in Recklinghausen feiern! Clown LIAR ✓ Zaubershow ab 150€ ✓ 400+ Bewertungen ✓ Auch in Herten & Marl ✓ Jetzt unverbindlich anfragen!` (154) |
| geburtstag-in-waltrop | `Kindergeburtstag Waltrop \| Zaubershow ab 150€` (47) | `Kindergeburtstag in Waltrop unvergesslich machen! Clown LIAR ✓ Zaubershow ab 150€ ✓ 400+ Bewertungen ✓ Auch in Datteln & Castrop-Rauxel ✓ Anfragen!` (152) |
| geburtstag-in-wesel | `Kindergeburtstag Wesel \| Zaubershow ab 150€` (46) | `Kindergeburtstag in Wesel mit Clown Zauberer LIAR ✓ Zaubershow ab 150€ ✓ 400+ Bewertungen ✓ Auch in Dinslaken & Moers ✓ Jetzt unverbindlich buchen!` (152) |
| geburtstag-in-xanten | `Kindergeburtstag Xanten \| Zaubershow ab 150€` (47) | `Kindergeburtstag in Xanten feiern! Clown LIAR ✓ Zaubershow ab 150€ ✓ Ballonmodellage & Glitzer-Tattoos ✓ 400+ Bewertungen ✓ Auch in Wesel ✓ Jetzt buchen!` (158) |

---

#### KINDERZAUBERER-IN-* (18 Seiten)

**Title-Muster:** `Kinderzauberer [Stadt] | TOP Bewertet | Buchen`
→ Max 55 Zeichen

| Stadt | Title (max 60 Zeichen) | Description (140-160 Zeichen, EINZIGARTIG) |
|---|---|---|
| kinderzauberer-in-bochum | `Kinderzauberer Bochum \| TOP Bewertet \| Buchen` (48) | `Kinderzauberer in Bochum buchen ✓ Zaubershow für Kindergeburtstag & Events ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Herne & Dortmund ✓ Jetzt anfragen!` (153) |
| kinderzauberer-in-bottrop | `Kinderzauberer Bottrop \| TOP Bewertet \| Buchen` (49) | `Kinderzauberer in Bottrop für Kindergeburtstag & Feste ✓ Clown LIAR ✓ 400+ Top-Bewertungen ✓ Ab 150€ ✓ Auch in Gladbeck & Oberhausen ✓ Jetzt buchen!` (154) |
| kinderzauberer-in-datteln | `Kinderzauberer Datteln \| TOP Bewertet \| Buchen` (49) | `Kinderzauberer in Datteln buchen ✓ Lustige Zaubershow für Kinder ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Waltrop & Recklinghausen ✓ Jetzt anfragen!` (151) |
| kinderzauberer-in-dinslaken | `Kinderzauberer Dinslaken \| TOP Bewertet \| Buchen` (51) | `Kinderzauberer in Dinslaken für Ihren Kindergeburtstag ✓ Clown LIAR ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Duisburg & Oberhausen ✓ Jetzt anfragen!` (151) |
| kinderzauberer-in-dorsten | `Kinderzauberer Dorsten \| TOP Bewertet \| Buchen` (49) | `Kinderzauberer in Dorsten buchen ✓ Zaubershow für Kinder ✓ 400+ Top-Bewertungen ✓ Ab 150€ ✓ Auch in Marl & Haltern am See ✓ Jetzt unverbindlich anfragen!` (158) |
| kinderzauberer-in-dortmund | `Kinderzauberer Dortmund \| TOP Bewertet \| Buchen` (50) | `Kinderzauberer in Dortmund für Kindergeburtstag & Events ✓ Clown LIAR ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Bochum & Herne ✓ Jetzt buchen!` (146) |
| kinderzauberer-in-duesseldorf | `Kinderzauberer Düsseldorf \| TOP Bewertet \| Buchen` (52) | `Kinderzauberer in Düsseldorf buchen ✓ Lustige Zaubershow für Kindergeburtstag ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Duisburg & Mülheim ✓ Anfragen!` (152) |
| kinderzauberer-in-duisburg | `Kinderzauberer Duisburg \| TOP Bewertet \| Buchen` (50) | `Kinderzauberer in Duisburg für Kinder-Events & Geburtstag ✓ Clown LIAR ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Oberhausen & Dinslaken ✓ Jetzt buchen!` (154) |
| kinderzauberer-in-essen | `Kinderzauberer Essen \| TOP Bewertet \| Buchen` (47) | `Kinderzauberer in Essen buchen ✓ Zaubershow für Kindergeburtstag & Kita ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Mülheim & Bochum ✓ Jetzt anfragen!` (150) |
| kinderzauberer-in-gelsenkirchen | `Kinderzauberer Gelsenkirchen \| TOP Bewertet` (46) | `Kinderzauberer in Gelsenkirchen für Kindergeburtstag ✓ Clown LIAR ✓ 400+ Top-Bewertungen ✓ Ab 150€ ✓ Auch in Gladbeck & Herten ✓ Jetzt buchen!` (148) |
| kinderzauberer-in-haltern | `Kinderzauberer Haltern \| TOP Bewertet \| Buchen` (49) | `Kinderzauberer in Haltern am See buchen ✓ Zaubershow ab 150€ ✓ 400+ Bewertungen ✓ Clown LIAR ✓ Auch in Dorsten & Marl ✓ Jetzt unverbindlich anfragen!` (154) |
| kinderzauberer-in-herne | `Kinderzauberer Herne \| TOP Bewertet \| Buchen` (47) | `Kinderzauberer in Herne für Kindergeburtstag & Feste ✓ Clown LIAR ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Bochum & Gelsenkirchen ✓ Jetzt buchen!` (149) |
| kinderzauberer-in-herten | `Kinderzauberer Herten \| TOP Bewertet \| Buchen` (48) | `Kinderzauberer in Herten buchen ✓ Lustige Zaubershow für Kinder ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Recklinghausen & Marl ✓ Jetzt anfragen!` (148) |
| kinderzauberer-in-marl | `Kinderzauberer Marl \| TOP Bewertet \| Buchen` (46) | `Kinderzauberer in Marl für Ihren Kindergeburtstag ✓ Clown LIAR ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Dorsten & Recklinghausen ✓ Jetzt buchen!` (148) |
| kinderzauberer-in-moers | `Kinderzauberer Moers \| TOP Bewertet \| Buchen` (47) | `Kinderzauberer in Moers buchen ✓ Zaubershow für Kindergeburtstag ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Duisburg & Dinslaken ✓ Jetzt anfragen!` (148) |
| kinderzauberer-in-muelheim | `Kinderzauberer Mülheim \| TOP Bewertet \| Buchen` (49) | `Kinderzauberer in Mülheim an der Ruhr ✓ Zaubershow für Kinder ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Essen & Oberhausen ✓ Jetzt unverbindlich buchen!` (154) |
| kinderzauberer-in-oberhausen | `Kinderzauberer Oberhausen \| TOP Bewertet \| Buchen` (52) | `Kinderzauberer in Oberhausen für Kinder-Events ✓ Clown LIAR ✓ 400+ Top-Bewertungen ✓ Ab 150€ ✓ Auch in Gladbeck & Bottrop ✓ Jetzt anfragen!` (146) |
| kinderzauberer-in-recklinghausen | `Kinderzauberer Recklinghausen \| TOP Bewertet` (47) | `Kinderzauberer in Recklinghausen buchen ✓ Zaubershow für Kindergeburtstag ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Herten & Marl ✓ Jetzt anfragen!` (149) |

---

#### CLOWN-IN-* (18 Seiten)

**Title-Muster:** `Clown [Stadt] | TOP Bewertungen | Buchen`

**WICHTIG: In JEDER Description den Grammatikfehler fixen!**
- ALT: "DER französischer Clown"
- NEU: "DER französische Clown" (oder besser: ganz weglassen und durch besseren Text ersetzen)

| Stadt | Title (max 60 Zeichen) | Description (140-160 Zeichen, EINZIGARTIG) |
|---|---|---|
| clown-in-bochum | `Clown Bochum \| TOP Bewertungen \| Jetzt buchen` (48) | `Clown in Bochum buchen ✓ Französischer Clown Zauberer LIAR ✓ 400+ Top-Bewertungen ✓ Für Kindergeburtstag & Events ✓ Auch in Herne & Dortmund ✓ Anfragen!` (157) |
| clown-in-bottrop | `Clown Bottrop \| TOP Bewertungen \| Jetzt buchen` (49) | `Clown in Bottrop für Kindergeburtstag & Feste ✓ Clown Zauberer LIAR ✓ 400+ Bewertungen ✓ Lustig & magisch ✓ Auch in Gladbeck & Oberhausen ✓ Buchen!` (152) |
| clown-in-datteln | `Clown Datteln \| TOP Bewertungen \| Jetzt buchen` (49) | `Clown in Datteln buchen ✓ Französischer Clown LIAR ✓ 400+ Bewertungen ✓ Für Kindergeburtstag & Events ✓ Auch in Waltrop & Recklinghausen ✓ Anfragen!` (153) |
| clown-in-dinslaken | `Clown Dinslaken \| TOP Bewertungen \| Jetzt buchen` (51) | `Clown in Dinslaken für Ihre Feier ✓ Clown Zauberer LIAR ✓ 400+ Top-Bewertungen ✓ Lustige Clownshow ✓ Auch in Duisburg & Oberhausen ✓ Jetzt buchen!` (151) |
| clown-in-dorsten | `Clown Dorsten \| TOP Bewertungen \| Jetzt buchen` (49) | `Clown in Dorsten buchen ✓ Clown Zauberer LIAR ✓ 400+ Bewertungen ✓ Lustige Show für Kindergeburtstag ✓ Auch in Marl & Haltern ✓ Jetzt anfragen!` (148) |
| clown-in-dortmund | `Clown Dortmund \| TOP Bewertungen \| Jetzt buchen` (50) | `Clown in Dortmund für Kindergeburtstag & Events ✓ Französischer Clown LIAR ✓ 400+ Bewertungen ✓ Ab 150€ ✓ Auch in Bochum & Herne ✓ Jetzt buchen!` (150) |
| clown-in-duesseldorf | `Clown Düsseldorf \| TOP Bewertungen \| Jetzt buchen` (52) | `Clown in Düsseldorf buchen ✓ Clown Zauberer LIAR ✓ 400+ Top-Bewertungen ✓ Für Kindergeburtstag & Feste ✓ Auch in Duisburg & Mülheim ✓ Anfragen!` (148) |
| clown-in-duisburg | `Clown Duisburg \| TOP Bewertungen \| Jetzt buchen` (50) | `Clown in Duisburg für Ihre Feier ✓ Französischer Clown LIAR ✓ 400+ Bewertungen ✓ Lustige Clownshow ✓ Auch in Oberhausen & Dinslaken ✓ Jetzt buchen!` (153) |
| clown-in-essen | `Clown Essen \| TOP Bewertungen \| Jetzt buchen` (47) | `Clown in Essen buchen ✓ Clown Zauberer LIAR ✓ 400+ Bewertungen ✓ Für Kindergeburtstag, Kita & Events ✓ Auch in Mülheim & Bochum ✓ Jetzt anfragen!` (151) |
| clown-in-gelsenkirchen | `Clown Gelsenkirchen \| TOP Bewertungen \| Buchen` (49) | `Clown in Gelsenkirchen für Kindergeburtstag ✓ Clown LIAR ✓ 400+ Top-Bewertungen ✓ Lustig & magisch ✓ Auch in Gladbeck & Herten ✓ Jetzt buchen!` (148) |
| clown-in-gladbeck | `Clown Gladbeck \| TOP Bewertungen \| Jetzt buchen` (50) | `Clown in Gladbeck — Heimatstadt von LIAR! ✓ Keine Fahrtkosten ✓ 400+ Bewertungen ✓ Für Kindergeburtstag & Events ✓ Zaubershow ab 150€ ✓ Jetzt buchen!` (155) |
| clown-in-haltern | `Clown Haltern \| TOP Bewertungen \| Jetzt buchen` (49) | `Clown in Haltern am See buchen ✓ Clown Zauberer LIAR ✓ 400+ Bewertungen ✓ Für Kindergeburtstag & Feste ✓ Auch in Dorsten & Marl ✓ Jetzt anfragen!` (150) |
| clown-in-herne | `Clown Herne \| TOP Bewertungen \| Jetzt buchen` (47) | `Clown in Herne für Kindergeburtstag & Events ✓ Französischer Clown LIAR ✓ 400+ Bewertungen ✓ Lustig & magisch ✓ Auch in Bochum & GE ✓ Jetzt buchen!` (153) |
| clown-in-herten | `Clown Herten \| TOP Bewertungen \| Jetzt buchen` (48) | `Clown in Herten buchen ✓ Clown Zauberer LIAR ✓ 400+ Top-Bewertungen ✓ Für Kindergeburtstag ✓ Auch in Recklinghausen & Marl ✓ Jetzt anfragen!` (147) |
| clown-in-marl | `Clown Marl \| TOP Bewertungen \| Jetzt buchen` (46) | `Clown in Marl für Ihre Feier ✓ Französischer Clown LIAR ✓ 400+ Bewertungen ✓ Lustige Clownshow ✓ Auch in Dorsten & Recklinghausen ✓ Buchen!` (146) |
| clown-in-muelheim | `Clown Mülheim \| TOP Bewertungen \| Jetzt buchen` (49) | `Clown in Mülheim an der Ruhr ✓ Clown Zauberer LIAR ✓ 400+ Bewertungen ✓ Für Kindergeburtstag & Events ✓ Auch in Essen & Oberhausen ✓ Jetzt buchen!` (152) |
| clown-in-oberhausen | `Clown Oberhausen \| TOP Bewertungen \| Jetzt buchen` (52) | `Clown in Oberhausen buchen ✓ Clown LIAR ✓ 400+ Top-Bewertungen ✓ Für Kindergeburtstag ✓ Lustig & magisch ✓ Auch in Gladbeck & Bottrop ✓ Anfragen!` (151) |
| clown-in-recklinghausen | `Clown Recklinghausen \| TOP Bewertungen \| Buchen` (50) | `Clown in Recklinghausen für Kindergeburtstag ✓ Französischer Clown LIAR ✓ 400+ Bewertungen ✓ Auch in Herten & Marl ✓ Jetzt unverbindlich anfragen!` (151) |

---

## AUFGABE 4: Bühnenzauberer "300+" → "400+" fixen

**Datei:** `src/pages/zauberer/buehnen-zauberer/index.astro`

Suche nach ALLEN Vorkommen von "300" und ersetze durch "400":
- In der Description (seoDescription)
- Im Content der Seite (z.B. "Über 300 zufriedene Kunden" → "Über 400 zufriedene Kunden")

---

## AUFGABE 5: Sitemap aktualisieren

**Datei:** `public/sitemap.xml`

Folgende Änderungen:

1. **ALLE URLs von `https://liar-entertainer.com/` auf `https://www.liar-entertainer.com/` ändern** (nach Aufgabe 1)

2. **Redirect-URLs ENTFERNEN:**
   - `https://liar-entertainer.com/clown/clown-zauberer/` (redirected zu /clown/clownshow/)
   - `https://liar-entertainer.com/zauberer/zaubershow/karneval/` (redirected zu /clown/karneval/)

3. **lastmod für City-Pages aktualisieren** — von 2023-08 auf `2026-04-07` (heutiges Datum)

4. **image:image Tags für City-Pages hinzufügen** (optional, aber empfohlen)

---

## AUFGABE 6: Sitemap in robots.txt aktualisieren

**Datei:** `public/robots.txt`

```
# ALT:
Sitemap: https://www.liar-entertainer.com/sitemap.xml

# Bestätigen, dass dies korrekt ist (mit www) ✓
# Falls es NICHT www hat, auf www ändern
```

---

## ZUSAMMENFASSUNG DER REIHENFOLGE

1. ✅ `astro.config.mjs` → site auf www ändern
2. ✅ `public/.htaccess` → Alle fehlenden 301-Redirects einfügen
3. ✅ `dist/.htaccess` → Gleiche Redirects einfügen
4. ✅ Bühnenzauberer → 300+ auf 400+ fixen
5. ✅ Alle Hauptseiten → Optimierte Titles + Descriptions einsetzen
6. ✅ Alle 23 geburtstag-in-* → Einzigartige Titles + Descriptions
7. ✅ Alle 18 kinderzauberer-in-* → Einzigartige Titles + Descriptions
8. ✅ Alle 18 clown-in-* → Einzigartige Titles + Descriptions (Grammatik gefixt!)
9. ✅ `public/sitemap.xml` → URLs auf www, lastmod aktualisieren, Redirect-URLs entfernen
10. ✅ Build ausführen: `npm run build`
11. ✅ Deploy
12. ✅ In Google Search Console: Sitemap erneut einreichen

---

## AUFGABE 7: NEU — Core Web Vitals optimieren (CLS + LCP)

**Problem (aus GSC, Stand 06.04.2026):** 47 mobile URLs haben "Optimierung erforderlich":
- **CLS-Fehler: mehr als 0,1** (Cumulative Layout Shift) — 47 URLs
- **LCP: länger als 2,5s** (Largest Contentful Paint) — 47 URLs

**Maßnahmen:**

### CLS fixen (Layout-Verschiebungen verhindern):
1. **Bilder:** Alle `<img>` Tags müssen `width` und `height` Attribute haben, damit der Browser den Platz reserviert
2. **Fonts:** Poppins-Font mit `font-display: swap` laden und ggf. `preload` verwenden
3. **Hero-Bilder:** Feste Höhe für Hero-Sektionen auf Mobile setzen (z.B. `min-h-[300px]`), damit der Content nicht springt wenn das Bild lädt
4. **Lazy-loaded Elemente:** Google Reviews Widget und ähnliche dynamisch geladene Inhalte brauchen feste Container-Dimensionen

### LCP verbessern (Ladezeit des größten Elements):
1. **Hero-Bilder optimieren:** WebP-Format verwenden, Bilder komprimieren (max 100KB für mobile), `loading="eager"` für Above-the-fold Hero-Bilder (NICHT lazy)
2. **Preload für Hero-Bild:** `<link rel="preload" as="image" href="hero.webp">` im Head
3. **Critical CSS:** Sicherstellen dass Tailwind-Purge aktiv ist (sollte bei Astro default sein)
4. **Server-Antwortzeit:** Ggf. Caching-Header in .htaccess optimieren:
```apache
# Browser-Caching für statische Assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# GZIP Kompression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>
```

---

## AUFGABE 8: NEU — Rezensions-Snippet Fehler auf /zauberer/ fixen

**Problem (aus GSC):** Die Seite `https://liar-entertainer.com/zauberer/` hat ein ungültiges Rezensions-Snippet:
- **Fehler:** "Ungültiger Objekttyp für Feld '<parent_node>'"
- **Erstmals erkannt:** 05.04.2026

**Ursache:** Auf der `/zauberer/`-Seite gibt es ein Schema.org JSON-LD mit einem AggregateRating, das entweder:
- Nicht innerhalb eines gültigen Parent-Typs (z.B. LocalBusiness, Product, Organization) verschachtelt ist
- Oder einen eigenständigen `AggregateRating`-Typ hat, der nicht von Google unterstützt wird

**Fix:** Überprüfe die `/zauberer/`-Seite (`src/pages/zauberer/index.astro`) und stelle sicher, dass das AggregateRating immer innerhalb eines `LocalBusiness` oder `Service` Schema-Typs verschachtelt ist:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Zauberer in NRW",
  "provider": {
    "@type": "LocalBusiness",
    "name": "LIAR Entertainer",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "400",
      "bestRating": "5"
    }
  }
}
```

Das AggregateRating darf NICHT als eigenständiges Top-Level-Element existieren.

---

## AUFGABE 9: NEU — "Gecrawlt – zurzeit nicht indexiert" (131 URLs) — Redirects für alte URL-Muster

**Problem:** 131 URLs sind von Google gecrawlt, werden aber nicht indexiert. Das sind hauptsächlich alte WordPress-URL-Strukturen mit doppelten Pfaden:
- `/clown/zauberer/zaubershow/` (sollte → `/zauberer/zaubershow/`)
- `/clown/zauberer/kinderzauberer/kinderzauberer-in-bochum/` (sollte → `/kinderzauberer/kinderzauberer-in-bochum/`)
- `/zauberer/kinderzauberer/kinderzauberer-in-muelheim/attachment/...` (Attachment-Seiten → 410 Gone)
- Blog-Posts wie `/pantomime-bei-extraschicht/`, `/zaubershow-sommer-2025/` (→ Blog-Übersicht oder Hauptseite)

**Maßnahmen in `.htaccess`:**

```apache
# Doppelte Pfad-Muster bereinigen
RedirectMatch 301 ^/clown/zauberer/zaubershow/$ /zauberer/zaubershow/
RedirectMatch 301 ^/clown/zauberer/kinderzauberer/(.*) /kinderzauberer/$1
RedirectMatch 301 ^/zauberer/kinderzauberer/(kinderzauberer-in-[^/]+)/$ /kinderzauberer/$1/

# Attachment-Seiten (WordPress-Relikte) → 410 Gone
RewriteRule ^.*/attachment/.*$ - [G,L]

# Alte Blog-Posts → Blog-Übersicht oder Startseite
RedirectMatch 301 ^/pantomime-bei-extraschicht/$ /
RedirectMatch 301 ^/zaubershow-sommer-2025/$ /
RedirectMatch 301 ^/zaubershow-in-duisburg-midsommarfest/$ /
RedirectMatch 301 ^/kultur-und-kinderfest-auf-dem-resse-markt-clown-zaubershow-in-gelsenkirchen/$ /
RedirectMatch 301 ^/pantomime-auf-dem-appeltatenfest/$ /
```

---

## AUFGABE 10: NEU — Keyword Quick Wins (Position 5-20 → Seite 1 bringen)

**Quelle:** GSC Leistungsbericht (3 Monate: 1.491 Klicks, 79.869 Impressionen, CTR 1,9%, Ø Position 13,9)

Diese Keywords haben hohe Impressionen, aber ranken noch auf Seite 2. Mit optimierten Titles/Descriptions und besserem Content können sie auf Seite 1 gebracht werden:

### HIGH-PRIORITY Quick Wins (hohe Impressionen, Seite 2):

| Keyword | Impressionen | Position | Zielseite | Maßnahme |
|---------|-------------|----------|-----------|----------|
| **zauberer kindergeburtstag** | 1.117 | 15,8 | /kindergeburtstag/ | Title + H1 optimieren: "Zauberer für Kindergeburtstag" prominent |
| **zauberer für kindergeburtstag** | 784 | 18,3 | /kindergeburtstag/ | Description mit "Zauberer für Kindergeburtstag buchen" |
| **kinderzauberer** | 724 | 19,8 | /kinderzauberer/ | Mehr Content + interne Links auf /kinderzauberer/ |
| **zauberer gladbeck** | 404 | 1,7 | / | CTR verbessern! Position 1-2 aber nur 1,2% CTR → Title attraktiver |
| **clown für kindergeburtstag** | 326 | 9,2 | /clown/clownshow/ | Knapp Seite 1 — Title/Description optimieren |
| **clown kindergeburtstag** | 320 | 11,4 | /clown/clownshow/ | Seite 2 → Content erweitern |
| **clown buchen** | 301 | 16,5 | /clown/clownshow/ | Starkes kommerzielles Keyword |
| **kinderkarneval in der nähe** | 274 | 10,3 | ? | Karneval-Content erstellen oder Karneval-Seite optimieren |
| **kindergeburtstag gladbeck** | 144 | 10,5 | /kindergeburtstag/ | Lokale Relevanz in Description betonen |
| **kindergeburtstag mülheim** | 95 | 10,2 | /kindergeburtstag/geburtstag-in-muelheim/ | City-Page optimieren |

### Spezifische Maßnahmen:

1. **"zauberer gladbeck" (Pos. 1,7, CTR nur 1,2%):**
   - Die CTR ist VIEL zu niedrig für Position 1-2. Der Title/Description ist wahrscheinlich nicht ansprechend genug
   - Optimiere Description: Handlungsaufforderung, Preis, USP → "Zauberer in Gladbeck ✓ Kindergeburtstag ab 150€ ✓ 400+ Shows/Jahr ✓ Jetzt anfragen!"

2. **"zauberer kindergeburtstag" (1.117 Impressionen, Pos. 15,8):**
   - DAS ist das wertvollste Keyword! 1.117 Impressionen pro Quartal
   - /kindergeburtstag/ muss für dieses Keyword optimiert werden
   - H1 anpassen: "Zauberer für Kindergeburtstag in NRW"
   - Internes Linking von allen City-Pages hierhin mit Ankertext "Zauberer Kindergeburtstag"

3. **"kinderzauberer" (724 Impressionen, Pos. 19,8):**
   - Die /kinderzauberer/-Hauptseite rankt auf Pos. 20 — mehr unique Content nötig
   - FAQ-Schema mit "Was kostet ein Kinderzauberer?", "Wie lange dauert eine Kinderzaubershow?" etc.
   - Mehr interne Links mit Ankertext "Kinderzauberer"

4. **"clown buchen" (301 Impressionen, Pos. 16,5):**
   - Sehr kommerzielles Keyword (Kaufintention!)
   - Title der /clown/clownshow/ optimieren: "Clown buchen für Kindergeburtstag | Ab 150€ in NRW"

---

## AUFGABE 11: NEU — Backlink-Strategie

**Aktueller Stand:** 70 externe Links (sehr wenig!)
- Top-Quellen: city-map.com (9), dackel-nrw.de (9), provenexpert.com (4), dastelefonbuch.de (3), linkedin.com (3)
- 64 von 70 Links gehen zur Homepage — fast keine Deep-Links

**Empfohlene Maßnahmen:**
1. **Google Business Profile** überprüfen und optimieren (falls vorhanden)
2. **Branchenverzeichnisse:** Eintrag bei yelp.de, golocal.de, branchenbuch.meinestadt.de, kennstdueinen.de
3. **ProvenExpert:** Mehr Bewertungen sammeln (aktuell nur 4 Links von dort)
4. **Lokale Presse:** Pressemitteilungen bei lokalen Medien in Gladbeck/Gelsenkirchen
5. **YouTube-Kanal** (bereits verknüpft) → Videos mit Link in Description zu relevanten Seiten

---

## AUFGABE 12: ✅ ERLEDIGT (10.04.2026) — Trailing-Slash-Duplikat-Problem fixen

**Problem:** Google Search Console zeigt, dass einige City-Pages als **Duplikat** eingestuft werden, weil Google die Version MIT und OHNE Trailing Slash als zwei verschiedene URLs behandelt.

**Beispiel gefunden bei `geburtstag-in-castrop-rauxel`:**
- Vom Nutzer angegebene kanonische URL: `https://liar-entertainer.com/kindergeburtstag/geburtstag-in-castrop-rauxel/` (MIT /)
- Von Google ausgewählte kanonische URL: `https://liar-entertainer.com/kindergeburtstag/geburtstag-in-castrop-rauxel` (OHNE /)
- Ergebnis: "Seite ist nicht indexiert: Duplikat – Google hat eine andere Seite als der Nutzer als kanonische Seite bestimmt"

**Lösung (2 Schritte):**

### Schritt 1: `astro.config.mjs` Trailing Slash erzwingen
```javascript
// In astro.config.mjs hinzufügen/prüfen:
export default defineConfig({
  site: 'https://www.liar-entertainer.com',
  trailingSlash: 'always',  // ← PFLICHT! Erzwingt immer Trailing Slash
  // ... rest der config
});
```

### Schritt 2: `.htaccess` Trailing-Slash-Redirect
```apache
# Trailing Slash erzwingen (OHNE Slash → MIT Slash)
# WICHTIG: Nur für Verzeichnisse, nicht für Dateien mit Endung
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ /$1/ [R=301,L]
```

### Schritt 3: Canonical URLs prüfen
Stelle sicher, dass ALLE canonical Tags in den Seiten-Templates auf die Version MIT Trailing Slash zeigen.

### ✅ STATUS (verifiziert am 10.04.2026)
- `astro.config.mjs` → `trailingSlash: 'always'` ✅ gesetzt
- `public/.htaccess` → Trailing-Slash-Redirect vorhanden (Zeilen 19–22, `RewriteRule ^(.+)$ /$1/ [R=301,L]`) ✅
- `BaseLayout.astro` → nutzt `Astro.url.href` für Canonical, damit automatisch mit Slash ✅
- Sitemap (`src/pages/sitemap.xml.ts`) → alle URLs enden mit `/` ✅
- **Google muss jetzt nur noch die neuen Canonicals neu crawlen** (passiert automatisch bei nächster Indexierung)

---

## AUFGABE 13: ✅ ERLEDIGT (10.04.2026) — Sitemap-URLs auf non-www ändern

**Problem:** Die Canonical URLs der Website sind **OHNE www** (`https://liar-entertainer.com/...`), aber die Sitemap enthält **www-URLs**. Google sieht das als Widerspruch.

**Beweis aus GSC URL-Prüfung:**
- Kanonische URL von Google: `https://liar-entertainer.com/kindergeburtstag/geburtstag-in-moers/`
- www-Version: "Seite mit Weiterleitung" (nicht indexiert)
- non-www Version: "Seite ist indexiert" ✅

**Das bedeutet:** Der Server leitet www → non-www weiter. Die tatsächlich indexierten URLs sind OHNE www.

**Lösung — 2 Optionen (EINE wählen):**

**Option A: Site-URL auf non-www setzen (EMPFOHLEN — passt zum Server-Setup)**
```javascript
// astro.config.mjs — Site OHNE www, da der Server non-www bevorzugt
site: 'https://liar-entertainer.com',
```
→ Dann generiert Astro automatisch Sitemap + Canonicals ohne www
→ Passt zum bestehenden Server-Redirect (www → non-www)

**Option B: Server-Redirect umkehren (www als primär)**
→ .htaccess so ändern, dass non-www → www redirected wird
→ Dann site: 'https://www.liar-entertainer.com' in astro.config.mjs
→ AUFWÄNDIGER: Alle bisherigen Google-Rankings sind auf non-www!

**EMPFEHLUNG: Option A verwenden!** Die Google-Rankings sind bereits auf non-www aufgebaut, also sollte die Site-URL auf `https://liar-entertainer.com` gesetzt werden. Das widerspricht Aufgabe 1 — Aufgabe 1 muss RÜCKGÄNGIG gemacht werden, falls sie bereits umgesetzt wurde.

**Nach der Änderung:**
- `public/sitemap.xml` neu generieren (non-www URLs)
- Sitemap in GSC erneut einreichen

### ✅ STATUS (verifiziert am 10.04.2026)
- `astro.config.mjs` → `site: 'https://liar-entertainer.com'` (non-www) ✅
- `src/pages/sitemap.xml.ts` → `const SITE = 'https://liar-entertainer.com'` ✅
- `src/layouts/BaseLayout.astro` → Canonical-Fallback auf non-www ✅
- `public/.htaccess` → www→non-www Redirect vorhanden (Zeilen 14–15) ✅
- `dist/sitemap.xml` → 0 www-URLs (geprüft via grep) ✅
- `dist/**` Build-Output → keine einzige `www.liar-entertainer.com` Referenz (die einzige `www.liar-entertainer.de`-Erwähnung im Impressum ist legaler Text für die .de-Schwesterdomain und muss so stehen bleiben) ✅
- Drei verwirrende GSC-Properties auf **eine Domain-Property** zusammengeführt (Property `https://liar-entertainer.com/` und `pantomime.liar-entertainer.com` entfernt) ✅

---

## AUFGABE 14: Neuindexierung der restlichen Top-Seiten beantragen

**Hintergrund:** Das tägliche GSC-Kontingent für Indexierungsanfragen wurde nach 5 Seiten erreicht. Folgende Seiten müssen MORGEN nachgereicht werden:

**Bereits beantragt (07.04.2026):**
1. ✅ `geburtstag-in-moers` (Position 8.7)
2. ✅ `geburtstag-in-castrop-rauxel` (Position 6.3)
3. ✅ `geburtstag-in-herten` (Position 6.6)
4. ✅ `geburtstag-in-recklinghausen` (Position 7.5)
5. ✅ `geburtstag-in-dorsten`

**MORGEN beantragen (Tageslimit war erreicht):**
6. ⬜ `/kindergeburtstag/` (Hauptseite — WICHTIGSTE!)
7. ⬜ `/` (Homepage)
8. ⬜ `geburtstag-in-gladbeck`
9. ⬜ `geburtstag-in-gelsenkirchen`
10. ⬜ `geburtstag-in-oberhausen`
11. ⬜ `geburtstag-in-essen`
12. ⬜ `geburtstag-in-bottrop`
13. ⬜ `/zauberer/`
14. ⬜ `/clown/clownshow/`

**Anleitung:** In GSC → URL-Prüfung → URL eingeben (OHNE www: `https://liar-entertainer.com/...`) → "INDEXIERUNG BEANTRAGEN" klicken

---

## GSC-STATUS (Vollständige Analyse, 07.04.2026)

### Zusammenfassung:
- **Manuelle Maßnahmen:** Keine Probleme erkannt ✅
- **Sicherheitsprobleme:** Keine Probleme erkannt ✅
- **robots.txt:** Gültig ✅
- **Google Analytics + YouTube:** Verknüpft ✅
- **Domain-Property:** Vorhanden (liar-entertainer.com) ✅
- **Sitemap:** In URL-Prefix UND Domain-Property eingereicht ✅
- **Crawling-Statistiken:** 12.945 Anfragen in 90 Tagen
- **33% der Crawling-Anfragen = 404-Fehler** → Redirects (Aufgabe 2+9) dringend nötig
- **Durchschnittliche Reaktionszeit: 2.041 ms** → Server langsam, Caching wichtig (Aufgabe 7)

### Structured Data Reports:
- **Navigationspfade:** 0 Ungültig, 40 Gültig ✅
- **FAQs:** 0 Ungültig, 39 Gültig ✅
- **HTTPS:** 0 Nicht-HTTPS, 58 HTTPS ✅
- **Entfernen:** 1 alter Antrag (/content/) — erledigt ✅

### Kanonische URL-Erkenntnis (KRITISCH):
- Google indexiert die **non-www** Variante: `https://liar-entertainer.com/...`
- Die **www**-Version wird als "Seite mit Weiterleitung" behandelt
- Die Sitemap muss daher **non-www** URLs enthalten → siehe Aufgabe 13

## AKTUALISIERTE CHECKLISTE

1. ✅ `astro.config.mjs` → www-URL (ACHTUNG: muss ggf. rückgängig gemacht werden → siehe Aufgabe 13!)
2. ✅ `public/.htaccess` → 301-Redirects für 307 alte 404-URLs
3. ✅ Bühnenzauberer → 300+ auf 400+ gefixt
4. ✅ Alle Seiten → Optimierte Titles + Descriptions
5. ✅ `public/sitemap.xml` → www-URLs, lastmod aktualisiert (ACHTUNG: muss auf non-www → Aufgabe 13!)
6. ✅ Deploy erfolgreich
7. ✅ GSC: Sitemap in URL-Prefix-Property eingereicht
8. ✅ GSC: Sitemap mit www in Domain-Property eingereicht
9. ✅ GSC: Indexierung beantragt für 6 Kernseiten + 5 Top-City-Pages
10. ✅ GSC: Sicherheit + manuelle Maßnahmen geprüft (alles sauber)
11. ✅ GSC: Keyword-Analyse + Backlink-Analyse durchgeführt
12. ✅ GSC: Alle Structured Data Reports geprüft (Breadcrumbs, FAQs, HTTPS — alle sauber)
13. ✅ GSC: Crawling-Statistiken geprüft (33% 404 → Redirects dringend)
14. ✅ GSC: Entfernen-Bereich geprüft (1 alter Antrag, sauber)
15. ⬜ AUFGABE 7: Core Web Vitals optimieren (CLS + LCP für 47 mobile URLs)
16. ⬜ AUFGABE 8: Schema.org Rezensions-Snippet auf /zauberer/ fixen
17. ⬜ AUFGABE 9: Redirects für 131 "Gecrawlt – nicht indexiert" URLs
18. ⬜ AUFGABE 10: Keyword Quick Wins umsetzen (Titles/Descriptions für Top-Keywords)
19. ⬜ AUFGABE 11: Backlink-Aufbau starten
20. ⬜ AUFGABE 12: Trailing-Slash-Duplikat-Problem fixen (KRITISCH!)
21. ⬜ AUFGABE 13: Sitemap-URLs auf non-www ändern (KRITISCH!)
22. ⬜ AUFGABE 14: Restliche Top-Seiten zur Neuindexierung einreichen (morgen)
23. ⬜ Nach Fix Aufgabe 8: In GSC "FEHLERBEHEBUNG ÜBERPRÜFEN" klicken

---

*Erstellt am 07.04.2026 — Aktualisiert am 07.04.2026 nach vollständiger GSC-Analyse (inkl. Structured Data, Crawling-Statistiken, Trailing-Slash-Problem, www/non-www Kanonisierung)*
