import type { MetadataRoute } from 'next';
import { INTERNAL_NOINDEX_PATHS, SITE_URL } from '@/lib/seoIndexing';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', ...INTERNAL_NOINDEX_PATHS],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
