import { countries, rules } from '@/data/rules';

export function countrySlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getCountryDescription(country: string) {
  const descriptions: Record<string, string> = {
    USA: 'Travel guidance for the USA, including airport security, customs, food, medication, electronics and baggage checks.',
    Japan: 'Travel guidance for Japan, including customs restrictions, food rules, medication checks and airport security guidance.',
    India: 'Travel guidance for India, including customs, medicine, electronics, food and baggage preparation.',
    Australia: 'Travel guidance for Australia, including strict biosecurity, food, customs and baggage checks.',
    Canada: 'Travel guidance for Canada, including customs, medication, food, electronics and baggage checks.',
    UAE: 'Travel guidance for the UAE, including customs, medication, electronics, liquids and restricted items.',
    Thailand: 'Travel guidance for Thailand, including customs, medication, food, electronics and baggage preparation.',
    Singapore: 'Travel guidance for Singapore, including customs, airport security, medication, electronics and restricted items.',
  };
  return descriptions[country] || `Travel guidance for ${country}, including baggage, airport security, customs and restricted items.`;
}

export function getCountries() {
  return countries.map((country) => ({
    name: country,
    slug: countrySlug(country),
    description: getCountryDescription(country),
    rules: rules.slice(0, 8),
  }));
}

export function getCountryBySlug(slug: string) {
  return getCountries().find((country) => country.slug === slug);
}
