import { rules, airlines, countries } from '@/data/rules';

export type SeoQuestion = {
  question: string;
  href: string;
};

export type SeoLink = {
  title: string;
  label: string;
  href: string;
};

function normalise(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getRelatedRules(slug?: string, limit = 8) {
  const current = rules.find((rule) => rule.slug === slug);
  if (!current) return rules.slice(0, limit);

  const sameCategory = rules.filter((rule) => rule.slug !== slug && rule.category === current.category);
  const sameItemWords = rules.filter((rule) => {
    if (rule.slug === slug) return false;
    const item = current.item.toLowerCase();
    return item.split(/\s+/).some((word) => word.length > 3 && rule.item.toLowerCase().includes(word));
  });

  const combined = [...sameCategory, ...sameItemWords, ...rules.filter((rule) => rule.slug !== slug)];
  const unique = Array.from(new Map(combined.map((rule) => [rule.slug, rule])).values());
  return unique.slice(0, limit);
}

export function getPeopleAlsoAsk(slug?: string): SeoQuestion[] {
  const current = rules.find((rule) => rule.slug === slug);

  if (!current) {
    return [
      { question: 'Can I bring a power bank on a plane?', href: '/search/?q=power%20bank%20plane' },
      { question: 'Can I bring medication in cabin baggage?', href: '/search/?q=medication%20plane' },
      { question: 'Can I bring baby formula through airport security?', href: '/search/?q=baby%20formula%20airport%20security' },
      { question: 'Can I bring liquids in hand luggage?', href: '/search/?q=liquids%20hand%20luggage' },
    ];
  }

  const item = current.item;
  return [
    { question: `Can I bring ${item.toLowerCase()} in cabin baggage?`, href: `/search/?q=${encodeURIComponent(item + ' cabin baggage')}` },
    { question: `Can I pack ${item.toLowerCase()} in checked luggage?`, href: `/search/?q=${encodeURIComponent(item + ' checked luggage')}` },
    { question: `Do airlines allow ${item.toLowerCase()}?`, href: `/search/?q=${encodeURIComponent(item + ' airline rules')}` },
    { question: `Do customs rules apply to ${item.toLowerCase()}?`, href: `/search/?q=${encodeURIComponent(item + ' customs rules')}` },
  ];
}

export function getSeoClusters(): SeoLink[] {
  const topRules = rules.slice(0, 12).map((rule) => ({
    title: rule.item,
    label: rule.category,
    href: `/rules/${rule.slug}/`,
  }));

  const topAirlines = airlines.slice(0, 8).map((airline) => ({
    title: airline,
    label: 'Airline guide',
    href: `/airlines/${normalise(airline)}/`,
  }));

  const topCountries = countries.slice(0, 8).map((country) => ({
    title: country,
    label: 'Destination guide',
    href: `/countries/${normalise(country)}/`,
  }));

  return [...topRules, ...topAirlines, ...topCountries];
}
