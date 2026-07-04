import { airlines, countries, rules, type Rule } from '@/data/rules';
import { airlineSlug } from '@/lib/airlineUtils';
import { countrySlug } from '@/lib/countryUtils';
import { smartSearch } from '@/lib/smartSearch';

export type TravelAgentEntity = {
  label: string;
  type: 'airline' | 'country' | 'category' | 'item';
  href?: string;
};

export type TravelAgentAnswer = {
  mode: 'rule' | 'airline' | 'country' | 'general';
  summary: string;
  bestRule: Rule | null;
  matchedRules: Rule[];
  entities: TravelAgentEntity[];
  checklist: string[];
  warnings: string[];
  nextLinks: { label: string; href: string }[];
};

function normalise(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function findAirline(query: string) {
  const q = normalise(query);
  return airlines.find((airline) => {
    const slug = airlineSlug(airline).replace(/-/g, ' ');
    return q.includes(normalise(airline)) || q.includes(slug);
  });
}

function findCountry(query: string) {
  const q = normalise(query);
  return countries.find((country) => {
    const slug = countrySlug(country).replace(/-/g, ' ');
    return q.includes(normalise(country)) || q.includes(slug);
  });
}

function pickRules(query: string, airline?: string, country?: string) {
  const directResults = smartSearch(query, 8);
  const q = normalise(query);

  const contextual = rules
    .map((rule) => {
      const text = normalise([rule.item, rule.category, rule.shortAnswer, ...rule.tags].join(' '));
      let score = 0;
      if (airline && text.includes(normalise(airline))) score += 30;
      if (country && text.includes(normalise(country))) score += 30;
      if (q && text.includes(q)) score += 20;
      q.split(' ').forEach((term) => {
        if (term.length > 2 && text.includes(term)) score += 2;
      });
      return { rule, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.rule);

  const merged = [...directResults, ...contextual];
  const seen = new Set<string>();
  return merged.filter((rule) => {
    if (seen.has(rule.slug)) return false;
    seen.add(rule.slug);
    return true;
  }).slice(0, 6);
}

function buildSummary(bestRule: Rule | null, airline?: string, country?: string) {
  if (!bestRule) {
    if (airline) return `I found ${airline}, but I need an item as well. Try asking: “Can I take a power bank on ${airline}?”`;
    if (country) return `I found ${country}, but I need an item as well. Try asking: “Can I bring protein powder to ${country}?”`;
    return 'I could not find an exact rule yet. Try asking with an item, airline or destination, such as “power bank on Emirates” or “protein powder to Japan”.';
  }

  const context = [airline ? `with ${airline}` : '', country ? `to ${country}` : ''].filter(Boolean).join(' ');
  return `${bestRule.shortAnswer}${context ? ` This looks most relevant ${context}.` : ''} Always verify the latest airline, airport security and destination guidance before travelling.`;
}

function buildChecklist(bestRule: Rule | null, airline?: string, country?: string) {
  const base = [
    'Check the latest airline baggage policy before flying.',
    'Keep important or restricted items easy to remove at airport security.',
    'Use the full rule page for cabin, checked baggage and customs notes.',
  ];

  const ruleTips = bestRule ? [...bestRule.restrictions.slice(0, 3), ...bestRule.tips.slice(0, 2)] : [];
  const contextual = [
    airline ? `Confirm the rule with ${airline} before travelling.` : '',
    country ? `Check destination customs guidance for ${country}.` : '',
  ].filter(Boolean);

  return [...ruleTips, ...contextual, ...base].slice(0, 7);
}

function buildWarnings(bestRule: Rule | null, country?: string) {
  const warnings = [];
  if (bestRule?.warning) warnings.push(bestRule.warning);
  if (bestRule?.cabin === 'Restricted') warnings.push('Cabin baggage may need extra screening or limits.');
  if (bestRule?.checked === 'Not allowed') warnings.push('Do not pack this item in checked baggage unless the official rule clearly allows it.');
  if (country) warnings.push(`Destination customs rules for ${country} can be stricter than airline baggage rules.`);
  return warnings.slice(0, 4);
}

export function getTravelAgentAnswer(query: string): TravelAgentAnswer {
  const trimmed = query.trim();
  const airline = findAirline(trimmed);
  const country = findCountry(trimmed);
  const matchedRules = pickRules(trimmed, airline, country);
  const bestRule = matchedRules[0] || null;

  const entities: TravelAgentEntity[] = [];
  if (airline) entities.push({ label: airline, type: 'airline', href: `/airlines/${airlineSlug(airline)}/` });
  if (country) entities.push({ label: country, type: 'country', href: `/countries/${countrySlug(country)}/` });
  if (bestRule) entities.push({ label: bestRule.category, type: 'category', href: `/categories/${normalise(bestRule.category).replace(/\s+/g, '-')}/` });

  const nextLinks = [
    bestRule ? { label: `Open ${bestRule.item}`, href: `/rules/${bestRule.slug}/` } : null,
    airline ? { label: `${airline} rules`, href: `/airlines/${airlineSlug(airline)}/` } : null,
    country ? { label: `${country} travel rules`, href: `/countries/${countrySlug(country)}/` } : null,
    { label: 'Search more rules', href: `/search?q=${encodeURIComponent(trimmed)}` },
  ].filter(Boolean) as { label: string; href: string }[];

  const mode: TravelAgentAnswer['mode'] = bestRule ? 'rule' : airline ? 'airline' : country ? 'country' : 'general';

  return {
    mode,
    summary: buildSummary(bestRule, airline, country),
    bestRule,
    matchedRules,
    entities,
    checklist: buildChecklist(bestRule, airline, country),
    warnings: buildWarnings(bestRule, country),
    nextLinks,
  };
}
