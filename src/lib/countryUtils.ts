import { countries, rules, type Rule } from '@/data/rules';
import { slugify } from '@/lib/categoryUtils';

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

function countryAliases(country: string) {
  const aliases: Record<string, string[]> = {
    USA: ['usa', 'united states', 'america', 'us'],
    UAE: ['uae', 'dubai', 'abu dhabi', 'emirates'],
    'United Kingdom': ['united kingdom', 'uk', 'britain', 'england'],
    'South Korea': ['south korea', 'korea'],
    'New Zealand': ['new zealand', 'nz'],
  };

  return [country.toLowerCase(), countrySlug(country), ...(aliases[country] || [])];
}

export function getCountryRules(country: string) {
  const aliases = countryAliases(country);
  const scored = rules
    .map((rule) => {
      const haystack = [rule.item, rule.shortAnswer, ...rule.restrictions, ...rule.tips, ...rule.tags].join(' ').toLowerCase();
      let score = 0;
      aliases.forEach((alias) => {
        if (haystack.includes(alias)) score += 25;
        if (rule.item.toLowerCase().includes(`to ${alias}`)) score += 35;
        if (rule.tags.some((tag) => tag.toLowerCase() === alias)) score += 20;
      });
      if (rule.category === 'Food & customs') score += 5;
      if (rule.category === 'Medication') score += 3;
      return { rule, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.rule.item.localeCompare(b.rule.item))
    .map((entry) => entry.rule);

  return scored.length ? scored : rules.filter((rule) => ['Food & customs', 'Medication', 'Batteries'].includes(rule.category)).slice(0, 12);
}

export function getCountryCategories(countryRules: Rule[]) {
  return Array.from(new Set(countryRules.map((rule) => rule.category))).map((category) => ({
    name: category,
    slug: slugify(category),
    count: countryRules.filter((rule) => rule.category === category).length,
  }));
}

export function getRelatedCountries(currentCountry: string, limit = 8) {
  return countries
    .filter((country) => country !== currentCountry)
    .slice(0, limit)
    .map((country) => ({ name: country, slug: countrySlug(country) }));
}

export function getCountryPopularSearches(country: string) {
  return [
    `food to ${country}`,
    `medication to ${country}`,
    `protein powder to ${country}`,
    `baby food to ${country}`,
    `perfume to ${country}`,
    `power bank to ${country}`,
  ];
}

export function getCountries() {
  return countries.map((country) => {
    const matchingRules = getCountryRules(country);
    return {
      name: country,
      slug: countrySlug(country),
      description: getCountryDescription(country),
      rules: matchingRules,
      categories: getCountryCategories(matchingRules),
      relatedCountries: getRelatedCountries(country),
      popularSearches: getCountryPopularSearches(country),
    };
  });
}

export function getCountryBySlug(slug: string) {
  return getCountries().find((country) => country.slug === slug);
}
