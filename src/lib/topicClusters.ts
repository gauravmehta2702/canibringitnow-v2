import { airlines, countries, rules } from '@/data/rules';

export type TopicClusterLink = {
  title: string;
  href: string;
  label: string;
  description?: string;
};

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function uniqueByHref(links: TopicClusterLink[]) {
  return Array.from(new Map(links.map((link) => [link.href, link])).values());
}

export function getItemFamilyLinks(currentSlug?: string, limit = 12): TopicClusterLink[] {
  const current = rules.find((rule) => rule.slug === currentSlug);
  const words = current?.item.toLowerCase().split(/\s+/).filter((word) => word.length > 3) || [];

  const matches = rules.filter((rule) => {
    if (rule.slug === currentSlug) return false;
    if (current && rule.category === current.category) return true;
    return words.some((word) => rule.item.toLowerCase().includes(word));
  });

  return matches.slice(0, limit).map((rule) => ({
    title: rule.item,
    href: `/rules/${rule.slug}/`,
    label: rule.category,
    description: rule.shortAnswer,
  }));
}

export function getAirlineClusterLinks(currentSlug?: string, limit = 12): TopicClusterLink[] {
  const currentAirline = airlines.find((airline) => currentSlug?.includes(slugify(airline)));
  const airlineRules = currentAirline
    ? rules.filter((rule) => rule.slug.includes(slugify(currentAirline)))
    : rules.filter((rule) => airlines.some((airline) => rule.slug.includes(slugify(airline))));

  return airlineRules.slice(0, limit).map((rule) => ({
    title: rule.item,
    href: `/rules/${rule.slug}/`,
    label: currentAirline || 'Airline rule',
    description: rule.shortAnswer,
  }));
}

export function getDestinationClusterLinks(currentSlug?: string, limit = 12): TopicClusterLink[] {
  const currentCountry = countries.find((country) => currentSlug?.includes(slugify(country)));
  const countryRules = currentCountry
    ? rules.filter((rule) => rule.slug.includes(slugify(currentCountry)))
    : rules.filter((rule) => countries.some((country) => rule.slug.includes(slugify(country))));

  return countryRules.slice(0, limit).map((rule) => ({
    title: rule.item,
    href: `/rules/${rule.slug}/`,
    label: currentCountry || 'Destination rule',
    description: rule.shortAnswer,
  }));
}

export function getHighIntentSearches(currentItem?: string): TopicClusterLink[] {
  const item = currentItem || 'travel item';
  return [
    `Can I bring ${item.toLowerCase()} on a plane?`,
    `${item} cabin baggage rules`,
    `${item} checked luggage rules`,
    `${item} airport security rules`,
    `${item} customs rules`,
    `${item} airline rules`,
    `Is ${item.toLowerCase()} allowed through security?`,
    `What happens if ${item.toLowerCase()} is not allowed?`,
  ].map((search) => ({
    title: search,
    href: `/search/?q=${encodeURIComponent(search)}`,
    label: 'Search intent',
  }));
}

export function getTopicClusterLinks(currentSlug?: string, currentItem?: string): TopicClusterLink[] {
  return uniqueByHref([
    ...getItemFamilyLinks(currentSlug, 8),
    ...getAirlineClusterLinks(currentSlug, 8),
    ...getDestinationClusterLinks(currentSlug, 8),
    ...getHighIntentSearches(currentItem),
  ]);
}
