# CLAUDE.md — Unterseiten KOMPLETT NEU AUFBAUEN

## Projekt-Übersicht

Astro-Website migriert von WordPress (www.liar-entertainer.com). Dev-Server: **http://localhost:4321**. Projektpfad: `Homepage Neu/`.

**Die Menü-Seiten** (Hauptnavigation auf localhost:4321) sind designtechnisch fertig und dienen als **einzige Design-Referenz**.

**Dein Auftrag:** Jede Unterseite der Kategorien `geburtstag-in-*`, `kinderzauberer-in-*` und `clown-in-*` **KOMPLETT NEU AUFBAUEN**. Nicht reparieren, nicht CSS-fixen — ABREISSEN und NEU BAUEN.

---

## KERN-STRATEGIE: ABREISSEN + NEU BAUEN

Der bisherige Ansatz (WordPress-HTML übernehmen und per CSS/JS reparieren) hat NICHT funktioniert. Die Seiten sehen immer noch schlecht aus.

### Neuer Ansatz für jede Unterseite:
1. **BEHALTEN:** Header, Footer, Meta-Tags, SEO-Daten, Hero-Sektion, Breadcrumb
2. **KOMPLETT LÖSCHEN:** Den gesamten `<div class="wp-scraped city-page">` Inhalt
3. **NEU HOLEN:** Originalseite auf www.liar-entertainer.com öffnen → Sektionsstruktur, Texte, Bilder-URLs erfassen
4. **NEU BAUEN:** Jede Sektion mit sauberem Astro/Tailwind-Markup aufbauen, **exakt wie die Menü-Seiten aussehen**
5. **SCREENSHOT:** Nach dem Aufbau Seite im Browser öffnen und Screenshot zur Kontrolle machen

### Warum dieser Ansatz?
- Das gescrapte WordPress-HTML ist zu kaputt (verschachtelte Sections, falsche Klassen, fehlende Struktur)
- CSS-Fixes und Client-JS-Hacks erzeugen nur Flickwerk
- Sauberes Markup von Grund auf = perfektes Ergebnis

---

## WAS BLEIBT, WAS GEHT

### BEHALTEN (nicht anfassen):
- `BaseLayout` mit allen Meta-Tags, SEO-Titel, Description, Keywords, Schema.org
- Hero-Sektion (Hintergrundbild + Overlay + H1 + Subtitle + Orts-Badge)
- Breadcrumb-Navigation
- Header und Footer (kommen aus BaseLayout)
- Alle SEO-relevanten Daten (canonical URL, og:image, etc.)

### KOMPLETT NEU BAUEN:
- **ALLES zwischen Hero/Breadcrumb und Footer**
- Der Content-Bereich, der aktuell aus `<Fragment set:html={scrapedContent} />` kommt
- Stattdessen: Saubere Astro-Sektionen mit Tailwind-Klassen, identisch zum Design der Menü-Seiten

---

## DIE ZWEI QUELLEN — SO ARBEITEST DU

### Quelle 1: Original-Website → WAS auf die Seite kommt
- **Öffne** https://www.liar-entertainer.com/[slug]/ im Browser
- **Erfasse:** Welche Sektionen gibt es? In welcher Reihenfolge?
- **Kopiere:** Alle Texte (Überschriften, Absätze, Listen, FAQ-Fragen)
- **Notiere:** Alle Bild-URLs (die Bilder liegen auf liar-entertainer.com/wp-content/uploads/)
- Das Original definiert: Struktur, Reihenfolge, Inhalte, Bilder

### Quelle 2: Die 3 PRIMÄREN Design-Referenzseiten → WIE es aussehen soll

**Diese 3 Menü-Seiten sind die HAUPTREFERENZ für das Design aller Unterseiten. Lies ihren Quellcode ZUERST:**

1. **`/kindergeburtstag/`** → `src/pages/kindergeburtstag/index.astro`
   - Zeigt: Hero, Intro (2-Spalten Text+rundes Bild), Blaue Sektion mit Waves, **Preisliste (3 Karten)**, Ballonmodellage/Glitzer-Details, GoogleReviews, FAQ-Accordion, **Einsatzgebiet (2-Spalten + Karte)**, CTA
   - **WICHTIGSTE Referenz für City-Pages** (geburtstag-in-*, kinderzauberer-in-*, clown-in-*)

