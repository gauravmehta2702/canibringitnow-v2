import type { MetadataRoute } from 'next';
import { rules } from '@/data/rules';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://canibringitnow.com';
  return [{ url: base, lastModified: new Date() }, ...rules.map((r) => ({ url: `${base}/rules/${r.slug}/`, lastModified: new Date(r.updated) }))];
}
