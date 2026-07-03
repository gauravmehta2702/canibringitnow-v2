import { getAirlines } from '@/lib/airlineUtils';
import { getCategories, slugify } from '@/lib/categoryUtils';
import { getCountries } from '@/lib/countryUtils';

export type EntityResult = {
  type: 'airline' | 'country' | 'category';
  name: string;
  slug: string;
  url: string;
  description: string;
};

function normalise(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function scoreName(query: string, name: string, aliases: string[] = []) {
  const q = normalise(query);
  const candidates = [name, slugify(name), ...aliases].map(normalise);
  let score = 0;
  candidates.forEach((candidate) => {
    if (!candidate) return;
    if (q === candidate) score += 100;
    if (q.includes(candidate)) score += 60;
    if (candidate.includes(q)) score += 40;
    const qWords = q.split(' ');
    qWords.forEach((word) => {
      if (word.length > 2 && candidate.includes(word)) score += 10;
    });
  });
  return score;
}

const countryAliases: Record<string, string[]> = {
  USA: ['us', 'america', 'united states'],
  UAE: ['dubai', 'abu dhabi', 'emirates'],
  'United Kingdom': ['uk', 'britain', 'england'],
  'South Korea': ['korea'],
  'New Zealand': ['nz'],
};

export function searchEntities(query: string, limit = 6): EntityResult[] {
  const q = normalise(query);
  if (!q) return [];

  const airlineResults = getAirlines().map((airline) => ({
    type: 'airline' as const,
    name: airline.name,
    slug: airline.slug,
    url: `/airlines/${airline.slug}/`,
    description: `${airline.name} baggage and travel item rules.`,
    score: scoreName(q, airline.name),
  }));

  const countryResults = getCountries().map((country) => ({
    type: 'country' as const,
    name: country.name,
    slug: country.slug,
    url: `/countries/${country.slug}/`,
    description: `${country.name} customs, food, medication and travel rules.`,
    score: scoreName(q, country.name, countryAliases[country.name] || []),
  }));

  const categoryResults = getCategories().map((category) => ({
    type: 'category' as const,
    name: category.name,
    slug: category.slug,
    url: `/categories/${category.slug}/`,
    description: `${category.name} travel rules and related checks.`,
    score: scoreName(q, category.name),
  }));

  return [...airlineResults, ...countryResults, ...categoryResults]
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, limit)
    .map(({ score, ...result }) => result);
}
