import { airlines, countries, rules, type Rule } from '@/data/rules';
import { atlasSlug } from '@/lib/atlasSeoEngine';

export type AuthorityCluster = {
  title: string;
  href: string;
  label: string;
  description: string;
};

export type FeaturedSnippetBlock = {
  question: string;
  directAnswer: string;
  bullets: string[];
};

function cleanItem(item: string) {
  return item.replace(/\bon a plane\b/gi, '').replace(/\bin hand luggage\b/gi, '').trim();
}

function isBattery(rule: Rule) {
  const text = `${rule.item} ${rule.category} ${rule.tags.join(' ')}`.toLowerCase();
  return text.includes('battery') || text.includes('power bank') || text.includes('lithium') || text.includes('charger');
}

function isMedication(rule: Rule) {
  const text = `${rule.item} ${rule.category} ${rule.tags.join(' ')}`.toLowerCase();
  return text.includes('medicine') || text.includes('medication') || text.includes('prescription') || text.includes('insulin');
}

function isBaby(rule: Rule) {
  const text = `${rule.item} ${rule.category} ${rule.tags.join(' ')}`.toLowerCase();
  return text.includes('baby') || text.includes('formula') || text.includes('infant') || text.includes('milk');
}

function isFood(rule: Rule) {
  const text = `${rule.item} ${rule.category} ${rule.tags.join(' ')}`.toLowerCase();
  return text.includes('food') || text.includes('powder') || text.includes('customs') || text.includes('protein');
}

export function getFeaturedSnippetBlock(rule: Rule): FeaturedSnippetBlock {
  const item = cleanItem(rule.item);
  const cabin = rule.cabin === 'Allowed' ? 'allowed in cabin baggage' : rule.cabin === 'Not allowed' ? 'not allowed in cabin baggage' : 'restricted in cabin baggage';
  const checked = rule.checked === 'Allowed' ? 'allowed in checked baggage' : rule.checked === 'Not allowed' ? 'not allowed in checked baggage' : 'restricted in checked baggage';

  return {
    question: `Can I bring ${item}?`,
    directAnswer: `${item} is ${cabin} and ${checked}. ${rule.shortAnswer}`,
    bullets: [
      `Cabin baggage: ${rule.cabin}`,
      `Checked baggage: ${rule.checked}`,
      rule.warning ? `Important: ${rule.warning}` : 'Final decision can depend on airline, airport security and destination rules.',
    ],
  };
}

export function getAuthorityClusters(rule: Rule): AuthorityCluster[] {
  const item = cleanItem(rule.item);
  const clusters: AuthorityCluster[] = [];

  clusters.push({
    title: `${item} rule page`,
    href: `/rules/${rule.slug}/`,
    label: 'Main rule',
    description: rule.shortAnswer,
  });

  clusters.push({
    title: `${item} questions`,
    href: `/questions/can-i-bring-${rule.slug}/`,
    label: 'Question page',
    description: `Answer common questions about ${item}.`,
  });

  airlines.slice(0, 6).forEach((airline) => {
    clusters.push({
      title: `${item} on ${airline}`,
      href: `/search/?q=${encodeURIComponent(`${item} on ${airline}`)}`,
      label: 'Airline',
      description: `Check ${item.toLowerCase()} with ${airline} baggage context.`,
    });
  });

  countries.slice(0, 6).forEach((country) => {
    clusters.push({
      title: `${item} to ${country}`,
      href: `/search/?q=${encodeURIComponent(`${item} to ${country}`)}`,
      label: 'Country',
      description: `Check ${item.toLowerCase()} with ${country} destination context.`,
    });
  });

  const topicSearches = [
    {
      show: isBattery(rule),
      title: 'Lithium battery travel rules',
      href: '/search/?q=lithium%20battery%20travel%20rules',
      label: 'Battery cluster',
      description: 'Related rules for lithium batteries, chargers and portable power.',
    },
    {
      show: isMedication(rule),
      title: 'Medication travel rules',
      href: '/search/?q=medication%20travel%20rules',
      label: 'Medication cluster',
      description: 'Related rules for prescriptions, tablets, insulin and medical items.',
    },
    {
      show: isBaby(rule),
      title: 'Baby travel airport security',
      href: '/search/?q=baby%20travel%20airport%20security',
      label: 'Baby travel',
      description: 'Related rules for baby milk, formula, food and family travel.',
    },
    {
      show: isFood(rule),
      title: 'Food and customs travel rules',
      href: '/search/?q=food%20customs%20travel%20rules',
      label: 'Customs',
      description: 'Related rules for powders, food, supplements and customs checks.',
    },
  ];

  topicSearches.filter((item) => item.show).forEach((item) => clusters.push(item));

  clusters.push(
    {
      title: 'Trip Planner',
      href: '/trip-planner/',
      label: 'Tool',
      description: 'Plan your airline, destination and packed items together.',
    },
    {
      title: 'Travel Dashboard',
      href: '/travel-dashboard/',
      label: 'Tool',
      description: 'Open the wider pre-travel dashboard.',
    },
    {
      title: 'Destination Guides',
      href: '/destination-guides/',
      label: 'Guides',
      description: 'Explore hotel, restaurant and attraction guide ideas.',
    },
  );

  return clusters.slice(0, 24);
}

