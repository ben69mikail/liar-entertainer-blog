const fs = require('fs');
const path = require('path');

const cityPages = [
  'geburtstag-in-duesseldorf', 'geburtstag-in-castrop-rauxel', 'geburtstag-in-haltern-am-see',
  'geburtstag-in-moers', 'geburtstag-in-wesel', 'geburtstag-in-waltrop',
  'geburtstag-in-xanten', 'geburtstag-in-datteln', 'geburtstag-in-gelsenkirchen',
  'geburtstag-in-oberhausen', 'geburtstag-in-duisburg', 'geburtstag-in-recklinghausen',
  'geburtstag-in-bottrop', 'geburtstag-in-herne', 'geburtstag-in-marl',
  'geburtstag-in-bochum', 'geburtstag-in-dortmund', 'geburtstag-in-muelheim',
  'geburtstag-in-herten', 'geburtstag-in-dinslaken', 'geburtstag-in-dorsten',
  'geburtstag-in-gladbeck', 'geburtstag-in-essen'
];

const issues = [];

cityPages.forEach(slug => {
  const filePath = path.join('dist/kindergeburtstag', slug, 'index.html');
  if (!fs.existsSync(filePath)) { console.log(slug + ': FILE NOT FOUND'); return; }
  const html = fs.readFileSync(filePath, 'utf8');

  const priceCards = (html.match(/class="price-card"/g) || []).length;
  const faqCards = (html.match(/class="faq-card"/g) || []).length;
  const statsGrid = /stats-grid/.test(html);
  const darkBlue = (html.match(/dark-blue/g) || []).length;
  const darkRed = (html.match(/dark-red/g) || []).length;
  const hasDarkBg = (html.match(/has-dark-bg/g) || []).length;
  const imgs = (html.match(/<img[^>]*>/g) || []).length;
  const hasPreise = /Preis/i.test(html);
  const hasFAQ = /faq|häufig|fragen/i.test(html);
  const hasKontaktBtn = /KONTAKTFORMULAR/i.test(html);
  const hasUnderscores = /<p[^>]*>\s*_{3,}\s*<\/p>/.test(html);
  const hasDoubleStars = /\*\*[^*]+\*\*/.test(html);
  const hasEmojiPrices = /[🎭🚗✨💎🎈]/.test(html);
  const hasPriceGrid = /price-grid/.test(html);

  // Check for raw FAQ patterns not yet converted
  const rawFaqEmoji = (html.match(/❓/g) || []).length;
  const rawFaqQuotes = (html.match(/„[^"]*\?"/g) || []).length;

  // Check for details/summary (accordion FAQ)
  const detailsCount = (html.match(/<details/g) || []).length;

  // Check for small inline-style images
  const smallImgs = [...html.matchAll(/style="[^"]*width:\s*(\d+)px/g)].filter(m => parseInt(m[1]) < 400);

  const pageIssues = [];
  if (hasKontaktBtn) pageIssues.push('KONTAKTFORMULAR-Button');
  if (hasUnderscores) pageIssues.push('Underscores ___');
  if (hasDoubleStars) pageIssues.push('Raw **bold** markers');
  if (rawFaqEmoji > 0 && faqCards === 0) pageIssues.push('Unconverted emoji FAQ (' + rawFaqEmoji + 'x)');
  if (hasPreise && priceCards === 0 && !hasPriceGrid) pageIssues.push('Preise without price-cards');
  if (smallImgs.length > 0) pageIssues.push('Small inline imgs (' + smallImgs.length + ')');

  console.log(`\n=== ${slug} ===`);
  console.log(`  PriceCards: ${priceCards} | FaqCards: ${faqCards} | Details: ${detailsCount} | StatsGrid: ${statsGrid}`);
  console.log(`  DarkBlue: ${darkBlue} | DarkRed: ${darkRed} | HasDarkBg: ${hasDarkBg}`);
  console.log(`  Imgs: ${imgs} | HasPreise: ${hasPreise} | PriceGrid: ${hasPriceGrid}`);
  console.log(`  KontaktBtn: ${hasKontaktBtn} | Underscores: ${hasUnderscores} | DoubleStars: ${hasDoubleStars}`);
  if (pageIssues.length > 0) {
    console.log(`  ⚠️ ISSUES: ${pageIssues.join(', ')}`);
    issues.push({ slug, issues: pageIssues });
  } else {
    console.log(`  ✅ OK`);
  }
});

console.log('\n\n========= SUMMARY =========');
console.log(`Total pages: ${cityPages.length}`);
console.log(`Pages with issues: ${issues.length}`);
issues.forEach(i => {
  console.log(`  ${i.slug}: ${i.issues.join(', ')}`);
});
