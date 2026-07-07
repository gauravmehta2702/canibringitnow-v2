import { airlines, countries, rules } from '@/data/rules';

export type TripPlannerInput = {
  from: string;
  to: string;
  airline: string;
  days: number;
  travellers: string;
  items: string;
};

export type TripAction = {
  title: string;
  href: string;
  label: string;
  description: string;
};

export function tripSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function containsLoose(text: string, value: string) {
  return text.toLowerCase().includes(value.toLowerCase());
}

export function findTripMatches(input: TripPlannerInput) {
  const haystack = `${input.from} ${input.to} ${input.airline} ${input.items} ${input.travellers}`.toLowerCase();
  const detectedAirline = airlines.find((airline) => containsLoose(haystack, airline)) || input.airline;
  const detectedCountry = countries.find((country) => containsLoose(haystack, country) || containsLoose(input.to, country)) || input.to;

  const words = haystack.split(/[^a-z0-9]+/).filter((word) => word.length > 2);
  const matchedRules = rules
    .map((rule) => {
      const ruleText = `${rule.item} ${rule.category} ${rule.shortAnswer} ${rule.slug}`.toLowerCase();
      const score = words.reduce((total, word) => total + (ruleText.includes(word) ? 1 : 0), 0);
      return { rule, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((item) => item.rule);

  return { detectedAirline, detectedCountry, matchedRules };
}

export function generateTripPlan(input: TripPlannerInput) {
  const { detectedAirline, detectedCountry, matchedRules } = findTripMatches(input);

  const checklist = [
    'Check passport validity and travel documents.',
    'Check airline cabin and checked baggage rules.',
    'Check destination customs rules before packing food, medication or electronics.',
    'Keep medication, power banks and important documents in cabin baggage unless rules say otherwise.',
    'Review liquid limits and airport security rules before leaving home.',
    'Create a small arrival plan: transport, hotel area, eSIM, currency and emergency contacts.',
  ];

  const timeline = [
    {
      when: '30 days before travel',
      tasks: ['Check passport/visa requirements', 'Book hotel or airport stay', 'Check medication documents', 'Buy travel insurance'],
    },
    {
      when: '7 days before travel',
      tasks: ['Review baggage allowance', 'Check weather and packing list', 'Prepare travel adapters and power banks', 'Confirm airport transfer'],
    },
    {
      when: '24 hours before travel',
      tasks: ['Check in online', 'Charge devices', 'Pack liquids correctly', 'Keep documents and medication accessible'],
    },
    {
      when: 'At the airport',
      tasks: ['Keep laptop and liquids ready', 'Keep power banks in cabin bag', 'Follow airline staff instructions', 'Check gate and boarding updates'],
    },
  ];

  const actions: TripAction[] = [
    {
      title: 'Open AI Travel Brain',
      href: '/v2-travel-brain/',
      label: 'AI',
      description: 'Ask a full natural-language travel question.',
    },
    {
      title: 'Search all travel rules',
      href: `/search/?q=${encodeURIComponent(`${input.items} ${detectedAirline} ${detectedCountry}`)}`,
      label: 'Search',
      description: 'Open search results for this trip.',
    },
    {
      title: `${detectedAirline} airline rules`,
      href: `/airlines/${tripSlug(detectedAirline)}/`,
      label: 'Airline',
      description: `Open the ${detectedAirline} airline hub.`,
    },
    {
      title: `${detectedCountry} destination guide`,
      href: `/destinations/${tripSlug(detectedCountry)}/`,
      label: 'Destination',
      description: `Open the ${detectedCountry} destination preparation page.`,
    },
    {
      title: 'Travel essentials',
      href: '/travel-essentials/',
      label: 'Revenue',
      description: 'View useful preparation items after checking the rules.',
    },
    {
      title: 'Before You Fly dashboard',
      href: '/before-you-fly/',
      label: 'Dashboard',
      description: 'Open the wider travel preparation hub.',
    },
  ];

  return {
    summary: `Trip plan for ${input.from || 'your departure'} to ${input.to || detectedCountry} with ${detectedAirline}.`,
    detectedAirline,
    detectedCountry,
    matchedRules,
    checklist,
    timeline,
    actions,
  };
}

export function getTravelDashboardModules(): TripAction[] {
  return [
    { title: 'Trip Planner', href: '/trip-planner/', label: 'Live now', description: 'Build a basic trip checklist from airline, destination and items.' },
    { title: 'Travel Intelligence', href: '/travel-intelligence/', label: 'Live now', description: 'Connect one travel question to rules, related questions and next actions.' },
    { title: 'AI Travel Brain', href: '/v2-travel-brain/', label: 'Live now', description: 'Ask complete natural-language travel questions.' },
    { title: 'Packing Planner', href: '/packing-planner/', label: 'Live now', description: 'Generate a simple packing checklist.' },
    { title: 'Destination Guides', href: '/destination-guides/', label: 'Live now', description: 'Browse hotel, restaurant and attraction guide ideas.' },
    { title: 'Flight Status', href: '/travel-dashboard/', label: 'Future upgrade', description: 'Planned future module for flight status, terminal, gate and delay context.' },
  ];
}
