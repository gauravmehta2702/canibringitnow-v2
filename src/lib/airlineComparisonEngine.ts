import type { Rule, RuleStatus } from '@/data/rules';
import { getItems, getItemBySlug } from '@/lib/itemUtils';

export type AirlineComparisonRow = {
  airline: string;
  airlineSlug: string;
  rule: Rule;
};

const AIRLINE_PATTERN = /\s+on\s+(.+)$/i;

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function extractAirline(rule: Rule) {
  const match = rule.item.match(AIRLINE_PATTERN);
  if (!match) return null;
  const airline = match[1].trim();
  return { airline, airlineSlug: slugify(airline) };
}

export function getAirlineComparisonRows(itemSlug: string): AirlineComparisonRow[] {
  const item = getItemBySlug(itemSlug);
  if (!item) return [];

  return item.rules
    .map((rule) => {
      const airline = extractAirline(rule);
      return airline ? { ...airline, rule } : null;
    })
    .filter((row): row is AirlineComparisonRow => Boolean(row))
    .sort((a, b) => a.airline.localeCompare(b.airline));
}

export function getComparableItems(minAirlines = 2) {
  return getItems()
    .map((item) => ({ ...item, comparisonCount: getAirlineComparisonRows(item.slug).length }))
    .filter((item) => item.comparisonCount >= minAirlines)
    .sort((a, b) => b.comparisonCount - a.comparisonCount || a.name.localeCompare(b.name));
}

export function summariseStatus(rows: AirlineComparisonRow[], key: 'cabin' | 'checked') {
  const counts: Record<RuleStatus, number> = { Allowed: 0, Restricted: 0, 'Not allowed': 0 };
  rows.forEach(({ rule }) => { counts[rule[key]] += 1; });
  return counts;
}

export function buildComparisonFaqs(itemName: string, rows: AirlineComparisonRow[]) {
  const cabin = summariseStatus(rows, 'cabin');
  const checked = summariseStatus(rows, 'checked');
  return [
    {
      question: `Can I take ${itemName.toLowerCase()} in cabin baggage?`,
      answer: `${cabin.Allowed} of the compared airline guides show cabin baggage as allowed, ${cabin.Restricted} as restricted and ${cabin['Not allowed']} as not allowed. Always confirm the latest policy directly with your airline.`,
    },
    {
      question: `Can I put ${itemName.toLowerCase()} in checked baggage?`,
      answer: `${checked.Allowed} of the compared airline guides show checked baggage as allowed, ${checked.Restricted} as restricted and ${checked['Not allowed']} as not allowed.`,
    },
    {
      question: 'Why can airline rules differ?',
      answer: 'Airlines may apply different operational limits, aircraft safety procedures and approval requirements. Airport security and destination rules can also add separate restrictions.',
    },
  ];
}
