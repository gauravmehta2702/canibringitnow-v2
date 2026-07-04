import { airlines, rules } from '@/data/rules';

export function airlineSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getAirlines() {
  return airlines.map((airline) => {
    const matchingRules = rules.filter((rule) => {
      const text = [rule.item, rule.category, rule.shortAnswer, ...rule.tags].join(' ').toLowerCase();
      return text.includes(airline.toLowerCase());
    });

    return {
      name: airline,
      slug: airlineSlug(airline),
      rules: matchingRules.length ? matchingRules : rules.slice(0, 8),
      description: `${airline} travel guidance for cabin baggage, checked baggage, electronics, liquids, medication, baby travel and restricted items.`,
    };
  });
}

export function getAirlineBySlug(slug: string) {
  return getAirlines().find((airline) => airline.slug === slug);
}
