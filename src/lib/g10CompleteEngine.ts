import { airlines, countries, rules } from '@/data/rules';

export type G10Link = { title: string; href: string; label: string; description?: string };

export function slugifyG10(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getGrowthProducts(category?: string): G10Link[] {
  const products: G10Link[] = [
    { title: 'Clear liquids bag', label: 'Airport security', href: '/search/?q=clear%20liquids%20bag', description: 'Useful for toiletries and airport screening.' },
    { title: 'Digital luggage scale', label: 'Baggage', href: '/search/?q=digital%20luggage%20scale', description: 'Helps avoid overweight baggage fees.' },
    { title: 'Universal travel adapter', label: 'Electronics', href: '/search/?q=universal%20travel%20adapter', description: 'Useful for phones, laptops and cameras.' },
    { title: 'Medicine organiser', label: 'Medication', href: '/search/?q=medicine%20organiser%20travel', description: 'Useful for keeping medication organised.' },
    { title: 'Baby bottle travel bag', label: 'Baby travel', href: '/search/?q=baby%20bottle%20travel%20bag', description: 'Useful for baby milk and formula.' },
    { title: 'Cable organiser pouch', label: 'Electronics', href: '/search/?q=travel%20cable%20organiser', description: 'Useful for cables, chargers and adapters.' },
  ];
  if (!category) return products.slice(0, 4);
  const c = category.toLowerCase();
  const priority = products.filter((p) => c.includes(p.label.toLowerCase()) || p.label.toLowerCase().includes(c) || (c.includes('battery') && p.label === 'Electronics') || (c.includes('baby') && p.label === 'Baby travel'));
  return [...priority, ...products.filter((p) => !priority.includes(p))].slice(0, 4);
}

export function getGrowthActions(ruleSlug?: string): G10Link[] {
  const rule = rules.find((r) => r.slug === ruleSlug);
  return [
    { title: 'Search another item', href: '/search/', label: 'Search', description: 'Check another item before flying.' },
    { title: 'Airline hubs', href: '/airline-hub/', label: 'Airlines', description: 'Browse rules by airline.' },
    { title: 'Country hubs', href: '/country-hub/', label: 'Countries', description: 'Browse rules by destination.' },
    { title: 'Category hubs', href: '/category-hub/', label: 'Categories', description: 'Browse rules by item type.' },
    { title: 'AI Travel Assistant', href: '/travel-assistant/', label: 'AI', description: 'Ask a complete travel question.' },
    { title: rule ? `More ${rule.category} checks` : 'Trending checks', href: rule ? `/categories/${slugifyG10(rule.category)}/` : '/trending/', label: 'Related', description: 'Continue with related checks.' },
  ];
}

export function getTrendingSearches(): G10Link[] {
  return ['Can I take a power bank on Emirates?', 'Medication to Japan', 'Baby formula to USA', 'Protein powder to Japan', 'CPAP machine on Qatar Airways', 'Liquids in hand luggage', 'Perfume in cabin baggage', 'Drone batteries on a plane'].map((q) => ({ title: q, href: `/search/?q=${encodeURIComponent(q)}`, label: 'Trending search' }));
}

export function getProgrammaticSeoLinks(limit = 24): G10Link[] {
  const itemRules = rules.slice(0, 8);
  const airlineNames = airlines.slice(0, 4);
  const countryNames = countries.slice(0, 4);
  const airlineLinks = itemRules.flatMap((rule) => airlineNames.map((airline) => ({ title: `${rule.item} on ${airline}`, href: `/search/?q=${encodeURIComponent(`${rule.item} on ${airline}`)}`, label: 'Airline SEO', description: 'High-intent airline baggage search.' })));
  const countryLinks = itemRules.flatMap((rule) => countryNames.map((country) => ({ title: `${rule.item} to ${country}`, href: `/search/?q=${encodeURIComponent(`${rule.item} to ${country}`)}`, label: 'Country SEO', description: 'High-intent destination customs search.' })));
  return [...airlineLinks, ...countryLinks].slice(0, limit);
}

export function getAnalyticsEvents() {
  return [
    { name: 'search_submitted', purpose: 'Measure high-intent travel searches.' },
    { name: 'rule_opened', purpose: 'Measure most useful rule pages.' },
    { name: 'affiliate_click', purpose: 'Measure product recommendation clicks.' },
    { name: 'hub_opened', purpose: 'Measure airline/country/category hub demand.' },
    { name: 'ai_assistant_used', purpose: 'Measure AI travel assistant demand.' },
  ];
}
