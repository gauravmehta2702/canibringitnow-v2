import { airlines, countries, rules, type Rule } from '@/data/rules';
import { slugify } from '@/lib/categoryUtils';

export function airlineSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getAirlineNameFromRule(rule: Rule) {
  const text = [rule.item, rule.shortAnswer, ...rule.restrictions, ...rule.tips, ...rule.tags].join(' ').toLowerCase();
  return airlines.find((airline) => text.includes(airline.toLowerCase()) || text.includes(airlineSlug(airline))) || null;
}

function scoreAirlineRule(rule: Rule, airline: string) {
  const airlineLower = airline.toLowerCase();
  const airlineSlugValue = airlineSlug(airline);
  const haystack = [rule.item, rule.shortAnswer, ...rule.restrictions, ...rule.tips, ...rule.tags].join(' ').toLowerCase();
  let score = 0;
  if (haystack.includes(airlineLower)) score += 50;
  if (haystack.includes(airlineSlugValue)) score += 35;
  if (rule.tags.some((tag) => tag.toLowerCase() === airlineLower || tag.toLowerCase() === airlineSlugValue)) score += 25;
  if (rule.item.toLowerCase().includes(`on ${airlineLower}`)) score += 30;
  return score;
}

export function getAirlineRules(airline: string) {
  const scored = rules
    .map((rule) => ({ rule, score: scoreAirlineRule(rule, airline) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.rule.item.localeCompare(b.rule.item))
    .map((entry) => entry.rule);

  return scored.length ? scored : rules.slice(0, 12);
}

export function getAirlineCategories(airlineRules: Rule[]) {
  return Array.from(new Set(airlineRules.map((rule) => rule.category))).map((category) => ({
    name: category,
    slug: slugify(category),
    count: airlineRules.filter((rule) => rule.category === category).length,
  }));
}

export function getRelatedAirlines(currentAirline: string, limit = 8) {
  return airlines
    .filter((airline) => airline !== currentAirline)
    .slice(0, limit)
    .map((airline) => ({ name: airline, slug: airlineSlug(airline) }));
}

export function getAirlinePopularSearches(airline: string) {
  return [
    `power bank ${airline}`,
    `medication ${airline}`,
    `baby milk ${airline}`,
    `laptop ${airline}`,
    `perfume ${airline}`,
    `cpap machine ${airline}`,
  ];
}

export function getAirlines() {
  return airlines.map((airline) => {
    const matchingRules = getAirlineRules(airline);

    return {
      name: airline,
      slug: airlineSlug(airline),
      rules: matchingRules,
      categories: getAirlineCategories(matchingRules),
      relatedAirlines: getRelatedAirlines(airline),
      popularSearches: getAirlinePopularSearches(airline),
      destinations: countries.slice(0, 8).map((country) => ({ name: country, slug: slugify(country) })),
      description: `${airline} travel guidance for cabin baggage, checked baggage, electronics, liquids, medication, baby travel and restricted items.`,
    };
  });
}

export function getAirlineBySlug(slug: string) {
  return getAirlines().find((airline) => airline.slug === slug);
}
