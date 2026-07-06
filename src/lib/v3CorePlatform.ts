import { airlines, countries, rules } from '@/data/rules';

export type V3GuideCard = {
  title: string;
  href: string;
  label: string;
  description: string;
};

export function v3Slug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getV3PlatformStats() {
  return [
    { label: 'Travel rules', value: rules.length.toString() },
    { label: 'Airlines', value: airlines.length.toString() },
    { label: 'Countries', value: countries.length.toString() },
    { label: 'Categories', value: Array.from(new Set(rules.map((rule) => rule.category))).length.toString() },
  ];
}

export function getV3CoreRoutes(): V3GuideCard[] {
  return [
    { title: 'Search travel rules', href: '/search/', label: 'Core', description: 'Main travel rule search experience.' },
    { title: 'AI Travel Brain', href: '/v2-travel-brain/', label: 'AI', description: 'Ask one complete trip question.' },
    { title: 'Before You Fly', href: '/before-you-fly/', label: 'Dashboard', description: 'Public pre-travel command centre.' },
    { title: 'Packing Planner', href: '/packing-planner/', label: 'Checklist', description: 'Generate a simple packing checklist.' },
    { title: 'Airline Hubs', href: '/airline-hub/', label: 'Airlines', description: 'Browse rules by airline.' },
    { title: 'Country Hubs', href: '/country-hub/', label: 'Countries', description: 'Browse rules by destination.' },
    { title: 'Destination Intelligence', href: '/destination-intelligence/', label: 'Destinations', description: 'Travel preparation, hotel ideas and rule links.' },
    { title: 'Travel Essentials', href: '/travel-essentials/', label: 'Revenue', description: 'Useful product and preparation ideas.' },
  ];
}

export function getTop5GuideIdeas(destination = 'Tokyo'): V3GuideCard[] {
  return [
    { title: `Top 5 affordable hotels in ${destination}`, href: `/search/?q=${encodeURIComponent(`top 5 affordable hotels in ${destination}`)}`, label: 'Hotels', description: 'Budget-friendly stay ideas for trip planning.' },
    { title: `Top 5 family hotels in ${destination}`, href: `/search/?q=${encodeURIComponent(`top 5 family hotels in ${destination}`)}`, label: 'Hotels', description: 'Family-friendly stay ideas for travellers.' },
    { title: `Top 5 airport hotels near ${destination}`, href: `/search/?q=${encodeURIComponent(`top 5 airport hotels near ${destination}`)}`, label: 'Hotels', description: 'Useful for stopovers and early flights.' },
    { title: `Top 5 restaurants in ${destination}`, href: `/search/?q=${encodeURIComponent(`top 5 restaurants in ${destination}`)}`, label: 'Restaurants', description: 'Food content ideas for destination authority.' },
    { title: `Top 5 attractions in ${destination}`, href: `/search/?q=${encodeURIComponent(`top 5 attractions in ${destination}`)}`, label: 'Attractions', description: 'Trip inspiration content for visitors.' },
    { title: `Top 5 things to pack for ${destination}`, href: '/packing-planner/', label: 'Packing', description: 'Packing guide angle connected to travel rules.' },
  ];
}

export function getV3DestinationSeeds(limit = 24): V3GuideCard[] {
  return countries.slice(0, 8).flatMap((country) => {
    const destination = country === 'Japan' ? 'Tokyo' : country === 'USA' ? 'New York' : country;
    return getTop5GuideIdeas(destination).map((guide) => ({
      ...guide,
      description: `${guide.description} Destination: ${country}.`,
    }));
  }).slice(0, limit);
}

export function getV3RuleExpansionSeeds(limit = 24): V3GuideCard[] {
  const topRules = rules.slice(0, 8);
  const topAirlines = airlines.slice(0, 4);
  const topCountries = countries.slice(0, 4);

  const airlineSeeds = topRules.flatMap((rule) =>
    topAirlines.map((airline) => {
      const query = `${rule.item} on ${airline}`;
      return { title: query, href: `/search/?q=${encodeURIComponent(query)}`, label: 'Airline rule', description: `High-intent travel rule idea for ${airline}.` };
    })
  );

  const countrySeeds = topRules.flatMap((rule) =>
    topCountries.map((country) => {
      const query = `${rule.item} to ${country}`;
      return { title: query, href: `/search/?q=${encodeURIComponent(query)}`, label: 'Country rule', description: `High-intent destination rule idea for ${country}.` };
    })
  );

  return [...airlineSeeds, ...countrySeeds].slice(0, limit);
}

export function getV3NextBuildQueue(): V3GuideCard[] {
  return [
    { title: 'Official-source layer', href: '/v3-core/', label: 'Trust', description: 'Standardise official source references across major pages.' },
    { title: 'Guide template system', href: '/top-5-guides/', label: 'Content', description: 'Reusable template for Top 5 hotels, attractions and restaurants.' },
    { title: 'Public homepage repositioning', href: '/v3-core/', label: 'Brand', description: 'Use headline: Search travel rules for any item, airline or country.' },
    { title: 'Flight dashboard placeholder', href: '/before-you-fly/', label: 'Future', description: 'Reserve future space for flight status in travel preparation.' },
    { title: 'AI marketing engine', href: '/ai-marketing-seeds/', label: 'Marketing', description: 'Keep marketing seeds separate from public product development.' },
    { title: 'Affiliate guide system', href: '/travel-essentials/', label: 'Revenue', description: 'Add hotel/eSIM/insurance recommendations only when useful.' },
  ];
}
