import type { MetadataRoute } from 'next';
import { rules } from '@/data/rules';
import { getCategories } from '@/lib/categoryUtils';
import { getAirlines } from '@/lib/airlineUtils';
import { getCountries } from '@/lib/countryUtils';
import { getAtlasQuestionPages } from '@/lib/atlasQuestionEngine';
import { launchLimits } from '@/lib/launchLimits';

const siteUrl = 'https://canibringitnow.com';
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/check/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/search/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/rules/`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${siteUrl}/questions/`, lastModified: now, changeFrequency: 'weekly', priority: 0.82 },
    { url: `${siteUrl}/categories/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/airlines/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/countries/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/travel-intelligence/`, lastModified: now, changeFrequency: 'weekly', priority: 0.78 },
    { url: `${siteUrl}/before-you-fly/`, lastModified: now, changeFrequency: 'weekly', priority: 0.78 },
    { url: `${siteUrl}/packing-planner/`, lastModified: now, changeFrequency: 'weekly', priority: 0.76 },
    { url: `${siteUrl}/travel-essentials/`, lastModified: now, changeFrequency: 'weekly', priority: 0.74 },
    { url: `${siteUrl}/growth-release-9/`, lastModified: now, changeFrequency: 'monthly', priority: 0.35 },
    { url: `${siteUrl}/deals/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${siteUrl}/privacy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/terms/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/disclaimer/`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const categoryPages: MetadataRoute.Sitemap = getCategories().map((category) => ({
    url: `${siteUrl}/categories/${category.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const airlinePages: MetadataRoute.Sitemap = getAirlines().slice(0, launchLimits.airlines).map((airline) => ({
    url: `${siteUrl}/airlines/${airline.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const countryPages: MetadataRoute.Sitemap = getCountries().slice(0, launchLimits.countries).map((country) => ({
    url: `${siteUrl}/countries/${country.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const questionPages: MetadataRoute.Sitemap = getAtlasQuestionPages().slice(0, launchLimits.questionPages).map((page) => ({
    url: `${siteUrl}/questions/${page.slug}/`,
    lastModified: new Date(page.rule.updated),
    changeFrequency: 'monthly',
    priority: 0.72,
  }));

  const rulePages: MetadataRoute.Sitemap = rules.slice(0, launchLimits.rules).map((rule) => ({
    url: `${siteUrl}/rules/${rule.slug}/`,
    lastModified: new Date(rule.updated),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...airlinePages, ...countryPages, ...rulePages, ...questionPages];
}
