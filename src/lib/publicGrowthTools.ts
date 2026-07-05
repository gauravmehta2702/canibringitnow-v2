import { airlines, countries, rules } from '@/data/rules';

export type ToolCard = {
  title: string;
  href: string;
  label: string;
  description: string;
};

export function publicToolSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getPublicTravelTools(): ToolCard[] {
  return [
    {
      title: 'AI Travel Brain',
      href: '/v2-travel-brain/',
      label: 'AI assistant',
      description: 'Ask one complete travel question and get connected travel-rule guidance.',
    },
    {
      title: 'Smart Packing Planner',
      href: '/packing-planner/',
      label: 'Checklist',
      description: 'Create a simple packing checklist for your airline, destination and trip length.',
    },
    {
      title: 'Airline Rule Hubs',
      href: '/airline-hub/',
      label: 'Airlines',
      description: 'Browse baggage and item rules by airline.',
    },
    {
      title: 'Country Rule Hubs',
      href: '/country-hub/',
      label: 'Countries',
      description: 'Browse destination and customs-style checks by country.',
    },
    {
      title: 'Category Rule Hubs',
      href: '/category-hub/',
      label: 'Categories',
      description: 'Browse travel rules by item type such as batteries, medication, liquids and food.',
    },
    {
      title: 'Travel Essentials',
      href: '/travel-essentials/',
      label: 'Preparation',
      description: 'Find useful preparation items after checking the rule first.',
    },
  ];
}

export function getBeforeYouFlySearches(): ToolCard[] {
  const topRules = rules.slice(0, 8);
  return topRules.map((rule) => ({
    title: rule.item,
    href: `/rules/${rule.slug}/`,
    label: rule.category,
    description: rule.shortAnswer,
  }));
}

export function getPopularTripCombos(limit = 24): ToolCard[] {
  const topItems = rules.slice(0, 6);
  const topAirlines = airlines.slice(0, 4);
  const topCountries = countries.slice(0, 4);

  const airlineCombos = topItems.flatMap((rule) =>
    topAirlines.map((airline) => {
      const q = `${rule.item} on ${airline}`;
      return {
        title: q,
        href: `/search/?q=${encodeURIComponent(q)}`,
        label: 'Airline check',
        description: `Check ${rule.item.toLowerCase()} guidance for ${airline}.`,
      };
    }),
  );

  const countryCombos = topItems.flatMap((rule) =>
    topCountries.map((country) => {
      const q = `${rule.item} to ${country}`;
      return {
        title: q,
        href: `/search/?q=${encodeURIComponent(q)}`,
        label: 'Destination check',
        description: `Check ${rule.item.toLowerCase()} guidance for ${country}.`,
      };
    }),
  );

  return [...airlineCombos, ...countryCombos].slice(0, limit);
}

export function getFlightDashboardPlaceholderCards(): ToolCard[] {
  return [
    {
      title: 'Flight status',
      href: '/before-you-fly/',
      label: 'Future tool',
      description: 'Planned future feature: flight number, terminal, gate and delay context.',
    },
    {
      title: 'Airport preparation',
      href: '/before-you-fly/',
      label: 'Future tool',
      description: 'Planned future feature: security reminders, baggage checks and airport guidance.',
    },
    {
      title: 'Destination readiness',
      href: '/before-you-fly/',
      label: 'Future tool',
      description: 'Planned future feature: weather, plug type, currency and customs reminders.',
    },
  ];
}
