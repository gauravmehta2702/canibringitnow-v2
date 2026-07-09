import type { MetadataRoute } from 'next';
import { rules } from '@/data/rules';
import { getCategories } from '@/lib/categoryUtils';
import { getAirlines } from '@/lib/airlineUtils';
import { getCountries } from '@/lib/countryUtils';
import { getAtlasQuestionPages } from '@/lib/atlasQuestionEngine';
import { absoluteUrl, INDEXABLE_STATIC_PATHS } from '@/lib/seoIndexing';

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = INDEXABLE_STATIC_PATHS.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const categoryPages: MetadataRoute.Sitemap = getCategories().map((category) => ({
    url: absoluteUrl(`/categories/${category.slug}/`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const airlinePages: MetadataRoute.Sitemap = getAirlines().map((airline) => ({
    url: absoluteUrl(`/airlines/${airline.slug}/`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const countryPages: MetadataRoute.Sitemap = getCountries().map((country) => ({
    url: absoluteUrl(`/countries/${country.slug}/`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const rulePages: MetadataRoute.Sitemap = rules.slice(0, 12).map((rule) => ({
    url: absoluteUrl(`/rules/${rule.slug}/`),
    lastModified: new Date(rule.updated),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const questionPages: MetadataRoute.Sitemap = getAtlasQuestionPages()
    .slice(0, 50)
    .map((page) => ({
      url: absoluteUrl(`/questions/${page.slug}/`),
      lastModified: new Date(page.rule.updated),
      changeFrequency: 'monthly',
      priority: 0.72,
    }));

  return [
    ...staticPages,
    ...categoryPages,
    ...airlinePages,
    ...countryPages,
    ...rulePages,
    ...questionPages,
  ];
}
