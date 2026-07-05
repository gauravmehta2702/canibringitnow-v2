import { airlines, countries, rules } from '@/data/rules';
import { smartSearch } from '@/lib/smartSearch';

export function slugifyBrain(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function includesLoose(text: string, value: string) {
  return text.toLowerCase().includes(value.toLowerCase());
}

export function analyseTripQuery(query: string) {
  const clean = query.trim();
  const lower = clean.toLowerCase();

  const detectedAirlines = airlines.filter((airline) => includesLoose(lower, airline)).slice(0, 3);
  const detectedCountries = countries.filter((country) => includesLoose(lower, country)).slice(0, 3);
  const matchedRules = smartSearch(clean, 10);

  const confidence = Math.min(98, Math.max(45, 50 + matchedRules.length * 5 + detectedAirlines.length * 8 + detectedCountries.length * 8));

  const summary = matchedRules.length
    ? `I found ${matchedRules.length} relevant travel checks. Review the matched pages, then confirm important restrictions with your airline, airport or destination authority.`
    : 'I could not find a strong match yet. Try adding the item, airline and destination.';

  const checklist = [
    'Check cabin baggage rules for batteries, liquids and electronics.',
    'Check checked baggage rules for restricted or fragile items.',
    'Check destination customs rules if crossing a border.',
    'Carry prescription or medical documents for medication and devices.',
    'Keep important items easy to access for airport security.',
    'Confirm airline rules before travel because staff can make the final decision.',
  ];

  const nextActions = [
    ...detectedAirlines.map((airline) => ({
      title: `${airline} travel rules`,
      href: `/airlines/${slugifyBrain(airline)}/`,
      description: `Open the ${airline} airline hub.`,
    })),
    ...detectedCountries.map((country) => ({
      title: `${country} destination rules`,
      href: `/countries/${slugifyBrain(country)}/`,
      description: `Open the ${country} country hub.`,
    })),
    { title: 'Search all rules', href: `/search/?q=${encodeURIComponent(clean)}`, description: 'Open full search results.' },
    { title: 'Travel essentials', href: '/travel-essentials/', description: 'View useful travel preparation items.' },
  ].slice(0, 8);

  return { query: clean, confidence, summary, detectedAirlines, detectedCountries, matchedRules, checklist, nextActions };
}
