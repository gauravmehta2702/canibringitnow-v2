import { airlines, countries, rules } from '@/data/rules';

export type ProductionLink = {
  title: string;
  href: string;
  label: string;
  description?: string;
};

export function prodSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getProductionHealth() {
  return [
    { label: 'Rule pages', value: rules.length.toString(), status: 'Ready' },
    { label: 'Airline hubs', value: airlines.length.toString(), status: 'Ready' },
    { label: 'Country hubs', value: countries.length.toString(), status: 'Ready' },
    { label: 'Categories', value: Array.from(new Set(rules.map((r) => r.category))).length.toString(), status: 'Ready' },
  ];
}

export function getSeoValidationLinks(limit = 24): ProductionLink[] {
  const categories = Array.from(new Set(rules.map((rule) => rule.category))).slice(0, 8);

  return [
    ...rules.slice(0, 8).map((rule) => ({
      title: rule.item,
      href: `/rules/${rule.slug}/`,
      label: 'Rule page',
      description: rule.shortAnswer,
    })),
    ...airlines.slice(0, 8).map((airline) => ({
      title: airline,
      href: `/airlines/${prodSlug(airline)}/`,
      label: 'Airline hub',
      description: `Validate ${airline} hub page.`,
    })),
    ...countries.slice(0, 8).map((country) => ({
      title: country,
      href: `/countries/${prodSlug(country)}/`,
      label: 'Country hub',
      description: `Validate ${country} destination page.`,
    })),
    ...categories.map((category) => ({
      title: category,
      href: `/categories/${prodSlug(category)}/`,
      label: 'Category hub',
      description: `Validate ${category} category page.`,
    })),
  ].slice(0, limit);
}

export function getLaunchChecklist() {
  return [
    'Run npm run build locally before every push.',
    'Check Cloudflare deployment has a green tick.',
    'Test homepage, search, rule page, airline hub, country hub and category hub.',
    'Submit sitemap to Google Search Console.',
    'Connect Cloudflare Web Analytics or Google Analytics.',
    'Add affiliate IDs only after pages are stable.',
    'Keep product recommendations below answers, not above answers.',
    'Monitor Search Console queries weekly.',
    'Improve pages that get impressions but low clicks.',
    'Do not create thin pages without useful answers.',
  ];
}

export function getNextRevenueActions(): ProductionLink[] {
  return [
    { title: 'Amazon Associates setup', href: '/growth-engine/', label: 'Affiliate', description: 'Add affiliate tracking later to product links.' },
    { title: 'Travel insurance partners', href: '/search/?q=travel%20insurance', label: 'Affiliate', description: 'High-value monetisation option.' },
    { title: 'eSIM partner links', href: '/search/?q=travel%20esim', label: 'Affiliate', description: 'Good fit for country and trip pages.' },
    { title: 'Airport parking links', href: '/search/?q=airport%20parking', label: 'Affiliate', description: 'Useful for airport and airline traffic.' },
    { title: 'Lounge access links', href: '/search/?q=airport%20lounge', label: 'Affiliate', description: 'Potential premium travel offer.' },
    { title: 'Currency card links', href: '/search/?q=travel%20money%20card', label: 'Affiliate', description: 'Relevant for destination travel pages.' },
  ];
}

export function getConsolidationTargets() {
  return [
    'Keep one main search engine and remove duplicated search helpers later.',
    'Keep one product recommendation component and retire older placeholders later.',
    'Keep one AI assistant entry point and route older assistant pages into it later.',
    'Keep one growth dashboard and use it as the launch checklist.',
    'Standardise page names: airline-hub, country-hub, category-hub, v2-foundation.',
  ];
}
