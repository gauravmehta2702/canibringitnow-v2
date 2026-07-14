import { airlines, categories, countries, rules, type Rule } from '@/data/rules';
import { getBaseItemName, getItems, itemSlug } from '@/lib/itemUtils';
import { airlineSlug } from '@/lib/airlineUtils';
import { countrySlug } from '@/lib/countryUtils';
import { slugify as categorySlug } from '@/lib/categoryUtils';
import { sourceRegistry, requiredSourceTypes } from '@/data/travel-intelligence/sourceRegistry';
import type {
  GraphRecommendation,
  JourneyGraphAssessment,
  RuleGraphContext,
  SourceAuthorityType,
  TravelEntityNode,
  TravelGraph,
  TravelGraphEdge,
  TravelGraphEdgeType,
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
    const text = ` ${normalise(value)} `;
    return text.includes(` ${normalisedName} `) || text.includes(` ${normalisedSlug} `);
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

function edgeId(from: string, to: string, type: TravelGraphEdgeType) {
  return `${type}:${from}->${to}`;
}

function createEdge(
  from: string,
  to: string,
  type: TravelGraphEdgeType,
  weight: number,
  reasons: string[],
): TravelGraphEdge {
  return { id: edgeId(from, to, type), from, to, type, weight, reasons };
}

function tokenOverlap(a: string[], b: string[]) {
  const right = new Set(b);
  return a.filter((token) => right.has(token)).length;
}

function buildEdges(ruleNodes: TravelRuleNode[]): TravelGraphEdge[] {
  const edges: TravelGraphEdge[] = [];

  for (const rule of ruleNodes) {
    edges.push(createEdge(rule.id, `item:${rule.itemSlug}`, 'describes-item', 30, ['Same travel item']));
    edges.push(createEdge(rule.id, `category:${rule.categorySlug}`, 'belongs-to-category', 24, ['Same travel category']));

    for (const slug of rule.airlineSlugs) {
      edges.push(createEdge(rule.id, `airline:${slug}`, 'applies-to-airline', 35, ['Airline named in rule data']));
    }
    for (const slug of rule.countrySlugs) {
      edges.push(createEdge(rule.id, `country:${slug}`, 'applies-to-country', 35, ['Country named in rule data']));
    }
    for (const sourceId of rule.sourceIds) {
      edges.push(createEdge(rule.id, `source:${sourceId}`, 'supported-by-source', 18, ['Source attached to rule']));
    }
  }

  for (let index = 0; index < ruleNodes.length; index += 1) {
    const left = ruleNodes[index];
    for (let otherIndex = index + 1; otherIndex < ruleNodes.length; otherIndex += 1) {
      const right = ruleNodes[otherIndex];
      let score = 0;
      const reasons: string[] = [];
      let type: TravelGraphEdgeType = 'related-by-topic';

      if (left.itemSlug === right.itemSlug) {
        score += 34;
        reasons.push('Same item in a different travel context');
        type = 'same-item-different-context';
      }
      if (left.categorySlug === right.categorySlug) {
        score += 16;
        reasons.push('Same category');
        if (type === 'related-by-topic') type = 'same-category';
      }
      if (left.cabin === right.cabin && left.checked === right.checked) {
        score += 6;
        reasons.push('Same cabin and checked-baggage outcome');
        if (type === 'related-by-topic') type = 'same-baggage-outcome';
      }
      const overlap = tokenOverlap(left.tags, right.tags);
      if (overlap > 0) {
        score += Math.min(20, overlap * 4);
        reasons.push(`${overlap} shared topic tag${overlap === 1 ? '' : 's'}`);
      }

      if (score >= 18) {
        edges.push(createEdge(left.id, right.id, type, score, reasons));
        edges.push(createEdge(right.id, left.id, type, score, reasons));
      }
    }
  }

  return edges;
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
    version: '2.0',
    generatedAt: new Date().toISOString(),
    rules: ruleNodes,
    items,
    airlines: airlineNodes,
    countries: countryNodes,
    categories: categoryNodes,
    guides: [],
    sources: sourceRegistry,
    edges: buildEdges(ruleNodes),
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

export function getGraphRecommendationsForRule(slug: string, limit = 8): GraphRecommendation[] {
  const graph = getTravelGraph();
  const current = graph.rules.find((rule) => rule.slug === slug);
  if (!current) return [];

  const ruleById = new Map(graph.rules.map((rule) => [rule.id, rule]));
  return graph.edges
    .filter((edge) => edge.from === current.id && edge.to.startsWith('rule:'))
    .map((edge) => {
      const candidate = ruleById.get(edge.to);
      if (!candidate) return undefined;
      const sourceRule = rules.find((rule) => rule.slug === candidate.slug);
      if (!sourceRule) return undefined;
      return {
        href: `/rules/${candidate.slug}/`,
        title: candidate.title,
        description: sourceRule.shortAnswer,
        eyebrow: sourceRule.category,
        score: edge.weight,
        reasons: edge.reasons,
      } satisfies GraphRecommendation;
    })
    .filter(Boolean)
    .sort((a, b) => b!.score - a!.score || a!.title.localeCompare(b!.title))
    .slice(0, limit) as GraphRecommendation[];
}

export function getGraphEntityLinksForRule(slug: string): GraphRecommendation[] {
  const context = getRuleGraphContext(slug);
  if (!context) return [];

  const links: GraphRecommendation[] = [];
  if (context.item) links.push({ href: context.item.href, title: context.item.name, description: 'Open the complete item guide and compare related rules.', eyebrow: 'Item guide', score: 30, reasons: ['Primary item entity'] });
  if (context.category) links.push({ href: context.category.href, title: context.category.name, description: 'Browse the wider travel-rule category.', eyebrow: 'Category hub', score: 24, reasons: ['Primary category entity'] });
  context.airlines.forEach((airline) => links.push({ href: airline.href, title: airline.name, description: 'Review related baggage and restricted-item guidance for this airline.', eyebrow: 'Airline guide', score: 35, reasons: ['Airline named in this rule'] }));
  context.countries.forEach((country) => links.push({ href: country.href, title: country.name, description: 'Review destination customs and arrival considerations.', eyebrow: 'Country guide', score: 35, reasons: ['Country named in this rule'] }));
  return links.sort((a, b) => b.score - a.score);
}

export function getTravelGraphStats() {
  const graph = getTravelGraph();
  return {
    rules: graph.rules.length,
    items: graph.items.length,
    airlines: graph.airlines.length,
    countries: graph.countries.length,
    categories: graph.categories.length,
    edges: graph.edges.length,
    rulesWithAirlineLinks: graph.rules.filter((rule) => rule.airlineSlugs.length > 0).length,
    rulesWithCountryLinks: graph.rules.filter((rule) => rule.countrySlugs.length > 0).length,
    rulesWithNamedOfficialSources: graph.rules.filter((rule) => rule.sourceIds.some((id) => id !== 'editorial-general-travel-guidance')).length,
  };
}

export function assessJourneyGraph(input: {
  airline: string;
  departure?: string;
  destination: string;
  ruleSlugs: string[];
}): JourneyGraphAssessment {
  const graph = getTravelGraph();
  const selectedAirlineSlug = input.airline ? airlineSlug(input.airline) : '';
  const selectedCountrySlug = input.destination ? countrySlug(input.destination) : '';
  const selected = input.ruleSlugs
    .map((slug) => graph.rules.find((rule) => rule.slug === slug))
    .filter(Boolean) as TravelRuleNode[];

  const alerts: string[] = [];
  let score = 30;
  if (input.airline) score += 15;
  if (input.departure) score += 10;
  if (input.destination) score += 15;
  if (selected.length > 0) score += 10;

  let officialSourceGapCount = 0;
  for (const rule of selected) {
    if (selectedAirlineSlug && rule.airlineSlugs.length > 0 && !rule.airlineSlugs.includes(selectedAirlineSlug)) {
      const named = graph.airlines.filter((airline) => rule.airlineSlugs.includes(airline.slug)).map((airline) => airline.name).join(', ');
      alerts.push(`${rule.title} is based on ${named || 'another airline'} guidance, but your selected airline is ${input.airline}. Verify ${input.airline}'s current policy separately before travelling.`);
      score -= 8;
    }
    if (selectedCountrySlug && rule.countrySlugs.length > 0 && !rule.countrySlugs.includes(selectedCountrySlug)) {
      const named = graph.countries.filter((country) => rule.countrySlugs.includes(country.slug)).map((country) => country.name).join(', ');
      alerts.push(`${rule.title} contains destination guidance for ${named || 'another country'}, but your selected destination is ${input.destination}. Check ${input.destination} customs and import rules separately.`);
      score -= 8;
    }
    const context = getRuleGraphContext(rule.slug);
    if (context && context.missingSourceTypes.length > 0) {
      officialSourceGapCount += 1;
    }
  }

  if (officialSourceGapCount > 0) {
    alerts.push(`${officialSourceGapCount} selected rule${officialSourceGapCount === 1 ? '' : 's'} still need named official-source verification.`);
    score -= Math.min(15, officialSourceGapCount * 3);
  }

  const recommendationMap = new Map<string, GraphRecommendation>();
  selected.forEach((rule) => {
    getGraphRecommendationsForRule(rule.slug, 4).forEach((recommendation) => {
      if (!input.ruleSlugs.some((slug) => recommendation.href.includes(`/rules/${slug}/`))) {
        const existing = recommendationMap.get(recommendation.href);
        if (!existing || recommendation.score > existing.score) recommendationMap.set(recommendation.href, recommendation);
      }
    });
  });

  const bounded = Math.max(0, Math.min(100, score));
  const label: JourneyGraphAssessment['label'] = bounded >= 85
    ? 'Well connected'
    : bounded >= 65
      ? 'Strong context'
      : bounded >= 45
        ? 'Partial context'
        : 'Low context';

  return {
    score: bounded,
    label,
    alerts: unique(alerts).slice(0, 8),
    recommendations: Array.from(recommendationMap.values()).sort((a, b) => b.score - a.score).slice(0, 6),
    matchedRuleCount: selected.length,
    officialSourceGapCount,
  };
}

export function getTravelGraphContextAlerts(input: {
  airline: string;
  destination: string;
  ruleSlugs: string[];
}) {
  return assessJourneyGraph(input).alerts;
}
