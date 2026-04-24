import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

// ─── CONFIGURATION ───────────────────────────────────────────────────────────

const BASE = 'src/pages';

// Which cities exist for each category (based on actual directory listing)
const geburtstagCities = [
  'bochum', 'bottrop', 'castrop-rauxel', 'datteln', 'dinslaken', 'dorsten',
  'dortmund', 'duesseldorf', 'duisburg', 'essen', 'gelsenkirchen', 'gladbeck',
  'haltern-am-see', 'herne', 'herten', 'marl', 'moers', 'muelheim',
  'oberhausen', 'recklinghausen', 'waltrop', 'wesel', 'xanten'
];

const kinderzaubererCities = [
  'bochum', 'bottrop', 'datteln', 'dinslaken', 'dorsten', 'dortmund',
  'duesseldorf', 'duisburg', 'essen', 'gelsenkirchen', 'haltern', 'herne',
  'herten', 'marl', 'moers', 'muelheim', 'oberhausen', 'recklinghausen'
];

const clownCities = [
  'bochum', 'bottrop', 'datteln', 'dinslaken', 'dorsten', 'dortmund',
  'duesseldorf', 'duisburg', 'essen', 'gelsenkirchen', 'gladbeck', 'haltern',
  'herne', 'herten', 'marl', 'muelheim', 'oberhausen', 'recklinghausen'
];

// Display names for cities (slug -> display)
const displayNames = {
  'bochum': 'Bochum',
  'bottrop': 'Bottrop',
  'castrop-rauxel': 'Castrop-Rauxel',
  'datteln': 'Datteln',
  'dinslaken': 'Dinslaken',
  'dorsten': 'Dorsten',
  'dortmund': 'Dortmund',
  'duesseldorf': 'Düsseldorf',
  'duisburg': 'Duisburg',
  'essen': 'Essen',
  'gelsenkirchen': 'Gelsenkirchen',
  'gladbeck': 'Gladbeck',
  'haltern-am-see': 'Haltern am See',
  'haltern': 'Haltern',
  'herne': 'Herne',
  'herten': 'Herten',
  'marl': 'Marl',
  'moers': 'Moers',
  'muelheim': 'Mülheim',
  'oberhausen': 'Oberhausen',
  'recklinghausen': 'Recklinghausen',
  'waltrop': 'Waltrop',
  'wesel': 'Wesel',
  'xanten': 'Xanten',
};

// Cross-link availability: which categories exist for each "canonical" city
// canonical city key -> { geburtstag: slug, kinderzauberer: slug, clown: slug }
const cityCategories = {
  'bochum':          { geburtstag: 'bochum', kinderzauberer: 'bochum', clown: 'bochum' },
  'bottrop':         { geburtstag: 'bottrop', kinderzauberer: 'bottrop', clown: 'bottrop' },
  'datteln':         { geburtstag: 'datteln', kinderzauberer: 'datteln', clown: 'datteln' },
  'dinslaken':       { geburtstag: 'dinslaken', kinderzauberer: 'dinslaken', clown: 'dinslaken' },
  'dorsten':         { geburtstag: 'dorsten', kinderzauberer: 'dorsten', clown: 'dorsten' },
  'dortmund':        { geburtstag: 'dortmund', kinderzauberer: 'dortmund', clown: 'dortmund' },
  'duesseldorf':     { geburtstag: 'duesseldorf', kinderzauberer: 'duesseldorf', clown: 'duesseldorf' },
  'duisburg':        { geburtstag: 'duisburg', kinderzauberer: 'duisburg', clown: 'duisburg' },
  'essen':           { geburtstag: 'essen', kinderzauberer: 'essen', clown: 'essen' },
  'gelsenkirchen':   { geburtstag: 'gelsenkirchen', kinderzauberer: 'gelsenkirchen', clown: 'gelsenkirchen' },
  'gladbeck':        { geburtstag: 'gladbeck', kinderzauberer: null, clown: 'gladbeck' },
  'haltern':         { geburtstag: 'haltern-am-see', kinderzauberer: 'haltern', clown: 'haltern' },
  'herne':           { geburtstag: 'herne', kinderzauberer: 'herne', clown: 'herne' },
  'herten':          { geburtstag: 'herten', kinderzauberer: 'herten', clown: 'herten' },
  'marl':            { geburtstag: 'marl', kinderzauberer: 'marl', clown: 'marl' },
  'muelheim':        { geburtstag: 'muelheim', kinderzauberer: 'muelheim', clown: 'muelheim' },
  'oberhausen':      { geburtstag: 'oberhausen', kinderzauberer: 'oberhausen', clown: 'oberhausen' },
  'recklinghausen':  { geburtstag: 'recklinghausen', kinderzauberer: 'recklinghausen', clown: 'recklinghausen' },
  'moers':           { geburtstag: 'moers', kinderzauberer: 'moers', clown: null },
  'castrop-rauxel':  { geburtstag: 'castrop-rauxel', kinderzauberer: null, clown: null },
  'waltrop':         { geburtstag: 'waltrop', kinderzauberer: null, clown: null },
  'wesel':           { geburtstag: 'wesel', kinderzauberer: null, clown: null },
  'xanten':          { geburtstag: 'xanten', kinderzauberer: null, clown: null },
};

