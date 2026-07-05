import { airlines, rules } from '@/data/rules';

export function airlineSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getAirlineRules(airlineName: string) {
  const slug = airlineSlug(airlineName);
  return rules.filter((rule) => rule.slug.includes(slug));
}

export function getTopAirlineHubs(limit = 12) {
  return airlines.slice(0, limit).map((name) => ({
    name,
    slug: airlineSlug(name),
    rules: getAirlineRules(name),
  }));
}

export function getAirlineSearches(airlineName: string) {
  return [
    `Power bank on ${airlineName}`,
    `Medication on ${airlineName}`,
    `Baby milk on ${airlineName}`,
    `Liquids on ${airlineName}`,
    `Laptop on ${airlineName}`,
    `Perfume on ${airlineName}`,
    `Razor on ${airlineName}`,
    `Drone batteries on ${airlineName}`,
  ];
}
