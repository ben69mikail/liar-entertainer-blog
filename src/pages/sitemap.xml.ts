import type { APIRoute } from 'astro';
import pagesData from '../data/pages.json';
import postsData from '../data/posts.json';

type WPItem = {
  link: string;
  date: string;
  type: string;
};

const allItems = [...(pagesData as WPItem[]), ...(postsData as WPItem[])];
const SITE = 'https://liar-entertainer.com';

// Hero images for image sitemap (main pages)
const pageImages: Record<string, { loc: string; title: string }[]> = {
  '/': [
    { loc: 'https://liar-entertainer.com/wp-content/uploads/2024/01/Clown-Zauberer-LIAR-2.jpg', title: 'Clown Zauberer LIAR bei einer Zaubershow in NRW' },
  ],
  '/kindergeburtstag/': [
    { loc: 'https://liar-entertainer.com/wp-content/uploads/2023/08/kindergeburtstag-clown-zauberer-nrw.jpg', title: 'Kindergeburtstag mit Clown Zauberer in NRW' },
  ],
  '/kinderzauberer/': [
    { loc: 'https://liar-entertainer.com/wp-content/uploads/2023/08/kinderzauberer-nrw.jpg', title: 'Kinderzauberer NRW – Zaubershow für Kinder' },
  ],
  '/clown/clownshow/': [
    { loc: 'https://liar-entertainer.com/wp-content/uploads/2023/08/clownshow-nrw.jpg', title: 'Clownshow NRW – Clown für Kindergeburtstag' },
  ],
  '/zauberer/': [
    { loc: 'https://liar-entertainer.com/wp-content/uploads/2023/08/zauberer-nrw.jpg', title: 'Zauberer NRW für Kindergeburtstag und Events' },
  ],
  '/zauberer/zaubershow/': [
    { loc: 'https://liar-entertainer.com/wp-content/uploads/2023/08/zaubershow-nrw.jpg', title: 'Zaubershow für Kinder in NRW' },
  ],
};

export const GET: APIRoute = () => {
  const now = new Date().toISOString().split('T')[0];

  const urls: { loc: string; lastmod: string; priority: string; changefreq: string; images?: { loc: string; title: string }[] }[] = [];

  // Homepage
  urls.push({ loc: `${SITE}/`, lastmod: '2026-04-06', priority: '1.0', changefreq: 'weekly', images: pageImages['/'] });

  // Handcrafted static pages (not in WP data)
  const staticPages = [
    { loc: `${SITE}/blog/`, priority: '0.9', changefreq: 'daily', lastmod: '2026-03-28' },
    { loc: `${SITE}/kindergeburtstag/`, priority: '0.9', changefreq: 'weekly', lastmod: '2026-04-06' },
    { loc: `${SITE}/kinderzauberer/`, priority: '0.9', changefreq: 'weekly', lastmod: '2026-03-28' },
    { loc: `${SITE}/preise/`, priority: '0.9', changefreq: 'weekly', lastmod: '2026-04-06' },
    { loc: `${SITE}/galerie/`, priority: '0.7', changefreq: 'monthly', lastmod: '2026-03-15' },
    { loc: `${SITE}/kontakt/`, priority: '0.8', changefreq: 'monthly', lastmod: '2026-01-15' },
    { loc: `${SITE}/ueber-mich/`, priority: '0.7', changefreq: 'monthly', lastmod: '2026-02-10' },
    { loc: `${SITE}/clown/clownshow/`, priority: '0.9', changefreq: 'weekly', lastmod: '2026-04-06' },
    { loc: `${SITE}/clown/walk-act/`, priority: '0.8', changefreq: 'monthly', lastmod: '2026-02-20' },
    { loc: `${SITE}/clown/ballonmodellage/`, priority: '0.8', changefreq: 'monthly', lastmod: '2026-02-20' },
    { loc: `${SITE}/clown/glitzer-tattoo/`, priority: '0.8', changefreq: 'monthly', lastmod: '2026-02-20' },
    { loc: `${SITE}/clown/karneval/`, priority: '0.8', changefreq: 'monthly', lastmod: '2026-02-20' },
    { loc: `${SITE}/zauberer/`, priority: '0.9', changefreq: 'weekly', lastmod: '2026-03-28' },
    { loc: `${SITE}/zauberer/zaubershow/`, priority: '0.9', changefreq: 'weekly', lastmod: '2026-03-28' },
    { loc: `${SITE}/zauberer/buehnen-zauberer/`, priority: '0.8', changefreq: 'monthly', lastmod: '2026-03-15' },
    { loc: `${SITE}/zauberer/tisch-zauberer/`, priority: '0.8', changefreq: 'monthly', lastmod: '2026-03-15' },
    { loc: `${SITE}/zauberer/zaubershow/kindergarten-kita/`, priority: '0.8', changefreq: 'monthly', lastmod: '2026-03-10' },
    { loc: `${SITE}/zauberer/zaubershow/schule/`, priority: '0.8', changefreq: 'monthly', lastmod: '2026-03-10' },
    { loc: `${SITE}/zauberer/zaubershow/strassen-sommer-fest/`, priority: '0.8', changefreq: 'monthly', lastmod: '2026-03-10' },
  ];
  for (const p of staticPages) {
    const path = p.loc.replace(SITE, '');
    urls.push({ loc: p.loc, lastmod: p.lastmod, priority: p.priority, changefreq: p.changefreq, images: pageImages[path] });
  }

  const seenLocs = new Set(urls.map(u => u.loc));

  for (const item of allItems) {
    try {
      const url = new URL(item.link);
      const path = url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
      if (path === '/') continue;
      const loc = `${SITE}${path}`;
      if (seenLocs.has(loc)) continue;
      seenLocs.add(loc);

      const lastmod = item.date ? item.date.split(/[T ]/)[0] : now;
      const isBlog = item.type === 'post';
      const isCity = path.includes('kinderzauberer-in-') || path.includes('geburtstag-in-') || path.includes('clown-in-');
      const priority = isBlog ? '0.6' : isCity ? '0.7' : '0.8';
      const changefreq = isBlog ? 'monthly' : 'weekly';

      urls.push({ loc, lastmod, priority, changefreq });
    } catch {
      // skip
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${
      u.images
        ? u.images.map((img) => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
    </image:image>`).join('')
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
