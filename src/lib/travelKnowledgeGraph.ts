import { airlines, rules, type Rule } from '@/data/rules';

export type AirlineComparisonEntry = {
  airline: string;
  airlineSlug: string;
  rule: Rule;
};

export type ComparisonTopic = {
  slug: string;
  name: string;
  category: string;
  aliases: string[];
  entries: AirlineComparisonEntry[];
};

const normalize = (value: string) => value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const airlineLookup = airlines
  .map((airline) => ({ airline, slug: normalize(airline) }))
  .sort((a, b) => b.slug.length - a.slug.length);

function detectAirline(rule: Rule) {
  const haystack = `${rule.slug} ${rule.item} ${rule.tags.join(' ')}`.toLowerCase();
  return airlineLookup.find(({ airline, slug }) => haystack.includes(slug) || haystack.includes(airline.toLowerCase()));
}

function cleanItemName(rule: Rule, airline?: string) {
  let value = rule.item;
  if (airline) value = value.replace(new RegExp(`\\s+(on|with|for)\\s+${airline.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*$`, 'i'), '');
  return value.replace(/\s+(on|with|for)\s+an?\s+airline.*$/i, '').trim();
}

function baseSlug(rule: Rule, airlineSlug?: string) {
  if (airlineSlug && rule.slug.endsWith(`-${airlineSlug}`)) return rule.slug.slice(0, -(airlineSlug.length + 1));
  return normalize(cleanItemName(rule));
}

export function getComparisonTopics(): ComparisonTopic[] {
  const grouped = new Map<string, { name: string; category: string; aliases: Set<string>; entries: AirlineComparisonEntry[] }>();

  for (const rule of rules) {
    const detected = detectAirline(rule);
    if (!detected) continue;
    const slug = baseSlug(rule, detected.slug);
    const existing = grouped.get(slug) ?? {
      name: cleanItemName(rule, detected.airline),
      category: rule.category,
      aliases: new Set<string>(),
      entries: [],
    };
    rule.tags.forEach((tag) => existing.aliases.add(tag));
    existing.entries.push({ airline: detected.airline, airlineSlug: detected.slug, rule });
    grouped.set(slug, existing);
  }

  return [...grouped.entries()]
    .filter(([, group]) => group.entries.length >= 2)
    .map(([slug, group]) => ({
      slug,
      name: group.name,
      category: group.category,
      aliases: [...group.aliases].slice(0, 12),
      entries: group.entries.sort((a, b) => a.airline.localeCompare(b.airline)),
    }))
    .sort((a, b) => b.entries.length - a.entries.length || a.name.localeCompare(b.name));
}

export function getComparisonTopic(slug: string) {
  return getComparisonTopics().find((topic) => topic.slug === slug);
}

export function getComparisonForRule(rule: Rule) {
  return getComparisonTopics().find((topic) => topic.entries.some((entry) => entry.rule.slug === rule.slug));
}

export function getKnowledgeGraphRelatedRules(rule: Rule, limit = 8) {
  const currentTags = new Set(rule.tags.map((tag) => normalize(tag)));
  return rules
    .filter((candidate) => candidate.slug !== rule.slug)
    .map((candidate) => {
      let score = candidate.category === rule.category ? 8 : 0;
      for (const tag of candidate.tags) if (currentTags.has(normalize(tag))) score += 2;
      const sameComparison = getComparisonForRule(rule)?.entries.some((entry) => entry.rule.slug === candidate.slug);
      if (sameComparison) score += 12;
      return { candidate, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.candidate.item.localeCompare(b.candidate.item))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export { normalize as graphSlugify };
