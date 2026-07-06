import { countries, rules } from '@/data/rules';

export type DestinationGuideCard = {
  title: string;
  href: string;
  label: string;
  description: string;
};

export function destinationSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const cityMap: Record<string, string[]> = {
  Japan: ['Tokyo', 'Osaka', 'Kyoto'],
  USA: ['New York', 'Orlando', 'Los Angeles'],
  India: ['Mumbai', 'Delhi', 'Goa'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane'],
  'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah'],
  Singapore: ['Singapore City', 'Marina Bay', 'Changi'],
  Thailand: ['Bangkok', 'Phuket', 'Krabi'],
  France: ['Paris', 'Nice', 'Lyon'],
  Germany: ['Berlin', 'Munich', 'Frankfurt'],
};

export function getDestinationCities(country: string) {
  return cityMap[country] || [country, `${country} capital`, `${country} airport area`];
}

export function getHotelGuideCards(country: string): DestinationGuideCard[] {
  const cities = getDestinationCities(country);
  return [
    { title: `Top 5 affordable hotels in ${cities[0]}`, href: `/search/?q=${encodeURIComponent(`top 5 affordable hotels in ${cities[0]}`)}`, label: 'Budget hotels', description: `Useful for travellers looking for cheaper stays in ${cities[0]}.` },
    { title: `Top 5 family hotels in ${cities[0]}`, href: `/search/?q=${encodeURIComponent(`top 5 family hotels in ${cities[0]}`)}`, label: 'Family hotels', description: `Good for families planning a comfortable stay in ${cities[0]}.` },
    { title: `Top 5 luxury hotels in ${cities[0]}`, href: `/search/?q=${encodeURIComponent(`top 5 luxury hotels in ${cities[0]}`)}`, label: 'Luxury hotels', description: `Premium hotel inspiration for travellers visiting ${cities[0]}.` },
    { title: `Top 5 airport hotels near ${cities[0]}`, href: `/search/?q=${encodeURIComponent(`top 5 airport hotels near ${cities[0]}`)}`, label: 'Airport hotels', description: 'Helpful for late arrivals, early departures and short stopovers.' },
    { title: `Top 5 areas to stay in ${cities[0]}`, href: `/search/?q=${encodeURIComponent(`top 5 areas to stay in ${cities[0]}`)}`, label: 'Where to stay', description: 'Helps travellers choose the right neighbourhood before booking.' },
  ];
}

export function getDestinationRuleLinks(country: string): DestinationGuideCard[] {
  const slug = destinationSlug(country);
  const exact = rules.filter((rule) => rule.slug.includes(slug)).slice(0, 8);
  const fallback = rules.slice(0, 8);
  return (exact.length ? exact : fallback).map((rule) => ({
    title: rule.item,
    href: `/rules/${rule.slug}/`,
    label: rule.category,
    description: rule.shortAnswer,
  }));
}

export function getPreparationLinks(country: string): DestinationGuideCard[] {
  return [
    { title: `${country} packing checklist`, href: '/packing-planner/', label: 'Packing', description: `Build a packing checklist before travelling to ${country}.` },
    { title: `${country} customs questions`, href: `/search/?q=${encodeURIComponent(`customs rules ${country}`)}`, label: 'Customs', description: `Search customs-style questions for ${country}.` },
    { title: `${country} medication travel rules`, href: `/search/?q=${encodeURIComponent(`medication to ${country}`)}`, label: 'Medication', description: `Check medicine and prescription travel preparation for ${country}.` },
    { title: `${country} power bank rules`, href: `/search/?q=${encodeURIComponent(`power bank to ${country}`)}`, label: 'Batteries', description: 'Check battery and electronics guidance before travel.' },
    { title: `Ask AI about travelling to ${country}`, href: '/v2-travel-brain/', label: 'AI assistant', description: `Ask one complete travel question for ${country}.` },
  ];
}

export function getDestinationProfile(country: string) {
  return {
    country,
    slug: destinationSlug(country),
    headline: `${country} travel preparation guide`,
    intro: `Plan what to pack, what to check, and where to stay before travelling to ${country}.`,
    hotelGuides: getHotelGuideCards(country),
    travelRuleLinks: getDestinationRuleLinks(country),
    preparationLinks: getPreparationLinks(country),
  };
}

export function getTopDestinationProfiles(limit = 12) {
  return countries.slice(0, limit).map(getDestinationProfile);
}
