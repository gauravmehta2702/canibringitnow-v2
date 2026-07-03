import type { MetadataRoute } from 'next';
import { rules } from '@/data/rules';
import { getCategories } from '@/lib/categoryUtils';
import { getAirlines } from '@/lib/airlineUtils';
import { getCountries } from '@/lib/countryUtils';
import { getItems } from '@/lib/itemUtils';

const siteUrl = 'https://canibringitnow.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/check/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/search/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/ask/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.82 },
    { url: `${siteUrl}/items/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.82 },
    { url: `${siteUrl}/rules/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${siteUrl}/categories/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/airlines/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/countries/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
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

  const airlinePages: MetadataRoute.Sitemap = getAirlines().map((airline) => ({
    url: `${siteUrl}/airlines/${airline.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const countryPages: MetadataRoute.Sitemap = getCountries().map((country) => ({
    url: `${siteUrl}/countries/${country.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const itemPages: MetadataRoute.Sitemap = getItems().map((item) => ({
    url: `${siteUrl}/items/${item.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.78,
  }));

  const rulePages: MetadataRoute.Sitemap = rules.map((rule) => ({
    url: `${siteUrl}/rules/${rule.slug}/`,
    lastModified: new Date(rule.updated),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...airlinePages, ...countryPages, ...itemPages, ...rulePages];
}
