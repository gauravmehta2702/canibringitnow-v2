import { airlines, countries, rules } from '@/data/rules';
import { orbitAirports } from '@/lib/orbitEngine';
import { travelServices } from '@/data/travelServices';

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const slugify = (value: string) => normalise(value).replace(/\s+/g, '-');

export type JourneyIntent = {
  query: string;
  airline?: string;
  country?: string;
  airport?: { name: string; slug: string; code: string };
  item?: string;
  baggageIntent?: 'cabin' | 'checked';
  links: Array<{ href: string; title: string; description: string; type: string }>;
};

export function resolveJourneyIntent(query: string): JourneyIntent {
  const q = normalise(query);
  const airline = [...airlines].sort((a, b) => b.length - a.length).find((name) => q.includes(normalise(name)));
  const country = [...countries].sort((a, b) => b.length - a.length).find((name) => q.includes(normalise(name)));
  const airport = orbitAirports.find((entry) => q.includes(normalise(entry.name)) || q.split(' ').includes(entry.code.toLowerCase()));
  const baggageIntent = /checked|hold|suitcase/.test(q) ? 'checked' : /cabin|carry on|hand luggage/.test(q) ? 'cabin' : undefined;

  const bestRule = rules
    .map((rule) => {
      const haystack = normalise([rule.item, rule.category, ...rule.tags].join(' '));
      const score = q.split(' ').filter((token) => token.length > 2 && haystack.includes(token)).length;
      return { rule, score };
    })
    .sort((a, b) => b.score - a.score)[0];
  const item = bestRule?.score > 0 ? bestRule.rule.item.replace(/\s+(on|with|for)\s+.+$/i, '') : undefined;

  const links: JourneyIntent['links'] = [];
  if (airline) links.push({ href: `/airlines/${slugify(airline)}/`, title: `${airline} travel hub`, description: 'Baggage rules, practical checks and related travel guidance.', type: 'Airline' });
  if (airport) links.push({ href: `/airport-guides/${airport.slug}/`, title: `${airport.name} guide`, description: 'Security, transport, hotels, facilities and airport preparation.', type: 'Airport' });
  if (country) links.push({ href: `/countries/${slugify(country)}/`, title: `${country} destination hub`, description: 'Travel preparation, customs-related guidance and destination information.', type: 'Destination' });
  if (item) links.push({ href: `/item-guides/${slugify(item)}/`, title: `${item} travel guide`, description: 'Compare rules and related guidance across airlines and journeys.', type: 'Item' });

  travelServices.slice(0, 3).forEach((service) => links.push({ href: `/travel-services/${service.slug}/`, title: service.name, description: service.description, type: 'Travel service' }));

  return { query, airline, country, airport, item, baggageIntent, links: links.slice(0, 7) };
}
