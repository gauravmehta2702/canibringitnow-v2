import { airlines, countries, rules, type Rule } from '@/data/rules';
import { smartSearch } from '@/lib/smartSearch';

export type TravelIntelligenceInput = {
  query: string;
  airline?: string;
  country?: string;
};

export type TravelIntelligenceLink = {
  title: string;
  href: string;
  label: string;
  description: string;
};

export type TravelTimelineStep = {
  when: string;
  title: string;
  tasks: string[];
};

export type TravelIntelligenceResult = {
  query: string;
  confidence: number;
  summary: string;
  detectedAirlines: string[];
  detectedCountries: string[];
  matchedRules: Rule[];
  relatedQuestions: TravelIntelligenceLink[];
  internalLinks: TravelIntelligenceLink[];
  timeline: TravelTimelineStep[];
};

export function intelligenceSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function includesLoose(text: string, value: string) {
  return text.toLowerCase().includes(value.toLowerCase());
}

function detectAirlines(text: string) {
  return airlines.filter((airline) => includesLoose(text, airline)).slice(0, 3);
}

function detectCountries(text: string) {
  return countries.filter((country) => includesLoose(text, country)).slice(0, 3);
}

function getPrimaryItem(rule?: Rule) {
  if (!rule) return 'travel item';
  return rule.item.replace(/ on .*/i, '').replace(/ in .*/i, '').replace(/ to .*/i, '').trim();
}

export function generateRelatedQuestions(rule?: Rule, airline?: string, country?: string): TravelIntelligenceLink[] {
  const item = getPrimaryItem(rule);
  const questions = [
    `Can I take ${item.toLowerCase()} in cabin baggage?`,
    `Can I put ${item.toLowerCase()} in checked luggage?`,
    airline ? `Can I take ${item.toLowerCase()} on ${airline}?` : `Which airlines allow ${item.toLowerCase()}?`,
    country ? `Can I take ${item.toLowerCase()} to ${country}?` : `Which countries restrict ${item.toLowerCase()}?`,
    `Do I need to declare ${item.toLowerCase()} at customs?`,
    `What happens if airport security stops ${item.toLowerCase()}?`,
  ];

  return questions.map((question) => ({
    title: question,
    href: `/search/?q=${encodeURIComponent(question)}`,
    label: 'Related question',
    description: 'Open a focused travel-rule search for this question.',
  }));
}

export function generateTravelTimeline(rule?: Rule, airline?: string, country?: string): TravelTimelineStep[] {
  const item = getPrimaryItem(rule);
  return [
    {
      when: '30 days before travel',
      title: 'Confirm important documents and restrictions',
      tasks: [
        'Check passport validity and entry requirements.',
        country ? `Check customs and destination rules for ${country}.` : 'Check destination customs rules.',
        'Review medication, baby items, batteries and restricted goods.',
      ],
    },
    {
      when: '7 days before travel',
      title: 'Prepare packing and airline checks',
      tasks: [
        airline ? `Confirm baggage rules with ${airline}.` : 'Confirm baggage rules with your airline.',
        `Decide whether ${item.toLowerCase()} should go in cabin or checked baggage.`,
        'Prepare travel documents, prescriptions and receipts if needed.',
      ],
    },
    {
      when: '24 hours before travel',
      title: 'Final airport security check',
      tasks: [
        'Keep documents, medication, electronics and liquids easy to access.',
        'Charge devices and check power banks are packed correctly.',
        'Check terminal, flight status and online check-in where available.',
      ],
    },
  ];
}

export function generateInternalLinks(rule?: Rule, airline?: string, country?: string): TravelIntelligenceLink[] {
  const links: TravelIntelligenceLink[] = [
    { title: 'Search another travel rule', href: '/search/', label: 'Search', description: 'Check another item, airline or country.' },
    { title: 'AI Travel Brain', href: '/v2-travel-brain/', label: 'AI assistant', description: 'Ask one complete travel question.' },
    { title: 'Packing Planner', href: '/packing-planner/', label: 'Checklist', description: 'Build a packing list before travelling.' },
    { title: 'Before You Fly', href: '/before-you-fly/', label: 'Dashboard', description: 'Open the pre-travel command centre.' },
    { title: 'Airline Hubs', href: '/airline-hub/', label: 'Airlines', description: 'Browse rule hubs by airline.' },
    { title: 'Country Hubs', href: '/country-hub/', label: 'Countries', description: 'Browse destination and customs-style hubs.' },
    { title: 'Destination Intelligence', href: '/destination-intelligence/', label: 'Destinations', description: 'Explore destination preparation and guide ideas.' },
  ];

  if (rule) {
    links.unshift({
      title: `More ${rule.category} checks`,
      href: `/categories/${intelligenceSlug(rule.category)}/`,
      label: 'Category',
      description: `Browse related ${rule.category.toLowerCase()} travel rules.`,
    });
  }

  if (airline) {
    links.unshift({
      title: `${airline} rule hub`,
      href: `/airlines/${intelligenceSlug(airline)}/`,
      label: 'Airline',
      description: `Open travel checks for ${airline}.`,
    });
  }

  if (country) {
    links.unshift({
      title: `${country} destination guide`,
      href: `/destinations/${intelligenceSlug(country)}/`,
      label: 'Destination',
      description: `Open travel preparation for ${country}.`,
    });
  }

  return links.slice(0, 10);
}

export function analyseTravelIntelligence(input: TravelIntelligenceInput): TravelIntelligenceResult {
  const query = [input.query, input.airline, input.country].filter(Boolean).join(' ').trim();
  const lower = query.toLowerCase();
  const detectedAirlines = [...new Set([...(input.airline ? [input.airline] : []), ...detectAirlines(lower)])].slice(0, 3);
  const detectedCountries = [...new Set([...(input.country ? [input.country] : []), ...detectCountries(lower)])].slice(0, 3);
  const matchedRules = smartSearch(query || 'power bank', 8);
  const primaryRule = matchedRules[0];
  const airline = detectedAirlines[0];
  const country = detectedCountries[0];
  const confidence = Math.min(98, Math.max(50, 55 + matchedRules.length * 5 + detectedAirlines.length * 7 + detectedCountries.length * 7));

  const summary = primaryRule
    ? `${primaryRule.shortAnswer} This travel intelligence view also connects the item to airline, destination, packing and related questions.`
    : 'Search an item, airline or destination to generate a connected travel preparation view.';

  return {
    query,
    confidence,
    summary,
    detectedAirlines,
    detectedCountries,
    matchedRules,
    relatedQuestions: generateRelatedQuestions(primaryRule, airline, country),
    internalLinks: generateInternalLinks(primaryRule, airline, country),
    timeline: generateTravelTimeline(primaryRule, airline, country),
  };
}
