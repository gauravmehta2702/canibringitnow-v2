import { airlines, countries, rules } from '@/data/rules';

export type AuthorityLink = {
  title: string;
  href: string;
  label: string;
};

export const airports = [
  { name: 'London Heathrow', slug: 'london-heathrow', country: 'United Kingdom' },
  { name: 'London Gatwick', slug: 'london-gatwick', country: 'United Kingdom' },
  { name: 'Manchester Airport', slug: 'manchester-airport', country: 'United Kingdom' },
  { name: 'Dubai International', slug: 'dubai-international', country: 'United Arab Emirates' },
  { name: 'Doha Hamad', slug: 'doha-hamad', country: 'Qatar' },
  { name: 'Singapore Changi', slug: 'singapore-changi', country: 'Singapore' },
  { name: 'Tokyo Haneda', slug: 'tokyo-haneda', country: 'Japan' },
  { name: 'Tokyo Narita', slug: 'tokyo-narita', country: 'Japan' },
  { name: 'New York JFK', slug: 'new-york-jfk', country: 'USA' },
  { name: 'Delhi Airport', slug: 'delhi-airport', country: 'India' },
  { name: 'Mumbai Airport', slug: 'mumbai-airport', country: 'India' },
  { name: 'Toronto Pearson', slug: 'toronto-pearson', country: 'Canada' },
];

export function slugifyAuthority(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getAuthorityAirlines(limit = 12): AuthorityLink[] {
  return airlines.slice(0, limit).map((airline) => ({
    title: airline,
    href: `/airlines/${slugifyAuthority(airline)}/`,
    label: 'Airline guide',
  }));
}

export function getAuthorityCountries(limit = 12): AuthorityLink[] {
  return countries.slice(0, limit).map((country) => ({
    title: country,
    href: `/countries/${slugifyAuthority(country)}/`,
    label: 'Destination guide',
  }));
}

export function getAuthorityAirports(limit = 12): AuthorityLink[] {
  return airports.slice(0, limit).map((airport) => ({
    title: airport.name,
    href: `/search/?q=${encodeURIComponent(airport.name + ' airport security')}`,
    label: airport.country,
  }));
}

export function getSimilarItemLinks(currentSlug?: string, limit = 12): AuthorityLink[] {
  const current = rules.find((rule) => rule.slug === currentSlug);

  const sameCategory = current
    ? rules.filter((rule) => rule.slug !== current.slug && rule.category === current.category)
    : [];

  const fallback = rules.filter((rule) => rule.slug !== currentSlug);
  const combined = [...sameCategory, ...fallback];
  const unique = Array.from(new Map(combined.map((rule) => [rule.slug, rule])).values());

  return unique.slice(0, limit).map((rule) => ({
    title: rule.item,
    href: `/rules/${rule.slug}/`,
    label: rule.category,
  }));
}

export function getDestinationRuleLinks(limit = 12): AuthorityLink[] {
  return rules
    .filter((rule) => /japan|usa|india|australia|canada|uae|singapore/i.test(rule.slug))
    .slice(0, limit)
    .map((rule) => ({
      title: rule.item,
      href: `/rules/${rule.slug}/`,
      label: rule.category,
    }));
}

export function getAirlineRuleLinks(limit = 12): AuthorityLink[] {
  return rules
    .filter((rule) => /ryanair|emirates|qatar|british-airways|virgin-atlantic|lufthansa/i.test(rule.slug))
    .slice(0, limit)
    .map((rule) => ({
      title: rule.item,
      href: `/rules/${rule.slug}/`,
      label: rule.category,
    }));
}

export function getRelatedSearchTerms(currentItem?: string) {
  const item = currentItem || 'travel items';
  return [
    `Can I bring ${item.toLowerCase()} in cabin baggage?`,
    `Can I pack ${item.toLowerCase()} in checked luggage?`,
    `Do airlines allow ${item.toLowerCase()}?`,
    `Do customs rules apply to ${item.toLowerCase()}?`,
    `Can airport security stop ${item.toLowerCase()}?`,
    `What happens if ${item.toLowerCase()} is not allowed?`,
    'Power bank airline rules',
    'Medication airport security rules',
    'Baby formula through airport security',
    'Protein powder customs rules',
  ];
}
