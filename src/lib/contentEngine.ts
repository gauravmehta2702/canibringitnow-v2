import type { Metadata } from 'next';
import { rules, type Rule } from '@/data/rules';
import { getAirlineBySlug, getAirlines } from '@/lib/airlineUtils';
import { getCategories, getCategoryBySlug } from '@/lib/categoryUtils';
import { getCountries, getCountryBySlug } from '@/lib/countryUtils';
import { getItemBySlug, getItems } from '@/lib/itemUtils';

export type ContentKind = 'item' | 'airline' | 'country' | 'category';

export type ContentBreadcrumb = {
  label: string;
  href: string;
};

export type ContentQuickPoint = {
  title: string;
  body: string;
};

export type UniversalContentPage = {
  kind: ContentKind;
  slug: string;
  name: string;
  label: string;
  href: string;
  parentHref: string;
  parentLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  rules: Rule[];
  breadcrumbs: ContentBreadcrumb[];
  quickPoints: ContentQuickPoint[];
  tags: string[];
  updated: string;
};

const siteUrl = 'https://canibringitnow.com';

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

function latestUpdated(pageRules: Rule[]) {
  const latest = pageRules
    .map((rule) => rule.updated)
    .filter(Boolean)
    .sort()
    .at(-1);

  return latest || new Date().toISOString().slice(0, 10);
}

function tagsFromRules(pageRules: Rule[]) {
  return unique(pageRules.flatMap((rule) => [rule.category, ...rule.tags])).slice(0, 24);
}

function buildPage(input: Omit<UniversalContentPage, 'breadcrumbs' | 'updated' | 'tags'> & { tags?: string[] }): UniversalContentPage {
  return {
    ...input,
    tags: input.tags?.length ? input.tags : tagsFromRules(input.rules),
    updated: latestUpdated(input.rules),
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: input.parentLabel, href: input.parentHref },
      { label: input.name, href: input.href },
    ],
  };
}

export function getUniversalContentPages(): UniversalContentPage[] {
  const itemPages = getItems().map((item) =>
    buildPage({
      kind: 'item',
      slug: item.slug,
      name: item.name,
      label: 'Item guide',
      href: `/items/${item.slug}/`,
      parentHref: '/items/',
      parentLabel: 'Items',
      eyebrow: 'Item travel rules',
      title: `${item.name} travel rules`,
      description: item.description,
      rules: item.rules,
      quickPoints: [
        { title: 'Cabin baggage', body: `Check if ${item.name.toLowerCase()} can travel in hand luggage.` },
        { title: 'Checked baggage', body: `See when ${item.name.toLowerCase()} is safer or required in checked baggage.` },
        { title: 'Before travel', body: 'Confirm airline, airport security and destination rules for important trips.' },
      ],
      tags: item.tags,
    })
  );

  const airlinePages = getAirlines().map((airline) =>
    buildPage({
      kind: 'airline',
      slug: airline.slug,
      name: airline.name,
      label: 'Airline guide',
      href: `/airlines/${airline.slug}/`,
      parentHref: '/airlines/',
      parentLabel: 'Airlines',
      eyebrow: 'Airline baggage guidance',
      title: `${airline.name} baggage and travel rules`,
      description: airline.description,
      rules: airline.rules,
      quickPoints: [
        { title: 'Baggage policy', body: `Check cabin and checked baggage guidance before flying with ${airline.name}.` },
        { title: 'Restricted items', body: 'Pay special attention to batteries, liquids, medication, food and electronics.' },
        { title: 'Final check', body: 'Always confirm high-risk items with the airline and departure airport before travel.' },
      ],
    })
  );

  const countryPages = getCountries().map((country) =>
    buildPage({
      kind: 'country',
      slug: country.slug,
      name: country.name,
      label: 'Destination guide',
      href: `/countries/${country.slug}/`,
      parentHref: '/countries/',
      parentLabel: 'Countries',
      eyebrow: 'Destination travel guidance',
      title: `${country.name} travel rules`,
      description: country.description,
      rules: country.rules,
      quickPoints: [
        { title: 'Customs', body: `Check destination customs and declaration rules before travelling to ${country.name}.` },
        { title: 'Medication', body: 'Medication rules vary by country, especially controlled medicines.' },
        { title: 'Airport security', body: 'Liquids, batteries and electronics may still be checked at departure security.' },
      ],
    })
  );

  const categoryPages = getCategories().map((category) =>
    buildPage({
      kind: 'category',
      slug: category.slug,
      name: category.name,
      label: 'Travel category',
      href: `/categories/${category.slug}/`,
      parentHref: '/categories/',
      parentLabel: 'Categories',
      eyebrow: 'Travel rule category',
      title: `${category.name} travel rules`,
      description: category.description,
      rules: category.rules,
      quickPoints: [
        { title: 'Fast checks', body: `Browse the most useful ${category.name.toLowerCase()} travel rules in one place.` },
        { title: 'Cabin vs checked', body: 'Compare hand luggage and checked baggage status before packing.' },
        { title: 'Rule changes', body: 'Review important warnings because travel restrictions can change.' },
      ],
    })
  );

  return [...itemPages, ...airlinePages, ...countryPages, ...categoryPages];
}

