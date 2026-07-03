import { smartSearch } from '@/lib/smartSearch';
import { getAirlines } from '@/lib/airlineUtils';
import { getCountries } from '@/lib/countryUtils';
import { findItemHubs } from '@/lib/itemUtils';

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function getTravelAgentAnswer(query: string) {
  const q = normalise(query);
  const rules = smartSearch(query, 6);
  const airline = getAirlines().find((item) => q.includes(item.name.toLowerCase()));
  const country = getCountries().find((item) => q.includes(item.name.toLowerCase()));
  const items = findItemHubs(query, 4);
  const bestRule = rules[0];

  return {
    query,
    bestRule,
    rules,
    airline,
    country,
    items,
    summary: bestRule
      ? `${bestRule.item}: ${bestRule.shortAnswer}`
      : 'No exact rule matched yet. Try a simpler item name, airline, country or travel product.',
    checklist: [
      airline ? `Check ${airline.name} baggage policy before flying.` : 'Check your airline baggage policy before flying.',
      country ? `Check ${country.name} customs rules for food, medicine and restricted items.` : 'Check destination customs rules for food, medicine and restricted items.',
      'Keep important medication, documents, valuables and lithium batteries in cabin baggage where appropriate.',
      'Use official airline, airport and government sources before travelling.',
    ],
  };
}