// Map a category-specific slug to its canonical city key
function toCanonical(slug) {
  if (slug === 'haltern-am-see') return 'haltern';
  return slug;
}

// ─── TASK 1: Build "in der Nähe" city links HTML ──────────────────────────────

function buildNearbyLinksHtml(category, currentSlug) {
  // category is 'geburtstag', 'kinderzauberer', or 'clown'
  let cityList;
  let heading;
  let linkPrefix;
  let slugPrefix;

  if (category === 'geburtstag') {
    cityList = geburtstagCities;
    heading = 'Kindergeburtstag in der Nähe';
    linkPrefix = '/kindergeburtstag/geburtstag-in-';
    slugPrefix = 'geburtstag-in-';
  } else if (category === 'kinderzauberer') {
    cityList = kinderzaubererCities;
    heading = 'Kinderzauberer in der Nähe';
    linkPrefix = '/kinderzauberer/kinderzauberer-in-';
    slugPrefix = 'kinderzauberer-in-';
  } else {
    cityList = clownCities;
    heading = 'Clown in der Nähe';
    linkPrefix = '/clown/clownshow/clown-in-';
    slugPrefix = 'clown-in-';
  }

  // Filter out self
  const otherCities = cityList.filter(slug => slug !== currentSlug);

  const linkParts = [];
  for (let i = 0; i < otherCities.length; i++) {
    const slug = otherCities[i];
    const display = displayNames[slug] || slug;
    linkParts.push(`              <a href="${linkPrefix}${slug}/" class="text-[#3b55d5] hover:underline text-sm">${display}</a>`);
    if (i < otherCities.length - 1) {
      linkParts.push(`              <span class="text-gray-300">|</span>`);
    }
  }

  return `          <div class="mt-6">
            <h3 class="font-bold text-[#1f2025] mb-2 text-sm">${heading}</h3>
            <div class="flex flex-wrap gap-2">
${linkParts.join('\n')}
            </div>
          </div>`;
}

// ─── TASK 2: Build Cross-Linking section HTML ────────────────────────────────

function buildCrossLinksHtml(category, currentSlug) {
  const canonical = toCanonical(currentSlug);
  const cityInfo = cityCategories[canonical];
  if (!cityInfo) {
    console.log(`  WARNING: No city category info for canonical="${canonical}" (slug="${currentSlug}")`);
    return null;
  }

  const display = displayNames[currentSlug] || displayNames[canonical] || currentSlug;

  const links = [];

  if (category !== 'geburtstag' && cityInfo.geburtstag) {
    links.push(`      <a href="/kindergeburtstag/geburtstag-in-${cityInfo.geburtstag}/" class="bg-white rounded-lg px-5 py-3 shadow-sm text-[#3b55d5] hover:underline font-medium text-sm">🎉 Kindergeburtstag in ${display}</a>`);
  }
  if (category !== 'kinderzauberer' && cityInfo.kinderzauberer) {
    links.push(`      <a href="/kinderzauberer/kinderzauberer-in-${cityInfo.kinderzauberer}/" class="bg-white rounded-lg px-5 py-3 shadow-sm text-[#3b55d5] hover:underline font-medium text-sm">🎩 Kinderzauberer in ${display}</a>`);
  }
  if (category !== 'clown' && cityInfo.clown) {
    links.push(`      <a href="/clown/clownshow/clown-in-${cityInfo.clown}/" class="bg-white rounded-lg px-5 py-3 shadow-sm text-[#d7393e] hover:underline font-medium text-sm">🤡 Clown in ${display}</a>`);
  }

  if (links.length === 0) return null;

  return `<!-- Cross-Linking: Weitere Services in ${display} -->
<section class="py-10 bg-[#f9fafb]">
  <div class="max-w-3xl mx-auto px-4 text-center">
    <h2 class="text-[#1f2025] font-bold text-xl mb-4">LIAR in ${display} buchen</h2>
    <div class="flex flex-wrap justify-center gap-4">
${links.join('\n')}
    </div>
  </div>
</section>`;
}

