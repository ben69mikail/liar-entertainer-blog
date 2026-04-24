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

console.log('=== FINAL COMPREHENSIVE CHECK ===\n');

let allGood = true;
const summary = { total: 0, ok: 0, issues: [] };

cityPages.forEach(slug => {
  const filePath = path.join('dist/kindergeburtstag', slug, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  summary.total++;

  const checks = [];

  // 1. Hero section exists
  const hasHero = /class="relative py-20 overflow-hidden"/.test(html);
  if (!hasHero) checks.push('MISSING hero section');

  // 2. Breadcrumb exists
  const hasBreadcrumb = /Kindergeburtstag.*Geburtstag in/.test(html);
  if (!hasBreadcrumb) checks.push('MISSING breadcrumb');

  // 3. Google Reviews
  const hasReviews = /AUSGEZEICHNET/.test(html);
  if (!hasReviews) checks.push('MISSING Google Reviews');

  // 4. CTA box at bottom
  const hasCTA = /Clown Zauberer buchen/.test(html);
  if (!hasCTA) checks.push('MISSING CTA box');

  // 5. No raw ** markers
  const rawStars = /\*\*[^*]+\*\*/.test(html);
  if (rawStars) checks.push('RAW ** markers');

  // 6. No KONTAKTFORMULAR button
  const kontaktBtn = /KONTAKTFORMULAR/.test(html);
  if (kontaktBtn) checks.push('KONTAKTFORMULAR button');

  // 7. No underscores
  const underscores = /<p[^>]*>\s*_{3,}\s*<\/p>/.test(html);
  if (underscores) checks.push('Underscores ___');

  // 8. Has dark-blue or dark-red (at least 1 colored section)
  const hasColor = /dark-blue|dark-red/.test(html);
  if (!hasColor) checks.push('NO colored sections');

  // 9. No small inline images
  const smallImgs = [...html.matchAll(/(<img[^>]*?)style="[^"]*width:\s*(\d+)px/g)].filter(m => parseInt(m[2]) < 400);
  if (smallImgs.length > 0) checks.push('Small inline imgs: ' + smallImgs.length);

  // 10. Images have border-radius (CSS handles this, just check img tags exist)
  const imgCount = (html.match(/<img[^>]*>/g) || []).length;
  if (imgCount < 3) checks.push('LOW img count: ' + imgCount);

  // 11. Price section (except Haltern which was intentionally removed)
  if (slug !== 'geburtstag-in-haltern-am-see') {
    const hasPriceGrid = /price-grid/.test(html);
    if (!hasPriceGrid) checks.push('MISSING price-grid');
  }

  // 12. Footer sections
  const hasFooterKollegen = /ANDERE KOLLEGEN/.test(html);
  const hasFooterNews = /NEWS CLOWN ZAUBERER/.test(html);
  if (!hasFooterKollegen) checks.push('MISSING footer Kollegen');
  if (!hasFooterNews) checks.push('MISSING footer News');

  // 13. Details FAQ properly styled (if present)
  const detailsCount = (html.match(/<details/g) || []).length;
  const styledDetails = (html.match(/city-faq-item/g) || []).length;
  if (detailsCount > 0 && styledDetails === 0) checks.push('UNSTYLED details FAQ');

  if (checks.length === 0) {
    console.log(`✅ ${slug}`);
    summary.ok++;
  } else {
    console.log(`⚠️  ${slug}: ${checks.join(', ')}`);
    summary.issues.push({ slug, checks });
    allGood = false;
  }
});

console.log(`\n=== RESULT: ${summary.ok}/${summary.total} pages perfect ===`);
if (summary.issues.length > 0) {
  console.log('\nIssues:');
  summary.issues.forEach(i => console.log(`  ${i.slug}: ${i.checks.join(', ')}`));
}
if (allGood) {
  console.log('\n🎉 ALL 23 PAGES PASS ALL CHECKS!');
}