2. **`/zauberer/tisch-zauberer/`** → `src/pages/zauberer/tisch-zauberer/index.astro`
   - Zeigt: Breadcrumb+H1, Hero mit Overlay, Intro mit Eckdaten-Box (bg-gray-50 rounded-xl), Feature-Grid (4-Spalten Karten), Ablauf-Steps (nummeriert), Galerie-Grid, **Blaue Sektion mit Waves** (Vergleichstabelle), Buchungsprozess (5 Steps), Einsatzgebiet, Dunkle CTA-Sektion
   - **Referenz für: Eckdaten-Boxen, Feature-Grids, Step-Prozesse, Galerie-Layouts**

3. **`/zauberer/buehnen-zauberer/`** → `src/pages/zauberer/buehnen-zauberer/index.astro`
   - Zeigt: Breadcrumb+H1, Hero mit Overlay, Intro mit Eckdaten-Box, Feature-Grid (3-Spalten), FAQ-Accordion, Galerie, **Blaue Sektion mit Waves**, Einsatzgebiet, CTA
   - **Referenz für: FAQ-Buttons mit Chevron, Feature-Grids, Text-Layouts**

### Design-Muster aus diesen 3 Seiten (PFLICHT übernehmen):

| Muster | Wo zu sehen | CSS-Klassen |
|--------|-------------|-------------|
| Intro 2-Spalten (Text + Bild/Box) | Alle 3 Seiten | `max-w-6xl mx-auto px-4`, `grid grid-cols-1 lg:grid-cols-2 gap-10/12` |
| Eckdaten-Box | Tisch-Zauberer, Bühnen-Zauberer | `bg-gray-50 rounded-xl p-6`, `<dl>` mit `space-y-3 text-sm` |
| Feature-Grid | Alle 3 Seiten | `grid grid-cols-1 md:grid-cols-2/3/4 gap-4/6`, `bg-white rounded-xl p-6 shadow-sm` |
| Checkmark-Liste | Kindergeburtstag, Bühnen-Zauberer | `space-y-2/3`, `flex items-start gap-2`, `text-[#d7393e]` für ✓ |
| Blaue Sektion | Alle 3 Seiten | `bg-[#3b55d5] py-14 text-white`, Wave SVGs vor+nach, `text-blue-100` für Body |
| FAQ-Accordion | Kindergeburtstag, Bühnen-Zauberer | `bg-white border border-gray-200 rounded-lg`, `<button>` mit Chevron-SVG |
| Galerie-Grid | Tisch-Zauberer, Bühnen-Zauberer | `grid grid-cols-2 md:grid-cols-4/5 gap-4`, `rounded-xl shadow-sm h-48 object-cover` |
| CTA-Sektion (dunkel) | Tisch-Zauberer | `bg-[#1f2025] py-14 text-white text-center`, `text-gray-300` Body |
| Buchungs-Steps | Tisch-Zauberer | `grid grid-cols-1 sm:grid-cols-5 gap-4`, rote Kreise `w-12 h-12 rounded-full bg-[#d7393e]` |
| Einsatzgebiet | Kindergeburtstag, Tisch-Zauberer | `grid grid-cols-1 lg:grid-cols-2 gap-10`, Stadt-Links `text-[#d7393e] hover:underline text-sm` |

**JEDE Unterseite muss so aussehen, als wäre sie eine dieser 3 Menü-Seiten — nur mit anderem Inhalt.**

---

## DESIGN-SYSTEM (aus den Menü-Seiten)

### Erlaubte Farben — KEINE ANDEREN
```
Brand:     #d7393e (rot), #b62e32 (rot-dunkel)
Akzent:    #3b55d5 (blau), #2a3fa8 (blau-dunkel)
Gold:      #ffb546, #e69420
Text:      #1f2025 (primär), #374151 (body), #7c7c7c (light), #ffffff (weiß)
Hgrund:    #ffffff (weiß), #f9fafb (grau-hell), #f4f4f4 (grau)
```

### Hintergrundfarben-Regel
- **Standard = WEISS.** Mehrere weiße Sektionen hintereinander = völlig OK
- **Max 2 farbige Sektionen** pro Seite (rot oder blau — wie auf den Menü-Seiten)
- Jede farbige Sektion braucht **Curve/Wave oben UND unten** (SVG)