// ─── FIND THE TEXT COLUMN CLOSING </div> IN EINSATZGEBIET ───────────────────

/**
 * Find the Einsatzgebiet section and insert nearby links before the text column's closing </div>.
 *
 * Structure is always:
 *   <!-- Einsatzgebiet -->
 *   <section ...>
 *     <div ...>           (container)
 *       <h2 ...>          (heading)
 *       <div class="grid ...">  (2-column grid)
 *         <div>            (TEXT COLUMN - first child)
 *           ... paragraphs ...
 *         </div>           <-- INSERT BEFORE THIS
 *         <div>            (IMAGE COLUMN)
 *           ...
 *         </div>
 *       </div>
 *     </div>
 *   </section>
 *
 * Strategy: Find "<!-- Einsatzgebiet -->", then find the grid div,
 * then find the closing </div> of the first child (text column).
 * We use a bracket-counting approach from the start of the grid.
 */
function insertNearbyLinks(content, nearbyHtml) {
  // Match various Einsatzgebiet comment formats:
  // <!-- Einsatzgebiet -->
  // <!-- Einsatzgebiet: Duisburg von Rheinhausen bis Walsum -->
  // <!-- Einsatzgebiet: 2-Spalten + Karte -->
  const markerRegex = /<!-- Einsatzgebiet[^>]*-->/;
  const markerMatch = content.match(markerRegex);
  if (!markerMatch) {
    return { content, changed: false, reason: 'no Einsatzgebiet comment found' };
  }
  const markerIdx = content.indexOf(markerMatch[0]);

  // Check if nearby links already exist
  if (content.indexOf('in der Nähe</h3>') !== -1) {
    return { content, changed: false, reason: 'nearby links already present' };
  }

  // Find the grid div after the marker
  const afterMarker = content.substring(markerIdx);
  const gridMatch = afterMarker.match(/(<div\s+class="grid\s+grid-cols-1\s+lg:grid-cols-2[^"]*"[^>]*>)/);
  if (!gridMatch) {
    return { content, changed: false, reason: 'no grid div found in Einsatzgebiet' };
  }

  const gridStartInAfterMarker = afterMarker.indexOf(gridMatch[0]);
  const gridStartAbsolute = markerIdx + gridStartInAfterMarker + gridMatch[0].length;

  // Now we need to find the first <div> child (text column) and its closing </div>
  // Starting from after the grid opening tag, find the first <div>
  const afterGrid = content.substring(gridStartAbsolute);
  const firstDivMatch = afterGrid.match(/\n(\s*)<div>/);
  if (!firstDivMatch) {
    return { content, changed: false, reason: 'no text column <div> found' };
  }

  const textColStart = gridStartAbsolute + afterGrid.indexOf(firstDivMatch[0]) + firstDivMatch[0].length;

  // Now count nested divs to find the matching </div>
  const afterTextColStart = content.substring(textColStart);
  let depth = 1; // We're inside the text column div
  let pos = 0;
  while (depth > 0 && pos < afterTextColStart.length) {
    const nextOpen = afterTextColStart.indexOf('<div', pos);
    const nextClose = afterTextColStart.indexOf('</div>', pos);

    if (nextClose === -1) break; // shouldn't happen

    if (nextOpen !== -1 && nextOpen < nextClose) {
      // Check it's actually a tag opening (not e.g. inside an attribute)
      depth++;
      pos = nextOpen + 4;
    } else {
      depth--;
      if (depth === 0) {
        // This is the closing </div> of the text column
        const insertPos = textColStart + nextClose;
        const before = content.substring(0, insertPos);
        const after = content.substring(insertPos);
        const newContent = before + '\n' + nearbyHtml + '\n        ' + after;
        return { content: newContent, changed: true, reason: 'inserted nearby links' };
      }
      pos = nextClose + 6;
    }
  }

  return { content, changed: false, reason: 'could not find text column closing </div>' };
}

// ─── INSERT CROSS-LINKS BEFORE </BaseLayout> ────────────────────────────────

function insertCrossLinks(content, crossHtml) {
  if (!crossHtml) return { content, changed: false, reason: 'no cross-links needed' };

  if (content.indexOf('Cross-Link') !== -1) {
    return { content, changed: false, reason: 'cross-links already present' };
  }

  const baseLayoutClose = '</BaseLayout>';
  const idx = content.lastIndexOf(baseLayoutClose);
  if (idx === -1) {
    return { content, changed: false, reason: 'no </BaseLayout> found' };
  }

  const before = content.substring(0, idx);
  const after = content.substring(idx);
  const newContent = before + '\n' + crossHtml + '\n\n' + after;
  return { content: newContent, changed: true, reason: 'inserted cross-links' };
}

// ─── PROCESS ALL FILES ───────────────────────────────────────────────────────

function getFiles(dir, prefix) {
  const entries = [];
  if (!existsSync(dir)) {
    console.log(`Directory not found: ${dir}`);
    return entries;
  }
  const items = readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory() && item.name.startsWith(prefix)) {
      const filePath = join(dir, item.name, 'index.astro');
      if (existsSync(filePath)) {
        const slug = item.name.replace(prefix, '');
        entries.push({ filePath, slug, dirName: item.name });
      }
    }
  }
  return entries;
}

