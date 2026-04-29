/**
 * Unified Blog-Post Helper.
 * Merget posts.json (30 Legacy WP-Scraped-Posts) + getCollection('blog') (neue n8n-Workflow Posts).
 * Liefert eine kanonische BlogPostSummary fuer Index/Footer/Related-Articles/Categories.
 */
import { getCollection } from 'astro:content';
import postsData from '../data/posts.json';

export interface BlogPostSummary {
  slug: string;
  href: string;             // "/blog/<slug>/"
  title: string;
  date: Date;
  excerpt: string;
  image: string;
  categories: string[];
  source: 'legacy' | 'collection';
}

interface WPPost {
  title: string;
  slug: string;
  type: string;
  date: string;
  link: string;
  content: string;
  excerpt: string;
  meta: Record<string, string | undefined>;
  categories?: { slug: string; name: string }[];
}

const FALLBACK_IMG =
  'https://liar-entertainer.com/wp-content/uploads/2023/08/Clown-Zauberer-mit-Zaubershow.jpg';

function getFirstImage(content: string): string {
  const m = content.match(
    /https?:\/\/liar-entertainer\.com\/wp-content\/uploads\/[^\s"'<>)]+\.(jpg|jpeg|png|webp)/i,
  );
  return m ? m[0] : FALLBACK_IMG;
}

function htmlExcerpt(text: string, max = 160): string {
  const clean = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return clean.length > max ? clean.slice(0, max).trim() + '…' : clean;
}

/**
 * Loads ALL blog posts (legacy + collection) and returns them sorted descending by date.
 * Same-slug duplicates: collection wins (n8n-generated overrides legacy).
 */
export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  // 1) Legacy WP-Posts aus posts.json
  const legacy = (postsData as WPPost[]).map((p): BlogPostSummary => {
    const url = new URL(p.link);
    const href = url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
    const cats = (p.categories || []).map((c) => c.name).filter(Boolean);
    return {
      slug: p.slug,
      href,
      title: p.title,
      date: new Date(p.date),
      excerpt: htmlExcerpt(p.excerpt || p.content || ''),
      image: getFirstImage(p.content || ''),
      categories: cats.length ? cats : ['Allgemein'],
      source: 'legacy',
    };
  });

  // 2) Neue Posts aus Content-Collection
  const entries = await getCollection('blog');
  const collection = entries
    .filter((e) => !e.data.draft)
    .map((e): BlogPostSummary => {
      const slug = String(e.id);
      return {
        slug,
        href: `/blog/${slug}/`,
        title: e.data.title,
        date: e.data.publishDate,
        excerpt: htmlExcerpt(e.data.description || e.body || ''),
        image:
          e.data.heroImage ||
          `https://liar-entertainer.com/blog-images/${slug}/cover.jpg`,
        categories: e.data.categories?.length ? e.data.categories : ['Allgemein'],
        source: 'collection',
      };
    });

  // 3) Merge: collection schlaegt legacy bei Slug-Konflikt
  const collectionSlugs = new Set(collection.map((p) => p.slug));
  const merged: BlogPostSummary[] = [
    ...collection,
    ...legacy.filter((p) => !collectionSlugs.has(p.slug)),
  ];

  // 4) Sortiert: neueste zuerst
  merged.sort((a, b) => b.date.getTime() - a.date.getTime());

  return merged;
}

/**
 * Posts der gleichen Kategorie (verwandte Artikel), exkl. der aktuellen Slug.
 * Gibt bis zu N Artikel zurueck. Falls weniger als N gefunden, padded mit den
 * neuesten anderen Artikeln.
 */
export async function getRelatedPosts(
  currentSlug: string,
  categories: string[],
  n = 3,
): Promise<BlogPostSummary[]> {
  const all = await getAllBlogPosts();
  const others = all.filter((p) => p.slug !== currentSlug);

  const catSet = new Set((categories || []).map((c) => c.toLowerCase().trim()));

  const related = others.filter((p) =>
    p.categories.some((c) => catSet.has(c.toLowerCase().trim())),
  );

  const result = related.slice(0, n);
  if (result.length < n) {
    const fillers = others
      .filter((p) => !result.some((r) => r.slug === p.slug))
      .slice(0, n - result.length);
    result.push(...fillers);
  }

  return result;
}

/**
 * Aggregiert alle einmaligen Kategorien aus allen Posts mit Anzahl.
 */
export async function getAllCategories(): Promise<
  Array<{ slug: string; name: string; count: number }>
> {
  const all = await getAllBlogPosts();
  const counts = new Map<string, { name: string; count: number }>();
  for (const post of all) {
    for (const cat of post.categories) {
      const slug = catToSlug(cat);
      const existing = counts.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(slug, { name: cat, count: 1 });
      }
    }
  }
  return Array.from(counts.entries())
    .map(([slug, v]) => ({ slug, name: v.name, count: v.count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Konvertiert einen Kategorie-Namen in einen URL-Slug.
 */
export function catToSlug(name: string): string {
  return String(name)
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