### Typografie
```
Font:      Poppins, Arial, Helvetica, sans-serif
Body:      17px, line-height 1.6, color #374151
H1:        35px, font-weight 800, color #1f2025
H2:        25px, font-weight 800, color #1f2025 (oder #d7393e für Akzent)
H3:        18px, font-weight 800
```

### Container & Abstände
```
Standard-Container: max-w-3xl (768px) mx-auto px-4
Weite Container:    max-w-5xl (1024px) oder max-w-6xl (1152px)
Section-Padding:    py-14 (Standard), py-10 (kompakt)
```

### Wave/Curve SVG (PFLICHT bei farbigen Sektionen)
```html
<!-- Wave OBEN: Weiß → Farbe (vor der farbigen Sektion) -->
<div style="overflow:hidden;line-height:0;">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style="display:block;width:100%;height:60px;">
    <path d="M0,0 Q720,60 1440,0 L1440,60 L0,60 Z" fill="#d7393e"/>
  </svg>
</div>

<!-- [FARBIGE SEKTION HIER] -->

<!-- Wave UNTEN: Farbe → Weiß (nach der farbigen Sektion) -->
<div style="overflow:hidden;line-height:0;background:#d7393e;">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style="display:block;width:100%;height:60px;">
    <path d="M0,0 Q720,60 1440,0 L1440,60 L0,60 Z" fill="white"/>
  </svg>
</div>
```

---

## PFLICHT-SEKTIONEN — SO MÜSSEN SIE AUSSEHEN

### 1. PREISLISTE (PFLICHT — exakt so wie im Referenzbild UND auf /kindergeburtstag/)

