import { rules, type Rule } from '@/data/rules';
import { getUniversalContentPages, type ContentKind, type UniversalContentPage } from '@/lib/contentEngine';

export type RelatedLink = {
  href: string;
  title: string;
  description: string;
  eyebrow: string;
  score: number;
};

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function tokens(values: string[]) {
  return new Set(
    values
      .flatMap((value) => normalise(value).split(/\s+/))
      .filter((value) => value.length > 2)
  );
}

function overlapScore(a: Set<string>, b: Set<string>) {
  let score = 0;
  a.forEach((value) => {
    if (b.has(value)) score += 4;
  });
  return score;
}

function ruleTokens(rule: Rule) {
  return tokens([rule.item, rule.category, ...rule.tags]);
}

function pageTokens(page: UniversalContentPage) {
  return tokens([page.name, page.title, page.description, ...page.tags]);
}

function ruleToLink(rule: Rule, score: number): RelatedLink {
  return {
    href: `/rules/${rule.slug}/`,
    title: rule.item,
    description: rule.shortAnswer,
    eyebrow: rule.category,
    score,
  };
}

function pageToLink(page: UniversalContentPage, score: number): RelatedLink {
  return {
    href: page.href,
    title: page.title,
    description: page.description,
    eyebrow: page.label,
    score,
  };
}

export function getRelatedRuleLinks(rule: Rule, limit = 8): RelatedLink[] {
  const currentTokens = ruleTokens(rule);
  const ranked = rules
    .filter((candidate) => candidate.slug !== rule.slug)
    .map((candidate) => {
      const sameCategory = candidate.category === rule.category ? 24 : 0;
      const sameCabinStatus = candidate.cabin === rule.cabin ? 3 : 0;
      const sameCheckedStatus = candidate.checked === rule.checked ? 2 : 0;
      const score = sameCategory + sameCabinStatus + sameCheckedStatus + overlapScore(currentTokens, ruleTokens(candidate));
      return ruleToLink(candidate, score);
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const strongMatches = ranked.filter((item) => item.score > 3).slice(0, limit);
  if (strongMatches.length >= Math.min(3, limit)) return strongMatches;

  // Guaranteed fallback: never hide the block when useful public rules exist.
  const selected = new Map(strongMatches.map((link) => [link.href, link]));
  for (const link of ranked) {
    if (!selected.has(link.href)) selected.set(link.href, link);
    if (selected.size >= limit) break;
  }
  return Array.from(selected.values()).slice(0, limit);
}

export function getRelatedHubLinksForRule(rule: Rule, limit = 6): RelatedLink[] {
  const currentTokens = ruleTokens(rule);
  const pages = getUniversalContentPages();
  const ranked = pages
    .map((page) => {
      const containsRule = page.rules.some((pageRule) => pageRule.slug === rule.slug) ? 30 : 0;
      const categoryMatch = page.kind === 'category' && normalise(page.name) === normalise(rule.category) ? 20 : 0;
      const score = containsRule + categoryMatch + overlapScore(currentTokens, pageTokens(page));
      return pageToLink(page, score);
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const strongMatches = ranked.filter((item) => item.score > 5).slice(0, limit);
  if (strongMatches.length >= Math.min(3, limit)) return strongMatches;

  // Guaranteed fallback uses the most useful real hubs, so every URL is backed by a generated route.
  const selected = new Map(strongMatches.map((link) => [link.href, link]));
  for (const link of ranked) {
    if (!selected.has(link.href)) selected.set(link.href, link);
    if (selected.size >= limit) break;
  }
  return Array.from(selected.values()).slice(0, limit);
}

export function getRelatedHubLinks(page: UniversalContentPage, limit = 8): RelatedLink[] {
  const currentTokens = pageTokens(page);
  const ownRuleSlugs = new Set(page.rules.map((rule) => rule.slug));
  const ranked = getUniversalContentPages()
    .filter((candidate) => !(candidate.kind === page.kind && candidate.slug === page.slug))
    .map((candidate) => {
      const sharedRules = candidate.rules.filter((rule) => ownRuleSlugs.has(rule.slug)).length * 12;
      const sameKind = candidate.kind === page.kind ? 2 : 0;
      const score = sharedRules + sameKind + overlapScore(currentTokens, pageTokens(candidate));
      return pageToLink(candidate, score);
    })
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const strongMatches = ranked.filter((item) => item.score > 4).slice(0, limit);
  if (strongMatches.length >= Math.min(3, limit)) return strongMatches;

  const selected = new Map(strongMatches.map((link) => [link.href, link]));
  for (const link of ranked) {
    if (!selected.has(link.href)) selected.set(link.href, link);
    if (selected.size >= limit) break;
  }
  return Array.from(selected.values()).slice(0, limit);
}

export function getPopularHubLinks(kind?: ContentKind, limit = 6): RelatedLink[] {
  return getUniversalContentPages()
    .filter((page) => !kind || page.kind === kind)
    .sort((a, b) => b.rules.length - a.rules.length || a.title.localeCompare(b.title))
    .slice(0, limit)
    .map((page) => pageToLink(page, page.rules.length));
}