export function getContentPagesByKind(kind: ContentKind) {
  return getUniversalContentPages().filter((page) => page.kind === kind);
}

export function getContentPage(kind: ContentKind, slug: string) {
  switch (kind) {
    case 'item': {
      const item = getItemBySlug(slug);
      return item ? getContentPagesByKind('item').find((page) => page.slug === item.slug) : undefined;
    }
    case 'airline': {
      const airline = getAirlineBySlug(slug);
      return airline ? getContentPagesByKind('airline').find((page) => page.slug === airline.slug) : undefined;
    }
    case 'country': {
      const country = getCountryBySlug(slug);
      return country ? getContentPagesByKind('country').find((page) => page.slug === country.slug) : undefined;
    }
    case 'category': {
      const category = getCategoryBySlug(slug);
      return category ? getContentPagesByKind('category').find((page) => page.slug === category.slug) : undefined;
    }
    default:
      return undefined;
  }
}

export function getRelatedContent(page: UniversalContentPage, limit = 6) {
  const ownRuleSlugs = new Set(page.rules.map((rule) => rule.slug));
  const ownTags = new Set(page.tags.map((tag) => tag.toLowerCase()));

  return rules
    .filter((rule) => !ownRuleSlugs.has(rule.slug))
    .map((rule) => {
      const text = [rule.item, rule.category, ...rule.tags].map((value) => value.toLowerCase());
      const tagScore = text.reduce((score, value) => score + (ownTags.has(value) ? 8 : 0), 0);
      const categoryScore = page.rules.some((pageRule) => pageRule.category === rule.category) ? 12 : 0;
      return { rule, score: tagScore + categoryScore };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.rule.item.localeCompare(b.rule.item))
    .slice(0, limit)
    .map((entry) => entry.rule);
}

export function buildContentMetadata(page: UniversalContentPage | undefined, fallbackTitle: string): Metadata {
  if (!page) return { title: `${fallbackTitle} | Can I Bring It Now` };

  const title = `${page.title} | Can I Bring It Now`;
  const url = `${siteUrl}${page.href}`;

  return {
    title,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: {
      title,
      description: page.description,
      url,
      type: 'website',
      siteName: 'Can I Bring It Now',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: page.description,
    },
  };
}

export function buildBreadcrumbJsonLd(page: UniversalContentPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: page.breadcrumbs.map((breadcrumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: breadcrumb.label,
      item: `${siteUrl}${breadcrumb.href}`,
    })),
  };
}

export function buildCollectionJsonLd(page: UniversalContentPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: page.title,
    description: page.description,
    url: `${siteUrl}${page.href}`,
    dateModified: page.updated,
    mainEntity: page.rules.slice(0, 12).map((rule) => ({
      '@type': 'Question',
      name: rule.item,
      acceptedAnswer: {
        '@type': 'Answer',
        text: rule.shortAnswer,
      },
    })),
  };
}
