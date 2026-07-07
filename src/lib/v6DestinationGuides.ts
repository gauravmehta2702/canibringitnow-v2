import { countries } from '@/data/rules';

export type DestinationGuide = {
  title: string;
  href: string;
  label: string;
  description: string;
};

export function guideSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function mainCity(country: string) {
  const map: Record<string, string> = {
    Japan: 'Tokyo',
    USA: 'New York',
    India: 'Mumbai',
    'United Arab Emirates': 'Dubai',
    France: 'Paris',
    Germany: 'Berlin',
    Canada: 'Toronto',
    Australia: 'Sydney',
    Thailand: 'Bangkok',
    Singapore: 'Singapore',
  };
  return map[country] || country;
}

export function getDestinationGuideIdeas(country: string): DestinationGuide[] {
  const city = mainCity(country);
  return [
    { title: `Top 5 affordable hotels in ${city}`, href: `/search/?q=${encodeURIComponent(`top 5 affordable hotels in ${city}`)}`, label: 'Budget hotels', description: 'Editorial hotel guide idea for budget travellers.' },
    { title: `Top 5 family hotels in ${city}`, href: `/search/?q=${encodeURIComponent(`top 5 family hotels in ${city}`)}`, label: 'Family hotels', description: 'Editorial hotel guide idea for family travellers.' },
    { title: `Top 5 luxury hotels in ${city}`, href: `/search/?q=${encodeURIComponent(`top 5 luxury hotels in ${city}`)}`, label: 'Luxury hotels', description: 'Editorial hotel guide idea for premium travellers.' },
    { title: `Top 5 airport hotels near ${city}`, href: `/search/?q=${encodeURIComponent(`top 5 airport hotels near ${city}`)}`, label: 'Airport hotels', description: 'Useful for late arrivals and early departures.' },
    { title: `Top 5 restaurants in ${city}`, href: `/search/?q=${encodeURIComponent(`top 5 restaurants in ${city}`)}`, label: 'Restaurants', description: 'Food guide idea to expand destination authority.' },
    { title: `Top 5 attractions in ${city}`, href: `/search/?q=${encodeURIComponent(`top 5 attractions in ${city}`)}`, label: 'Attractions', description: 'Trip inspiration guide idea.' },
  ];
}

export function getDestinationGuideCountries(limit = 12) {
  return countries.slice(0, limit).map((country) => ({
    country,
    slug: guideSlug(country),
    city: mainCity(country),
    guides: getDestinationGuideIdeas(country),
  }));
}
