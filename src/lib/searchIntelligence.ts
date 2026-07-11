import { airlines, countries, rules } from '@/data/rules';
import { getCategories } from '@/lib/categoryUtils';

export type SearchCorrection = {
  original: string;
  corrected: string;
  confidence: number;
};

export type SearchQuickLink = {
  label: string;
  href: string;
  type: 'rule' | 'airline' | 'country' | 'category';
};

const explicitCorrections: Record<string, string> = {
  powerbank: 'power bank',
  powrbank: 'power bank',
  'power bak': 'power bank',
  medicin: 'medicine',
  medecine: 'medicine',
  medicaton: 'medication',
  perfum: 'perfume',
  deoderant: 'deodorant',
  deodrant: 'deodorant',
  ryanair: 'ryanair',
  'ryan air': 'ryanair',
  'easy jet': 'easyjet',
  emirats: 'emirates',
  emirate: 'emirates',
  'british airway': 'british airways',
  ba: 'british airways',
  'handluggage': 'hand luggage',
  'hand lugage': 'hand luggage',
  carryon: 'carry on',
  'carry-on bag': 'carry on',
  'checkinbag': 'checked bag',
  'check in bag': 'checked bag',
  'babyformula': 'baby formula',
  'baby formila': 'baby formula',
  liqud: 'liquid',
  liqids: 'liquids',
};

function normalise(value: string) {
  return value.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function levenshtein(a: string, b: string) {
  const matrix = Array.from({ length: b.length + 1 }, () => Array(a.length + 1).fill(0));
  for (let i = 0; i <= b.length; i += 1) matrix[i][0] = i;
  for (let j = 0; j <= a.length; j += 1) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i += 1) {
    for (let j = 1; j <= a.length; j += 1) {
      matrix[i][j] = b[i - 1] === a[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}

const vocabulary = Array.from(new Set([
  ...Object.values(explicitCorrections),
  ...rules.flatMap((rule) => [rule.item, rule.category, ...rule.tags]),
  ...airlines,
  ...countries,
  ...getCategories().map((category) => category.name),
  'cabin baggage', 'checked baggage', 'hand luggage', 'carry on', 'customs', 'airport security',
].map(normalise).filter(Boolean)));

export function getSearchCorrection(query: string): SearchCorrection | null {
  const original = normalise(query);
  if (!original || original.length < 3) return null;

  if (explicitCorrections[original] && explicitCorrections[original] !== original) {
    return { original, corrected: explicitCorrections[original], confidence: 100 };
  }

  const words = original.split(' ');
  let changed = false;
  const correctedWords = words.map((word) => {
    if (word.length < 4) return word;
    let best = word;
    let bestDistance = Number.POSITIVE_INFINITY;
    vocabulary.forEach((candidatePhrase) => {
      candidatePhrase.split(' ').forEach((candidate) => {
        if (Math.abs(candidate.length - word.length) > 2) return;
        const distance = levenshtein(word, candidate);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = candidate;
        }
      });
    });
    const allowedDistance = word.length >= 8 ? 2 : 1;
    if (bestDistance <= allowedDistance && best !== word) {
      changed = true;
      return best;
    }
    return word;
  });

  if (!changed) return null;
  const corrected = correctedWords.join(' ');
  return { original, corrected, confidence: 75 };
}

export function getSearchQuickLinks(query: string, limit = 8): SearchQuickLink[] {
  const q = normalise(query);
  if (!q) return [];

  const results: Array<SearchQuickLink & { score: number }> = [];

  rules.forEach((rule) => {
    const item = normalise(rule.item);
    const tags = rule.tags.map(normalise);
    let score = 0;
    if (item === q) score += 120;
    if (item.startsWith(q)) score += 80;
    if (item.includes(q)) score += 55;
    if (tags.some((tag) => tag === q)) score += 50;
    if (tags.some((tag) => tag.includes(q))) score += 25;
    if (score > 0) results.push({ label: rule.item, href: `/rules/${rule.slug}/`, type: 'rule', score });
  });

  airlines.forEach((airline) => {
    const name = normalise(airline);
    const score = name === q ? 110 : name.startsWith(q) ? 70 : name.includes(q) ? 45 : 0;
    if (score > 0) results.push({ label: `${airline} guide`, href: `/airlines/${name.replace(/\s+/g, '-')}/`, type: 'airline', score });
  });

  countries.forEach((country) => {
    const name = normalise(country);
    const score = name === q ? 105 : name.startsWith(q) ? 65 : name.includes(q) ? 40 : 0;
    if (score > 0) results.push({ label: `${country} travel rules`, href: `/countries/${name.replace(/\s+/g, '-')}/`, type: 'country', score });
  });

  getCategories().forEach((category) => {
    const name = normalise(category.name);
    const score = name === q ? 100 : name.startsWith(q) ? 60 : name.includes(q) ? 35 : 0;
    if (score > 0) results.push({ label: `${category.name} rules`, href: `/categories/${category.slug}/`, type: 'category', score });
  });

  const seen = new Set<string>();
  return results
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
    .filter((result) => {
      if (seen.has(result.href)) return false;
      seen.add(result.href);
      return true;
    })
    .slice(0, limit)
    .map(({ score: _score, ...result }) => result);
}

export function getSearchPromptSuggestions(query: string) {
  const q = normalise(query);
  if (!q) return ['power bank on ryanair', 'medicine to japan', 'baby formula in cabin', 'liquids in hand luggage'];
  const suggestions = new Set<string>();
  if (q.includes('power') || q.includes('battery')) {
    suggestions.add('power bank in cabin baggage');
    suggestions.add('power bank on ryanair');
    suggestions.add('spare battery in checked baggage');
  }
  if (q.includes('med') || q.includes('pill') || q.includes('tablet')) {
    suggestions.add('medication in cabin baggage');
    suggestions.add('prescription medicine to japan');
    suggestions.add('insulin on a plane');
  }
  if (q.includes('baby') || q.includes('formula') || q.includes('milk')) {
    suggestions.add('baby formula in cabin baggage');
    suggestions.add('baby milk through airport security');
  }
  if (q.includes('liquid') || q.includes('perfume') || q.includes('deodorant')) {
    suggestions.add('liquids in hand luggage');
    suggestions.add('perfume in cabin baggage');
    suggestions.add('deodorant in checked baggage');
  }
  return Array.from(suggestions).slice(0, 4);
}
