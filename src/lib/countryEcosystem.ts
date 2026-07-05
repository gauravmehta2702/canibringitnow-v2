import { countries, rules } from '@/data/rules';

export function countrySlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getCountryRules(countryName: string) {
  const slug = countrySlug(countryName);
  return rules.filter((rule) => rule.slug.includes(slug));
}

export function getTopCountryHubs(limit = 12) {
  return countries.slice(0, limit).map((name) => ({
    name,
    slug: countrySlug(name),
    rules: getCountryRules(name),
  }));
}

export function getCountrySearches(countryName: string) {
  return [
    `Power bank to ${countryName}`,
    `Medication to ${countryName}`,
    `Baby formula to ${countryName}`,
    `Protein powder to ${countryName}`,
    `Food to ${countryName}`,
    `Perfume to ${countryName}`,
    `Laptop to ${countryName}`,
    `Customs rules ${countryName}`,
  ];
}