function processFile(filePath, category, slug) {
  let content = readFileSync(filePath, 'utf-8');
  let modified = false;
  const changes = [];

  // TASK 1: Add nearby city links in Einsatzgebiet
  const nearbyHtml = buildNearbyLinksHtml(category, slug);
  const task1 = insertNearbyLinks(content, nearbyHtml);
  content = task1.content;
  if (task1.changed) {
    modified = true;
    changes.push(`TASK 1: ${task1.reason}`);
  } else {
    changes.push(`TASK 1 skipped: ${task1.reason}`);
  }

  // TASK 2: Add cross-links before </BaseLayout>
  const crossHtml = buildCrossLinksHtml(category, slug);
  const task2 = insertCrossLinks(content, crossHtml);
  content = task2.content;
  if (task2.changed) {
    modified = true;
    changes.push(`TASK 2: ${task2.reason}`);
  } else {
    changes.push(`TASK 2 skipped: ${task2.reason}`);
  }

  if (modified) {
    writeFileSync(filePath, content, 'utf-8');
  }

  return { modified, changes };
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

console.log('=== fix-city-links.mjs ===\n');

const categories = [
  {
    name: 'geburtstag',
    dir: join(BASE, 'kindergeburtstag'),
    prefix: 'geburtstag-in-',
  },
  {
    name: 'kinderzauberer',
    dir: join(BASE, 'kinderzauberer'),
    prefix: 'kinderzauberer-in-',
  },
  {
    name: 'clown',
    dir: join(BASE, 'clown', 'clownshow'),
    prefix: 'clown-in-',
  },
];

let totalModified = 0;
let totalProcessed = 0;

for (const cat of categories) {
  console.log(`\n--- Processing: ${cat.name} (${cat.dir}) ---`);
  const files = getFiles(cat.dir, cat.prefix);
  console.log(`Found ${files.length} files`);

  for (const { filePath, slug } of files) {
    totalProcessed++;
    const { modified, changes } = processFile(filePath, cat.name, slug);
    const status = modified ? 'MODIFIED' : 'unchanged';
    console.log(`  [${status}] ${slug}`);
    for (const c of changes) {
      console.log(`    - ${c}`);
    }
    if (modified) totalModified++;
  }
}

console.log(`\n=== DONE: ${totalModified}/${totalProcessed} files modified ===`);
