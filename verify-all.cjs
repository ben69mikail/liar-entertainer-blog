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
const results = [];

cityPages.forEach(slug => {
  const filePath = path.join('dist/kindergeburtstag', slug, 'index.html');
  if (!fs.existsSync(filePath)) { console.log(slug + ': FILE NOT FOUND'); return; }
  const html = fs.readFileSync(filePath, 'utf8');

  const priceCards = (html.match(/class="price-card"/g) || []).length;
  const faqCards = (html.match(/class="faq-card"/g) || []).length;
  const detailsFaq = (html.match(/city-faq-item/g) || []).length;
  const darkBlue = (html.match(/dark-blue/g) || []).length;
  const darkRed = (html.match(/dark-red/g) || []).length;
  const imgs = (html.match(/<img[^>]*>/g) || []).length;
  const hasDoubleStars = /\*\*[^*]+\*\*/.test(html);
  const hasKontaktBtn = /KONTAKTFORMULAR/i.test(html);
  const hasUnderscores = /<p[^>]*>\s*_{3,}\s*<\/p>/.test(html);

  // Check for remaining small inline-style images
  const smallInlineImgs = [...html.matchAll(/style="[^"]*width:\s*(\d+)px/g)].filter(m => parseInt(m[1]) < 400);

  // Check for price-grid
  const hasPriceGrid = /price-grid/.test(html);
  const hasPreise = /Preis/i.test(html);

  const pageIssues = [];
  if (hasDoubleStars) pageIssues.push('Raw **bold** markers still present');
  if (hasKontaktBtn) pageIssues.push('KONTAKTFORMULAR button');
  if (hasUnderscores) pageIssues.push('Underscores ___');
  if (smallInlineImgs.length > 0) pageIssues.push('Small inline imgs (' + smallInlineImgs.length + ')');
  if (hasPreise && priceCards === 0 && !hasPriceGrid && slug !== 'geburtstag-in-haltern-am-see') {
    pageIssues.push('Preise without price-cards');
  }

  const result = {
    slug,
    priceCards,
    faqCards,
    detailsFaq,
    darkBlue,
    darkRed,
    imgs,
    issues: pageIssues
  };
  results.push(result);

  console.log(`${slug}: PC=${priceCards} FC=${faqCards} DF=${detailsFaq} DB=${darkBlue} DR=${darkRed} I=${imgs} ${pageIssues.length > 0 ? '⚠️ ' + pageIssues.join(', ') : '✅'}`);

  if (pageIssues.length > 0) issues.push({ slug, issues: pageIssues });
});

console.log('\n========= SUMMARY =========');
console.log('Total pages:', cityPages.length);
console.log('Pages OK:', cityPages.length - issues.length);
console.log('Pages with issues:', issues.length);
if (issues.length > 0) {
  issues.forEach(i => console.log('  ⚠️', i.slug + ':', i.issues.join(', ')));
}

// Stats
const totalPC = results.reduce((s, r) => s + r.priceCards, 0);
const totalFC = results.reduce((s, r) => s + r.faqCards, 0);
const totalDF = results.reduce((s, r) => s + r.detailsFaq, 0);
console.log('\nTotals: PriceCards=' + totalPC + ' FaqCards=' + totalFC + ' DetailsFAQ=' + totalDF);
