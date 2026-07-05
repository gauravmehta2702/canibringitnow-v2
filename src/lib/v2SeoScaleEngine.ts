import { airlines, countries, rules } from '@/data/rules';

export type SeoScaleLink = {
  title: string;
  href: string;
  label: string;
  description?: string;
};

export function scaleSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getSeoScaleStats() {
  const categories = Array.from(new Set(rules.map((rule) => rule.category)));
  const estimatedAirlinePages = Math.min(rules.length, 100) * Math.min(airlines.length, 25);
  const estimatedCountryPages = Math.min(rules.length, 100) * Math.min(countries.length, 50);

  return [
    { label: 'Existing rules', value: rules.length.toString() },
    { label: 'Airlines available', value: airlines.length.toString() },
    { label: 'Countries available', value: countries.length.toString() },
    { label: 'Categories available', value: categories.length.toString() },
    { label: 'Airline SEO seeds', value: estimatedAirlinePages.toLocaleString() },
    { label: 'Country SEO seeds', value: estimatedCountryPages.toLocaleString() },
  ];
}

export function getAirlineSeoOpportunities(limit = 36): SeoScaleLink[] {
  const topRules = rules.slice(0, 12);
  const topAirlines = airlines.slice(0, 8);

  return topRules.flatMap((rule) =>
    topAirlines.map((airline) => {
      const query = `${rule.item} on ${airline}`;
      return {
        title: query,
        href: `/search/?q=${encodeURIComponent(query)}`,
        label: 'Airline SEO opportunity',
        description: `Create or strengthen pages around ${rule.item} and ${airline}.`,
      };
    }),
  ).slice(0, limit);
}

export function getCountrySeoOpportunities(limit = 36): SeoScaleLink[] {
  const topRules = rules.slice(0, 12);
  const topCountries = countries.slice(0, 8);

  return topRules.flatMap((rule) =>
    topCountries.map((country) => {
      const query = `${rule.item} to ${country}`;
      return {
        title: query,
        href: `/search/?q=${encodeURIComponent(query)}`,
        label: 'Country SEO opportunity',
        description: `Create or strengthen destination intent around ${rule.item} and ${country}.`,
      };
    }),
  ).slice(0, limit);
}

export function getContentRefreshQueue(limit = 24): SeoScaleLink[] {
  return rules
    .slice()
    .sort((a, b) => a.updated.localeCompare(b.updated))
    .slice(0, limit)
    .map((rule) => ({
      title: rule.item,
      href: `/rules/${rule.slug}/`,
      label: `Last reviewed ${rule.updated}`,
      description: 'Refresh answer, FAQs, source notes and related links when needed.',
    }));
}

export function getSitemapPriorityGroups(): SeoScaleLink[] {
  return [
    { title: 'Core search', href: '/search/', label: 'Priority 1', description: 'Search should remain the primary conversion path.' },
    { title: 'Rule pages', href: '/rules/', label: 'Priority 1', description: 'Core traffic and answer pages.' },
    { title: 'Airline hubs', href: '/airline-hub/', label: 'Priority 2', description: 'High-intent airline browsing.' },
    { title: 'Country hubs', href: '/country-hub/', label: 'Priority 2', description: 'High-intent destination browsing.' },
    { title: 'Category hubs', href: '/category-hub/', label: 'Priority 2', description: 'Broad topical navigation.' },
    { title: 'AI Travel Brain', href: '/v2-travel-brain/', label: 'Priority 2', description: 'Differentiated AI-style experience.' },
    { title: 'Packing Planner', href: '/packing-planner/', label: 'Priority 3', description: 'Engagement and affiliate opportunity.' },
    { title: 'Growth Engine', href: '/g10-complete/', label: 'Priority 3', description: 'Revenue and analytics planning.' },
  ];
}