**Beschreibung des Referenzbilds:** Überschrift "Die Preise" zentriert in rot (#d7393e). Darunter 3 Karten nebeneinander. Jede Karte hat weißen Hintergrund, leichten Schatten, abgerundete Ecken (rounded-xl). Oben an jeder Karte ein farbiger 4px-Rand: Karte 1 = rot (#d7393e), Karte 2 = blau (#3b55d5), Karte 3 = gold (#ffb546). Inhalt pro Karte: Emoji + Titel fett, Preis farbig, Checkmark-Liste (✓). Unter den 3 Karten: Zentrierter roter CTA-Button "Jetzt unverbindlich anfragen".

**WICHTIG:** Kopiere das Preislisten-Markup **1:1 aus `src/pages/kindergeburtstag/index.astro`** (Zeilen 156-210). Das ist die perfekte Vorlage. Hier ist das exakte Markup von der Kindergeburtstag-Seite:

```html
<!-- PREISLISTE — 1:1 aus kindergeburtstag/index.astro übernommen -->
<section class="bg-white py-14">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-[#d7393e] font-bold text-3xl sm:text-4xl text-center mb-10">Die Preise</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Zaubershow -->
      <div class="bg-white rounded-xl p-8 shadow-sm border-t-4 border-[#d7393e]">
        <h3 class="font-bold text-[#1f2025] text-xl mb-2">🎩 Zaubershow</h3>
        <p class="text-[#d7393e] font-bold text-2xl mb-4">150 €</p>
        <ul class="space-y-2 text-[#374151] text-sm mb-6">
          <li class="flex items-start gap-2"><span class="text-[#d7393e]">✓</span> 40 Minuten voller Zauber, Lachen und Staunen</li>
          <li class="flex items-start gap-2"><span class="text-[#d7393e]">✓</span> Bis ca. 12 Kinder – Mindestalter: 4 Jahre</li>
          <li class="flex items-start gap-2"><span class="text-[#d7393e]">✓</span> Inkl. Material</li>
          <li class="flex items-start gap-2"><span class="text-[#d7393e]">✓</span> Das Geburtstagskind steht immer im Mittelpunkt</li>
          <li class="flex items-start gap-2"><span class="text-[#d7393e]">✓</span> zzgl. Fahrtkosten (0,4€/km) ab 45966 Gladbeck</li>
        </ul>
        <p class="text-[#374151] text-sm">Direkt ab der ersten Minute nimmt die Show die kleinen Gäste mit auf eine fantasievolle Reise!</p>
      </div>
      <!-- Ballonmodellage -->
      <div class="bg-white rounded-xl p-8 shadow-sm border-t-4 border-[#3b55d5]">
        <h3 class="font-bold text-[#1f2025] text-xl mb-2">🎈 Luftballonmodellage</h3>
        <p class="text-[#3b55d5] font-bold text-2xl mb-4">+ 20 €</p>
        <ul class="space-y-2 text-[#374151] text-sm mb-6">
          <li class="flex items-start gap-2"><span class="text-[#3b55d5]">✓</span> Für jedes Kind 1 Ballon</li>
          <li class="flex items-start gap-2"><span class="text-[#3b55d5]">✓</span> Ca. 15 Minuten</li>
          <li class="flex items-start gap-2"><span class="text-[#3b55d5]">✓</span> Tolle Erinnerung zum Mitnehmen</li>
          <li class="flex items-start gap-2"><span class="text-[#3b55d5]">✓</span> Große Auswahl an Figuren: Hund, Schwert, Blume u.v.m.</li>
          <li class="flex items-start gap-2"><span class="text-[#3b55d5]">✓</span> Perfekte Ergänzung zur Zaubershow</li>
        </ul>
        <p class="text-[#374151] text-sm">Ob Schwerter, Hunde oder Blumen – die Kinder staunen, wenn aus einem Ballon ihre Wunschfigur entsteht!</p>
      </div>
      <!-- Glitzer Tattoos -->
      <div class="bg-white rounded-xl p-8 shadow-sm border-t-4 border-[#ffb546]">
        <h3 class="font-bold text-[#1f2025] text-xl mb-2">✨ Glitzer-Tattoos</h3>
        <p class="text-[#d7393e] font-bold text-2xl mb-4">+ 40 €</p>
        <ul class="space-y-2 text-[#374151] text-sm mb-6">
          <li class="flex items-start gap-2"><span class="text-[#d7393e]">✓</span> Für jedes Kind 1 Tattoo</li>
          <li class="flex items-start gap-2"><span class="text-[#d7393e]">✓</span> Ca. 30 Minuten</li>
          <li class="flex items-start gap-2"><span class="text-[#d7393e]">✓</span> Hautverträglich &amp; langanhaltend</li>
          <li class="flex items-start gap-2"><span class="text-[#d7393e]">✓</span> Viele Motive: Einhörner, Schmetterlinge, Sterne u.v.m.</li>
          <li class="flex items-start gap-2"><span class="text-[#d7393e]">✓</span> Hält mehrere Tage auf der Haut</li>
        </ul>
        <p class="text-[#374151] text-sm">Ein funkelndes Highlight, das die Kinder noch Tage nach der Feier begeistert!</p>
      </div>
    </div>
    <!-- CTA -->
    <div class="text-center mt-10">
      <a href="/kontakt/" class="inline-block bg-[#d7393e] hover:bg-[#b62e32] text-white font-bold px-10 py-4 rounded transition-colors text-base">
        Jetzt unverbindlich anfragen
      </a>
    </div>
  </div>
</section>
```

### 2. STATISTIK-BANNER (PFLICHT — exakt so wie im Referenzbild — ÜBERALL GLEICH)

**ACHTUNG: Der Stats-Banner muss auf ALLEN Seiten identisch aussehen — auch auf Menü-Seiten!**
Wenn eine Menü-Seite (z.B. index.astro, kindergeburtstag/index.astro) einen Stats-Banner hat, der ANDERS aussieht als das Referenzbild, dann **ersetze ihn** durch diese Version. Der Stats-Banner ist ein GLOBALES Element mit einem festen Design.

**Beschreibung des Referenzbilds:** Roter Hintergrund (#d7393e), **BILDSCHIRMBREIT** (volle Viewport-Breite, kein Container), geschwungene Kanten (Wave/Curve) oben und unten. 3 Statistik-Karten **zentriert** nebeneinander mit halbtransparentem weißem Hintergrund (rgba(255,255,255,0.15)) und abgerundeten Ecken. Jede Karte: Emoji oben, große weiße Zahl (bold), Beschreibung darunter (weiß). Inhalt: "400 Shows im Jahr" | "110.000 Lachende Kinder" | "15 Jahre Erfahrung".

**Schlüssel-Eigenschaften:**
- **Volle Bildschirmbreite** — der rote Hintergrund geht von Rand zu Rand (100vw)
- **Zentrierte Karten** — die 3 Karten sind horizontal zentriert mit max-w-4xl
- **Wave/Curve** oben UND unten — geschwungener Übergang weiß↔rot
- **Identisch auf JEDER Seite** — Unterseiten UND Menü-Seiten

```html
<!-- STATISTIK-BANNER — GENAU SO BAUEN — BILDSCHIRMBREIT + ZENTRIERT -->
<!-- Wave oben (weiß → rot) -->
<div style="overflow:hidden;line-height:0;">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style="display:block;width:100%;height:60px;">
    <path d="M0,0 Q720,60 1440,0 L1440,60 L0,60 Z" fill="#d7393e"/>
  </svg>
</div>
<!-- Banner: VOLLE BREITE, Karten zentriert -->
<section class="w-full bg-[#d7393e] py-10 text-center">
  <div class="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="bg-white/15 rounded-xl p-6">
      <div class="text-3xl mb-2">🪄</div>
      <div class="text-4xl font-extrabold text-white">400</div>
      <div class="text-white text-sm mt-1">Shows im Jahr</div>
    </div>
    <div class="bg-white/15 rounded-xl p-6">
      <div class="text-3xl mb-2">😊</div>
      <div class="text-4xl font-extrabold text-white">110.000</div>
      <div class="text-white text-sm mt-1">Lachende Kinder</div>
    </div>
    <div class="bg-white/15 rounded-xl p-6">
      <div class="text-3xl mb-2">🪄</div>
      <div class="text-4xl font-extrabold text-white">15</div>
      <div class="text-white text-sm mt-1">Jahre Erfahrung</div>
    </div>
  </div>
</section>
<!-- Wave unten (rot → weiß) -->
<div style="overflow:hidden;line-height:0;background:#d7393e;">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style="display:block;width:100%;height:60px;">
    <path d="M0,0 Q720,60 1440,0 L1440,60 L0,60 Z" fill="white"/>
  </svg>
</div>
```

### STATS-BANNER AUCH AUF MENÜ-SEITEN ANPASSEN (Phase 0)
Bevor du die Unterseiten bearbeitest, prüfe und ersetze den Stats-Banner auf diesen Menü-Seiten:
- `src/pages/index.astro` (Home) — hat einen roten Stats-Bereich → durch obiges Template ersetzen
- `src/pages/kindergeburtstag/index.astro` — falls Stats vorhanden → ersetzen
- Alle anderen Menü-Seiten, die einen Stats-Banner haben → ersetzen
**Der Stats-Banner muss ÜBERALL identisch sein wie im Referenzbild.**

### 3. EINSATZGEBIET/EINZUGSGEBIET (PFLICHT — exakt so wie im Referenzbild)

**Beschreibung des Referenzbilds:** Weiße Sektion. Überschrift in rot (#d7393e), zentriert. 2-Spalten-Layout: Links Textblock mit Städteliste (fett: Haupteinsatzgebiet, darunter verlinkte Städte als farbige Inline-Links, darunter "Weitere NRW-Städte" als Fließtext). Rechts: Google Maps Screenshot/Bild mit abgerundeten Ecken und Marker auf Gladbeck.

```html
<!-- EINSATZGEBIET — GENAU SO BAUEN -->
<section class="py-14 bg-white">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-center text-[#d7393e] text-2xl font-extrabold mb-8">
      Regional und deutschlandweit
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <!-- Text-Spalte -->
      <div>
        <h3 class="font-bold text-lg mb-2">Haupteinsatzgebiet</h3>
        <p class="text-[#374151] mb-4">
          Gladbeck | Oberhausen | Gelsenkirchen | Essen | Duisburg | Bottrop | Bochum | ...
        </p>
        <h3 class="font-bold text-lg mb-2">In Ihrer Stadt</h3>
        <p class="mb-4">
          <a href="/kindergeburtstag/geburtstag-in-bochum/" class="text-[#3b55d5] hover:underline">Bochum</a> |
          <a href="/kindergeburtstag/geburtstag-in-bottrop/" class="text-[#3b55d5] hover:underline">Bottrop</a> |
          <!-- ... weitere Stadt-Links ... -->
        </p>
        <h3 class="font-bold text-lg mb-2">Weitere NRW-Städte</h3>
        <p class="text-[#374151]">
          Düsseldorf | Dortmund | Köln | Münster | ...
        </p>
      </div>
      <!-- Karte/Bild -->
      <div>
        <img src="https://liar-entertainer.com/wp-content/uploads/2023/08/clown-zauberer-gladbeck-karte.jpg"
             alt="Einsatzgebiet Karte"
             class="rounded-xl w-full max-w-md shadow-sm" />
      </div>
    </div>
  </div>
</section>
```

### 4. TEXT + BILD SEKTION (Standard-Baustein)
```html
<section class="py-14 bg-white">
  <div class="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div>
      <h2 class="text-[#1f2025] text-2xl font-extrabold mb-4">[ÜBERSCHRIFT]</h2>
      <p class="text-[#374151] text-[17px] leading-relaxed mb-4">[TEXT]</p>
    </div>
    <div>
      <img src="[BILD-URL]" alt="[ALT-TEXT]" class="rounded-xl w-full shadow-sm" />
    </div>
  </div>
</section>
```

### 5. FAQ-SEKTION
```html
<section class="py-14 bg-white">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-center text-2xl font-extrabold mb-8">Häufig gestellte Fragen</h2>
    <div class="space-y-4">
      <details class="bg-[#f9fafb] rounded-xl p-4 group">
        <summary class="font-bold cursor-pointer text-[#1f2025]">[FRAGE]</summary>
        <p class="mt-3 text-[#374151] text-[17px] leading-relaxed">[ANTWORT]</p>
      </details>
      <!-- weitere FAQ-Items -->
    </div>
  </div>
</section>
```

### 6. CTA-SEKTION (Kontakt-Aufforderung)
```html
<section class="py-14 bg-white">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h2 class="text-2xl font-extrabold mb-4">[ÜBERSCHRIFT]</h2>
    <p class="text-[#374151] text-[17px] mb-6">[TEXT]</p>
    <a href="/kontakt/" class="inline-block bg-[#d7393e] hover:bg-[#b62e32] text-white font-bold py-3 px-8 rounded-full transition-colors">
      Jetzt unverbindlich anfragen
    </a>
  </div>
</section>
```

---

## DER WORKFLOW — FÜR JEDE EINZELNE SEITE

### Technische Umsetzung: Eigene .astro-Dateien statt Catch-All

Anstatt alles durch `[...slug].astro` zu rendern, erstelle **eigene .astro Dateien** für jede Unterseite mit sauberem Markup.

**Beispiel:** Für `geburtstag-in-essen` erstelle `src/pages/kindergeburtstag/geburtstag-in-essen.astro`

So kannst du das Markup pro Seite individuell und sauber aufbauen, ohne dich mit dem kaputten WordPress-HTML herumzuschlagen.

**WICHTIG:** Übernimm dabei die SEO-Daten (Titel, Description, Keywords, Schema.org) aus den bestehenden Daten in `pages.json`. Das geht so:

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import pagesData from '../../data/pages.json';

// SEO-Daten aus der bestehenden Datenbasis holen
const pageData = pagesData.find(p => p.slug === 'geburtstag-in-essen');
const seoTitle = pageData?.meta?.rank_math_title || 'Geburtstag in Essen';
const seoDesc = pageData?.meta?.rank_math_description || '';
// ... etc.
---
<BaseLayout title={seoTitle} description={seoDesc} ...>
  <!-- Hero (behalten wie bisher) -->
  <!-- HIER: Saubere Sektionen wie oben beschrieben -->
</BaseLayout>
```

### SCHRITT-FÜR-SCHRITT PRO SEITE:

```
SCHRITT 1 — ORIGINAL-SEITE ANALYSIEREN
├── Öffne https://www.liar-entertainer.com/[slug]/ im Browser
├── Mache Screenshot
├── Erfasse ALLE Sektionen in der Reihenfolge wie sie erscheinen:
│   ├── Welche Sektionen gibt es? (Text+Bild, Preisliste, Stats, FAQ, CTA, etc.)
│   ├── Welche Texte stehen in jeder Sektion? (Überschriften, Absätze, Listen)
│   ├── Welche Bilder werden verwendet? (URLs notieren!)
│   └── Welche Städte-Links gibt es im Einzugsgebiet?
└── Erstelle eine Sektionsliste: "Sektion 1: Intro-Text + Bild, Sektion 2: Preisliste, ..."

SCHRITT 2 — NEUE .ASTRO DATEI ERSTELLEN
├── Erstelle die Datei unter dem korrekten Pfad:
│   ├── geburtstag-in-* → src/pages/kindergeburtstag/[slug].astro
│   ├── kinderzauberer-in-* → src/pages/kinderzauberer/[slug].astro
│   └── clown-in-* → src/pages/clown/clownshow/[slug].astro
├── SEO-Daten aus pages.json importieren und an BaseLayout übergeben
├── Hero-Sektion + Breadcrumb vom bestehenden [...slug].astro übernehmen
└── Den Content-Bereich NEU aufbauen mit sauberen Sektionen

SCHRITT 3 — SEKTIONEN NEU AUFBAUEN
├── Für JEDE Sektion aus der Sektionsliste (Schritt 1):
│   ├── Verwende die passende Vorlage (siehe PFLICHT-SEKTIONEN oben)
│   ├── Fülle die Texte ein (EXAKT von der Original-Website, kein Wort ändern!)
│   ├── Fülle die Bild-URLs ein (von der Original-Website)
│   └── Verwende die Tailwind-Klassen wie auf den Menü-Seiten
├── PREISLISTE → IMMER das 3-Karten-Layout wie im Referenzbild
├── STATISTIK-BANNER → IMMER rot mit Waves wie im Referenzbild
├── EINSATZGEBIET → IMMER 2-Spalten (Text + Karte) wie im Referenzbild
├── FAQ → Accordion mit details/summary
└── CTA → Zentriert mit rotem Button

SCHRITT 4 — SCREENSHOT + KONTROLLE
├── Dev-Server muss laufen (npm run dev)
├── Öffne http://localhost:4321/[slug]/ im Browser
├── Mache Screenshot
├── PRÜFE (JEDER Punkt muss ✓ sein):
│   ├── Sektionsstruktur wie auf der Original-Website? ✓/✗
│   ├── Design sieht aus wie die Menü-Seiten? ✓/✗
│   ├── Preisliste hat 3 Karten mit farbigem Top-Border? ✓/✗
│   ├── Stats-Banner ist rot mit Waves oben+unten? ✓/✗
│   ├── Einsatzgebiet ist 2-Spalten mit Karte rechts? ✓/✗
│   ├── Keine roten/farbigen Linien die nicht sein sollten? ✓/✗
│   ├── Max 2 farbige Sektionen (mit Curves)? ✓/✗
│   ├── Bilder in Containern (nicht 100vw)? ✓/✗
│   ├── Abstände wie auf Menü-Seiten? ✓/✗
│   └── Kein Text geändert gegenüber Original? ✓/✗
└── Falls EIN Punkt ✗ → FIX und nochmal Screenshot

SCHRITT 5 — ZWEITER SCREENSHOT (PFLICHT)
├── Seite NOCHMAL im Browser öffnen (ggf. Hard-Refresh)
├── NOCHMAL Screenshot machen
├── NOCHMAL alle Punkte prüfen
└── Erst wenn ALLES ✓ → weiter zur nächsten Seite
```

---

## UNANTASTBARE REGELN

### REGEL 1: TEXTE VON DER ORIGINAL-WEBSITE ÜBERNEHMEN — NICHT ÄNDERN
- Die Texte auf www.liar-entertainer.com/[slug]/ sind die Quelle
- Übernimm sie **WORT FÜR WORT** in die neue .astro Datei
- Ändere KEIN Wort, keine Überschrift, keinen Link-Text
- Einzige Ausnahme: Wenn der Text offensichtlich kaputt ist (z.B. HTML-Entities), dann minimal bereinigen

### REGEL 2: PREISLISTE, STATS-BANNER, EINSATZGEBIET — WIE DIE REFERENZBILDER
- Diese drei Sektionstypen haben ein **FESTES Design** (siehe PFLICHT-SEKTIONEN oben)
- Weiche NICHT davon ab — jede Preisliste hat 3 Karten, jeder Stats-Banner ist rot mit Waves, etc.
- Der Inhalt (Texte, Zahlen) kommt von der Original-Website, das Design ist IMMER gleich

### REGEL 3: NUR ERLAUBTE FARBEN
- Keine Farben die nicht in der Farbtabelle oben stehen
- Keine roten Linien, keine blauen Hintergründe wo sie nicht hingehören
- Standard = weiß. Im Zweifel → weiß.

### REGEL 4: MAX 2 FARBIGE SEKTIONEN PRO SEITE
- In der Regel: 1x Stats-Banner (rot) + Rest weiß
- Oder: 1x Stats-Banner (rot) + 1x CTA/Feature (blau) + Rest weiß
- JEDE farbige Sektion braucht Waves oben und unten

---

## REIHENFOLGE DER BEARBEITUNG

### Phase 0: Vorbereitung (einmalig, VOR allem anderen)
1. Dev-Server starten: `cd "Homepage Neu" && npm run dev`
2. **Die 3 primären Design-Referenzseiten lesen:**
   - `src/pages/kindergeburtstag/index.astro` — KOMPLETT lesen und verstehen
   - `src/pages/zauberer/tisch-zauberer/index.astro` — KOMPLETT lesen und verstehen
   - `src/pages/zauberer/buehnen-zauberer/index.astro` — KOMPLETT lesen und verstehen
3. Jede dieser 3 Seiten im Browser öffnen (localhost:4321) und Screenshots machen
4. **Stats-Banner auf ALLEN Menü-Seiten vereinheitlichen:**
   - Öffne `src/pages/index.astro` → Finde den Stats-Bereich → Ersetze durch das PFLICHT-Template (bildschirmbreit, rot, zentriert, 3 Karten mit Waves)
   - Prüfe alle anderen Menü-Seiten auf Stats-Banner → gleich ersetzen
   - Screenshot machen und prüfen: Sieht der Stats-Banner jetzt aus wie im Referenzbild?
5. Verstehen wie Hero, Breadcrumb, und BaseLayout funktionieren
6. Die SEO-Daten-Struktur in pages.json verstehen

### Phase 1: City-Pages neu aufbauen (eine nach der anderen)
**Reihenfolge:**
1. Erst die `geburtstag-in-*` Seiten (ca. 20+)
2. Dann die `kinderzauberer-in-*` Seiten (ca. 20+)
3. Dann die `clown-in-*` Seiten (ca. 20+)

**Pro Seite:** Schritt 1-5 wie oben beschrieben. KEINE Seite überspringen.

### Phase 2: Catch-All anpassen
- `[...slug].astro` so anpassen, dass die neu erstellten Seiten NICHT mehr durch den Catch-All gerendert werden
- Die neuen .astro Dateien haben Vorrang (Astro priorisiert spezifische Routen über Catch-All)

### Phase 3: Blog-Posts und sonstige Seiten
- Blog-Posts: Ähnlich wie City-Pages, aber einfacher (meist nur Text + Bilder)
- Sonstige (Impressum, Datenschutz etc.): Meist nur CSS-Fixes nötig

---

## KOMMUNIKATION
- Zeige mir den **Screenshot** nach jedem Seitenaufbau
- Melde nach jeder **5. Seite** einen Zwischenstand
- Wenn eine Seite auf dem Original **keine** Preisliste/Stats/Einsatzgebiet hat → diese Sektionen weglassen
- Wenn Bilder auf der Original-Website nicht laden → melde es, verwende ein Fallback-Bild
- Wenn du unsicher bist wie eine Sektion aussehen soll → öffne eine Menü-Seite und vergleiche

---

## QUICK-REFERENZ: Sektionstyp → Template

| Sektion auf der Original-Seite | Verwende Template |
|---|---|
| Intro-Text (mit oder ohne Bild) | Text+Bild Sektion (2-Spalten) |
| Preisliste / Kosten / Pakete | PREISLISTE (3 Karten, PFLICHT-Design) |
| Statistik-Zahlen (400 Shows, 110.000 Kinder, 15 Jahre) | STATISTIK-BANNER (rot + Waves, PFLICHT-Design) |
| Einzugsgebiet / Einsatzgebiet / Städteliste | EINSATZGEBIET (2-Spalten + Karte, PFLICHT-Design) |
| FAQ / Häufige Fragen | FAQ-Sektion (Accordion) |
| Kontakt / CTA / "Jetzt buchen" | CTA-Sektion (zentriert + Button) |
| Video | Video-Sektion (zentrierter iframe, max-w-3xl) |
| Bewertungen / Reviews | GoogleReviews-Komponente einbinden |
| Vorteile / Warum / Features | Feature-Grid (2-3 Spalten, Icons, weißer Hintergrund) |
| Galerie / Bildergalerie | Bild-Grid (2-3 Spalten, rounded-xl) |
