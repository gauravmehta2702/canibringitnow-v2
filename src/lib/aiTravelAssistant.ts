import { airlines, countries, rules } from '@/data/rules';
import { smartSearch } from '@/lib/smartSearch';

export type TravelAssistantEntity = {
  type: 'item' | 'airline' | 'country';
  label: string;
  href: string;
};

export type TravelAssistantAnswer = {
  query: string;
  confidence: number;
  summary: string;
  entities: TravelAssistantEntity[];
  matchedRules: typeof rules;
  checklist: string[];
  warnings: string[];
  relatedQuestions: string[];
};

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function includesLoose(text: string, value: string) {
  return text.toLowerCase().includes(value.toLowerCase());
}

export function analyseTravelQuestion(query: string): TravelAssistantAnswer {
  const cleanQuery = query.trim();
  const lower = cleanQuery.toLowerCase();

  const detectedAirlines = airlines
    .filter((airline) => includesLoose(lower, airline))
    .slice(0, 3)
    .map((airline) => ({
      type: 'airline' as const,
      label: airline,
      href: `/airlines/${slugify(airline)}/`,
    }));

  const detectedCountries = countries
    .filter((country) => includesLoose(lower, country))
    .slice(0, 3)
    .map((country) => ({
      type: 'country' as const,
      label: country,
      href: `/countries/${slugify(country)}/`,
    }));

  const matchedRules = smartSearch(cleanQuery, 8);

  const itemEntities = matchedRules.slice(0, 4).map((rule) => ({
    type: 'item' as const,
    label: rule.item,
    href: `/rules/${rule.slug}/`,
  }));

  const entities = [...detectedAirlines, ...detectedCountries, ...itemEntities];

  const allowedCount = matchedRules.filter((rule) => rule.cabin === 'Allowed' || rule.checked === 'Allowed').length;
  const notAllowedCount = matchedRules.filter((rule) => rule.cabin === 'Not allowed' || rule.checked === 'Not allowed').length;
  const restrictedCount = matchedRules.filter((rule) => rule.cabin === 'Restricted' || rule.checked === 'Restricted').length;

  const confidence = Math.min(98, Math.max(45, 55 + matchedRules.length * 6 + detectedAirlines.length * 8 + detectedCountries.length * 8));

  const summary =
    matchedRules.length > 0
      ? `I found ${matchedRules.length} relevant travel rule${matchedRules.length === 1 ? '' : 's'} for your question. ${allowedCount} appear generally allowed in at least one baggage type, ${restrictedCount} may need extra checks, and ${notAllowedCount} include at least one not-allowed baggage condition.`
      : 'I could not find an exact rule yet. Try adding the item name, airline, or destination, for example: power bank on Emirates to Japan.';

  const checklist = [
    'Check whether the item should go in cabin baggage or checked baggage.',
    'Keep restricted items easy to access for airport security.',
    'Confirm airline-specific limits before flying.',
    'Check destination customs rules if travelling internationally.',
    'Carry supporting documents for medication, medical devices or special equipment.',
  ];

  const warnings = [
    ...matchedRules.filter((rule) => rule.warning).slice(0, 3).map((rule) => `${rule.item}: ${rule.warning}`),
    'Airport security and airline staff can make the final decision at the airport.',
  ];

  const topItem = matchedRules[0]?.item || 'this item';
  const relatedQuestions = [
    `Can I bring ${topItem.toLowerCase()} in cabin baggage?`,
    `Can I pack ${topItem.toLowerCase()} in checked luggage?`,
    `Do I need to declare ${topItem.toLowerCase()} at customs?`,
    `Which airlines allow ${topItem.toLowerCase()}?`,
    `What should I do if airport security questions ${topItem.toLowerCase()}?`,
  ];

  return {
    query: cleanQuery,
    confidence,
    summary,
    entities,
    matchedRules,
    checklist,
    warnings,
    relatedQuestions,
  };
}
