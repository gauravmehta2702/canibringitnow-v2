import type { MetadataRoute } from 'next';
import { rules } from '@/data/rules';
import { getCategories } from '@/lib/categoryUtils';

const siteUrl = 'https://canibringitnow.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/check/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/categories/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/privacy/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/terms/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/disclaimer/`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ];

  const categoryPages: MetadataRoute.Sitemap = getCategories().map((category) => ({
    url: `${siteUrl}/categories/${category.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const rulePages: MetadataRoute.Sitemap = rules.map((rule) => ({
    url: `${siteUrl}/rules/${rule.slug}/`,
    lastModified: new Date(rule.updated),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...rulePages];
}
