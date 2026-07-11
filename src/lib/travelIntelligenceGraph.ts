import { airlines, categories, countries, rules, type Rule } from '@/data/rules';
import { getBaseItemName, getItems, itemSlug } from '@/lib/itemUtils';
import { airlineSlug } from '@/lib/airlineUtils';
import { countrySlug } from '@/lib/countryUtils';
import { slugify as categorySlug } from '@/lib/categoryUtils';
import { sourceRegistry, requiredSourceTypes } from '@/data/travel-intelligence/sourceRegistry';
import type {
  RuleGraphContext,
  SourceAuthorityType,
  TravelEntityNode,
  TravelGraph,
  TravelRuleNode,
} from '@/data/travel-intelligence/types';

function normalise(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
}

function mentions(rule: Rule, name: string, slug: string) {
  const values = [rule.item, rule.shortAnswer, rule.warning || '', rule.sourceNote, ...rule.tags];
  const normalisedName = normalise(name);
  const normalisedSlug = normalise(slug);
  return values.some((value) => {
    const text = normalise(value);
    return text === normalisedName || text === normalisedSlug || text.includes(` ${normalisedName} `) || text.startsWith(`${normalisedName} `) || text.endsWith(` ${normalisedName}`);
  });
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function ruleId(slug: string) {
  return `rule:${slug}`;
}

function entityNode(input: Omit<TravelEntityNode, 'id'>): TravelEntityNode {
  return { ...input, id: `${input.kind}:${input.slug}` };
}

function sourceIdsForRule(_rule: Rule) {
  // Until named official sources are verified, preserve only the honest
  // editorial source. This makes missing-source gaps visible to the dashboard.
  return ['editorial-general-travel-guidance'];
}

function buildRuleNodes(): TravelRuleNode[] {
  return rules.map((rule) => {
    const matchedAirlines = airlines
      .filter((airline) => mentions(rule, airline, airlineSlug(airline)))
      .map(airlineSlug);
    const matchedCountries = countries
      .filter((country) => mentions(rule, country, countrySlug(country)))
      .map(countrySlug);

    return {
      id: ruleId(rule.slug),
      slug: rule.slug,
      title: rule.item,
      categorySlug: categorySlug(rule.category),
      itemSlug: itemSlug(getBaseItemName(rule.item)),
      airlineSlugs: unique(matchedAirlines),
      countrySlugs: unique(matchedCountries),
      guideSlugs: [],
      sourceIds: sourceIdsForRule(rule),
      cabin: rule.cabin,
      checked: rule.checked,
      updated: rule.updated,
      tags: unique(rule.tags.map(normalise)),
    };
  });
}

export function buildTravelGraph(): TravelGraph {
  const ruleNodes = buildRuleNodes();
  const byAirline = (slug: string) => ruleNodes.filter((rule) => rule.airlineSlugs.includes(slug)).map((rule) => rule.id);
  const byCountry = (slug: string) => ruleNodes.filter((rule) => rule.countrySlugs.includes(slug)).map((rule) => rule.id);
  const byCategory = (slug: string) => ruleNodes.filter((rule) => rule.categorySlug === slug).map((rule) => rule.id);
  const byItem = (slug: string) => ruleNodes.filter((rule) => rule.itemSlug === slug).map((rule) => rule.id);

  const items = getItems().map((item) => entityNode({
    kind: 'item',
    slug: item.slug,
    name: item.name,
    href: `/items/${item.slug}/`,
    ruleIds: byItem(item.slug),
    tags: unique(item.tags.map(normalise)),
  }));

  const airlineNodes = airlines.map((name) => {
    const slug = airlineSlug(name);
    return entityNode({ kind: 'airline', slug, name, href: `/airlines/${slug}/`, ruleIds: byAirline(slug), tags: [normalise(name)] });
  });

  const countryNodes = countries.map((name) => {
    const slug = countrySlug(name);
    return entityNode({ kind: 'country', slug, name, href: `/countries/${slug}/`, ruleIds: byCountry(slug), tags: [normalise(name)] });
  });

  const categoryNodes = categories.map((name) => {
    const slug = categorySlug(name);
    return entityNode({ kind: 'category', slug, name, href: `/categories/${slug}/`, ruleIds: byCategory(slug), tags: [normalise(name)] });
  });

  return {
    version: '1.0',
    generatedAt: new Date().toISOString(),
    rules: ruleNodes,
    items,
    airlines: airlineNodes,
    countries: countryNodes,
    categories: categoryNodes,
    guides: [],
    sources: sourceRegistry,
  };
}

let cachedGraph: TravelGraph | undefined;

export function getTravelGraph() {
  cachedGraph ||= buildTravelGraph();
  return cachedGraph;
}

export function getRuleGraphContext(slug: string): RuleGraphContext | undefined {
  const graph = getTravelGraph();
  const rule = graph.rules.find((candidate) => candidate.slug === slug);
  if (!rule) return undefined;

  const sources = graph.sources.filter((source) => rule.sourceIds.includes(source.id));
  const existingSourceTypes = new Set<SourceAuthorityType>(sources.map((source) => source.authorityType));
  const required = requiredSourceTypes({
    hasAirline: rule.airlineSlugs.length > 0,
    hasCountry: rule.countrySlugs.length > 0,
    category: graph.categories.find((category) => category.slug === rule.categorySlug)?.name || rule.categorySlug,
  });

  return {
    rule,
    item: graph.items.find((item) => item.slug === rule.itemSlug),
    category: graph.categories.find((category) => category.slug === rule.categorySlug),
    airlines: graph.airlines.filter((airline) => rule.airlineSlugs.includes(airline.slug)),
    countries: graph.countries.filter((country) => rule.countrySlugs.includes(country.slug)),
    guides: graph.guides.filter((guide) => rule.guideSlugs.includes(guide.slug)),
    sources,
    missingSourceTypes: required.filter((type) => !existingSourceTypes.has(type)),
  };
}

export function getTravelGraphStats() {
  const graph = getTravelGraph();
  return {
    rules: graph.rules.length,
    items: graph.items.length,
    airlines: graph.airlines.length,
    countries: graph.countries.length,
    categories: graph.categories.length,
    rulesWithAirlineLinks: graph.rules.filter((rule) => rule.airlineSlugs.length > 0).length,
    rulesWithCountryLinks: graph.rules.filter((rule) => rule.countrySlugs.length > 0).length,
    rulesWithNamedOfficialSources: graph.rules.filter((rule) => rule.sourceIds.some((id) => id !== 'editorial-general-travel-guidance')).length,
  };
}

export function getTravelGraphContextAlerts(input: {
  airline: string;
  destination: string;
  ruleSlugs: string[];
}) {
  const graph = getTravelGraph();
  const selectedAirlineSlug = input.airline ? airlineSlug(input.airline) : '';
  const selectedCountrySlug = input.destination ? countrySlug(input.destination) : '';
  const alerts: string[] = [];

  input.ruleSlugs.forEach((slug) => {
    const rule = graph.rules.find((candidate) => candidate.slug === slug);
    if (!rule) return;

    if (selectedAirlineSlug && rule.airlineSlugs.length > 0 && !rule.airlineSlugs.includes(selectedAirlineSlug)) {
      const named = graph.airlines.filter((airline) => rule.airlineSlugs.includes(airline.slug)).map((airline) => airline.name).join(', ');
      alerts.push(`${rule.title} is written for ${named}; verify the same item directly with ${input.airline}.`);
    }

    if (selectedCountrySlug && rule.countrySlugs.length > 0 && !rule.countrySlugs.includes(selectedCountrySlug)) {
      const named = graph.countries.filter((country) => rule.countrySlugs.includes(country.slug)).map((country) => country.name).join(', ');
      alerts.push(`${rule.title} contains destination guidance for ${named}; check ${input.destination} customs rules separately.`);
    }
  });

  const selectedContexts = input.ruleSlugs.map(getRuleGraphContext).filter(Boolean) as RuleGraphContext[];
  if (selectedContexts.some((context) => context.missingSourceTypes.length > 0)) {
    alerts.push('One or more selected rules still need named official-source verification. Use the linked airline, security and destination authority pages before departure.');
  }

  return unique(alerts).slice(0, 8);
}
