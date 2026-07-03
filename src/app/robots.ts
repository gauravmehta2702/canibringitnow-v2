import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/qa/', '/api/'],
      },
    ],
    sitemap: 'https://canibringitnow.com/sitemap.xml',
  };
}