export function getSeasonalAuthorityLinks(rule: Rule): AuthorityCluster[] {
  const item = cleanItem(rule.item);
  return [
    {
      title: `${item} for summer travel`,
      href: `/search/?q=${encodeURIComponent(`${item} summer travel`)}`,
      label: 'Seasonal',
      description: 'Useful for summer holidays, family trips and airport security queues.',
    },
    {
      title: `${item} for winter travel`,
      href: `/search/?q=${encodeURIComponent(`${item} winter travel`)}`,
      label: 'Seasonal',
      description: 'Useful for ski trips, winter holidays and cold-weather packing.',
    },
    {
      title: `${item} for family travel`,
      href: `/search/?q=${encodeURIComponent(`${item} family travel`)}`,
      label: 'Family',
      description: 'Useful for families travelling with children or infants.',
    },
    {
      title: `${item} for long-haul flights`,
      href: `/search/?q=${encodeURIComponent(`${item} long haul flight`)}`,
      label: 'Long-haul',
      description: 'Useful for international trips and longer airport journeys.',
    },
  ];
}

export function getAuthorityTopicPages() {
  const priority = rules.slice(0, 20);
  const pages = priority.flatMap((rule) => {
    const item = cleanItem(rule.item);
    return [
      {
        slug: `${rule.slug}-airline-rules`,
        title: `${item} airline rules`,
        heading: `${item} airline rules`,
        description: `Compare how ${item.toLowerCase()} may be treated across airlines, cabin baggage and checked baggage.`,
        rule,
        type: 'Airline cluster',
      },
      {
        slug: `${rule.slug}-country-rules`,
        title: `${item} country rules`,
        heading: `${item} destination and customs rules`,
        description: `Check how ${item.toLowerCase()} may be affected by destination, customs and border rules.`,
        rule,
        type: 'Country cluster',
      },
      {
        slug: `${rule.slug}-packing-guide`,
        title: `${item} packing guide`,
        heading: `${item} packing guide`,
        description: `Plan how to pack ${item.toLowerCase()} before airport security, boarding and arrival customs.`,
        rule,
        type: 'Packing cluster',
      },
    ];
  });

  const seen = new Set<string>();
  return pages.filter((page) => {
    if (seen.has(page.slug)) return false;
    seen.add(page.slug);
    return true;
  });
}

export function getAuthorityTopicPage(slug: string) {
  return getAuthorityTopicPages().find((page) => page.slug === slug);
}

export function buildAuthorityTopicJsonLd(page: ReturnType<typeof getAuthorityTopicPages>[number]) {
  const url = `https://canibringitnow.com/topics/${page.slug}/`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.title,
      description: page.description,
      mainEntityOfPage: url,
      about: [
        { '@type': 'Thing', name: page.rule.item },
        { '@type': 'Thing', name: page.rule.category },
        { '@type': 'Thing', name: page.type },
      ],
      publisher: {
        '@type': 'Organization',
        name: 'Can I Bring It Now',
        url: 'https://canibringitnow.com/',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://canibringitnow.com/' },
        { '@type': 'ListItem', position: 2, name: 'Topics', item: 'https://canibringitnow.com/topics/' },
        { '@type': 'ListItem', position: 3, name: page.title, item: url },
      ],
    },
  ];
}
