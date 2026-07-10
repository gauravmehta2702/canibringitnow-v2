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

export function getRelatedRuleLinks(rule: Rule, limit = 8): RelatedLink[] {
  const currentTokens = ruleTokens(rule);

  return rules
    .filter((candidate) => candidate.slug !== rule.slug)
    .map((candidate) => {
      const sameCategory = candidate.category === rule.category ? 24 : 0;
      const sameStatus = candidate.cabin === rule.cabin ? 3 : 0;
      const score = sameCategory + sameStatus + overlapScore(currentTokens, ruleTokens(candidate));
      return {
        href: `/rules/${candidate.slug}/`,
        title: candidate.item,
        description: candidate.shortAnswer,
        eyebrow: candidate.category,
        score,
      };
    })
    .filter((item) => item.score > 3)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}

export function getRelatedHubLinksForRule(rule: Rule, limit = 6): RelatedLink[] {
  const currentTokens = ruleTokens(rule);

  return getUniversalContentPages()
    .map((page) => {
      const containsRule = page.rules.some((pageRule) => pageRule.slug === rule.slug) ? 30 : 0;
      const categoryMatch = page.kind === 'category' && normalise(page.name) === normalise(rule.category) ? 20 : 0;
      const score = containsRule + categoryMatch + overlapScore(currentTokens, pageTokens(page));
      return {
        href: page.href,
        title: page.title,
        description: page.description,
        eyebrow: page.label,
        score,
      };
    })
    .filter((item) => item.score > 5)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}

export function getRelatedHubLinks(page: UniversalContentPage, limit = 8): RelatedLink[] {
  const currentTokens = pageTokens(page);
  const ownRuleSlugs = new Set(page.rules.map((rule) => rule.slug));

  return getUniversalContentPages()
    .filter((candidate) => !(candidate.kind === page.kind && candidate.slug === page.slug))
    .map((candidate) => {
      const sharedRules = candidate.rules.filter((rule) => ownRuleSlugs.has(rule.slug)).length * 12;
      const sameKind = candidate.kind === page.kind ? 2 : 0;
      const score = sharedRules + sameKind + overlapScore(currentTokens, pageTokens(candidate));
      return {
        href: candidate.href,
        title: candidate.title,
        description: candidate.description,
        eyebrow: candidate.label,
        score,
      };
    })
    .filter((item) => item.score > 4)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}

export function getPopularHubLinks(kind?: ContentKind, limit = 6): RelatedLink[] {
  return getUniversalContentPages()
    .filter((page) => !kind || page.kind === kind)
    .sort((a, b) => b.rules.length - a.rules.length || a.title.localeCompare(b.title))
    .slice(0, limit)
    .map((page) => ({
      href: page.href,
      title: page.title,
      description: page.description,
      eyebrow: page.label,
      score: page.rules.length,
    }));
}
