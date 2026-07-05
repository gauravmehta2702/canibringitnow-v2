import { airlines, countries, rules } from '@/data/rules';

export type V2EntityType = 'rule' | 'airline' | 'country' | 'category' | 'search';

export type V2Node = {
  id: string;
  type: V2EntityType;
  title: string;
  href: string;
  label: string;
  description?: string;
};

export function v2Slug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getV2RuleNodes(limit = 24): V2Node[] {
  return rules.slice(0, limit).map((rule) => ({
    id: rule.slug,
    type: 'rule',
    title: rule.item,
    href: `/rules/${rule.slug}/`,
    label: rule.category,
    description: rule.shortAnswer,
  }));
}

export function getV2AirlineNodes(limit = 24): V2Node[] {
  return airlines.slice(0, limit).map((airline) => ({
    id: v2Slug(airline),
    type: 'airline',
    title: airline,
    href: `/airlines/${v2Slug(airline)}/`,
    label: 'Airline',
    description: `Baggage and travel rules for ${airline}.`,
  }));
}

export function getV2CountryNodes(limit = 24): V2Node[] {
  return countries.slice(0, limit).map((country) => ({
    id: v2Slug(country),
    type: 'country',
    title: country,
    href: `/countries/${v2Slug(country)}/`,
    label: 'Country',
    description: `Customs and destination travel rules for ${country}.`,
  }));
}

export function getV2CategoryNodes(limit = 24): V2Node[] {
  const categories = Array.from(new Set(rules.map((rule) => rule.category))).sort();
  return categories.slice(0, limit).map((category) => ({
    id: v2Slug(category),
    type: 'category',
    title: category,
    href: `/categories/${v2Slug(category)}/`,
    label: 'Category',
    description: `Travel rules for ${category}.`,
  }));
}

export function getV2KnowledgeGraph(limit = 72): V2Node[] {
  return [
    ...getV2RuleNodes(24),
    ...getV2AirlineNodes(16),
    ...getV2CountryNodes(16),
    ...getV2CategoryNodes(16),
  ].slice(0, limit);
}

export function getV2ProgrammaticSeeds(limit = 60): V2Node[] {
  const topRules = rules.slice(0, 10);
  const topAirlines = airlines.slice(0, 5);
  const topCountries = countries.slice(0, 5);

  const airlineSeeds = topRules.flatMap((rule) =>
    topAirlines.map((airline) => {
      const query = `${rule.item} on ${airline}`;
      return {
        id: v2Slug(query),
        type: 'search' as const,
        title: query,
        href: `/search/?q=${encodeURIComponent(query)}`,
        label: 'Programmatic airline SEO',
        description: 'High-intent travel rules search.',
      };
    }),
  );

  const countrySeeds = topRules.flatMap((rule) =>
    topCountries.map((country) => {
      const query = `${rule.item} to ${country}`;
      return {
        id: v2Slug(query),
        type: 'search' as const,
        title: query,
        href: `/search/?q=${encodeURIComponent(query)}`,
        label: 'Programmatic country SEO',
        description: 'High-intent destination rules search.',
      };
    }),
  );

  return [...airlineSeeds, ...countrySeeds].slice(0, limit);
}

export function getV2RoadmapCards(): V2Node[] {
  return [
    { id: 'ai-travel-brain', type: 'search', title: 'AI Travel Brain', href: '/travel-assistant/', label: 'AI system', description: 'Ask complete trip questions and get rule-based answers.' },
    { id: 'programmatic-seo', type: 'search', title: 'Programmatic SEO Engine', href: '/v2-foundation/', label: 'SEO system', description: 'Generate scalable airline, country and item combinations.' },
    { id: 'airline-intelligence', type: 'airline', title: 'Airline Intelligence', href: '/airline-hub/', label: 'Airlines', description: 'Build richer airline hubs from structured rules.' },
    { id: 'country-intelligence', type: 'country', title: 'Country Intelligence', href: '/country-hub/', label: 'Countries', description: 'Build richer customs and destination hubs.' },
    { id: 'category-intelligence', type: 'category', title: 'Category Intelligence', href: '/category-hub/', label: 'Categories', description: 'Organize rules by item types.' },
    { id: 'growth-engine', type: 'search', title: 'Growth Engine', href: '/g10-complete/', label: 'Revenue', description: 'Connect traffic, products, analytics and monetisation.' },
  ];
}
