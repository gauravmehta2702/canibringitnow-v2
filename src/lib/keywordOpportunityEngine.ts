import { rules, type Rule } from '@/data/rules';
import { splitRuleSubject } from '@/lib/ruleSeoEngine';

export type OpportunityTier = 'Quick win' | 'Medium opportunity' | 'Long-term';
export type CoverageDimension = 'Airline' | 'Airport' | 'Country' | 'Customs' | 'Travel tips';

export type KeywordOpportunity = {
  keyword: string;
  pageHref: string;
  sourceSlug: string;
  item: string;
  category: string;
  airline?: string;
  score: number;
  tier: OpportunityTier;
  rationale: string[];
};

const HIGH_INTENT_CATEGORIES = new Set(['Batteries', 'Medication', 'Liquids', 'Baby travel', 'Electronics']);

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function unique<T>(items: T[]) {
  return [...new Set(items)];
}

function scoreRule(rule: Rule) {
  const subject = splitRuleSubject(rule);
  let score = 35;
  const reasons: string[] = [];

  if (subject.airline) {
    score += 18;
    reasons.push('Specific airline + item search intent');
  }
  if (HIGH_INTENT_CATEGORIES.has(rule.category)) {
    score += 14;
    reasons.push('High-intent travel problem');
  }
  if (rule.restrictions.length >= 4) {
    score += 8;
    reasons.push('Strong answer depth already available');
  }
  if (rule.tips.length >= 4) {
    score += 6;
    reasons.push('Useful traveller guidance');
  }
  if (rule.tags.length >= 10) {
    score += 7;
    reasons.push('Broad related-query coverage');
  }
  if (!/general travel guidance|common airline baggage rules/i.test(rule.sourceNote)) {
    score += 8;
    reasons.push('More specific source context');
  }

  return { score: Math.min(100, score), reasons };
}

function keywordForRule(rule: Rule) {
  const subject = splitRuleSubject(rule);
  if (subject.airline) return `Can I take ${subject.baseItem.toLowerCase()} on ${subject.airline}?`;
  return `Can I take ${subject.baseItem.toLowerCase()} on a plane?`;
}

export function getKeywordOpportunities(limit = 250): KeywordOpportunity[] {
  return rules
    .map((rule) => {
      const subject = splitRuleSubject(rule);
      const { score, reasons } = scoreRule(rule);
      const tier: OpportunityTier = score >= 74 ? 'Quick win' : score >= 58 ? 'Medium opportunity' : 'Long-term';
      return {
        keyword: keywordForRule(rule),
        pageHref: `/rules/${rule.slug}/`,
        sourceSlug: rule.slug,
        item: subject.baseItem,
        category: rule.category,
        airline: subject.airline,
        score,
        tier,
        rationale: reasons,
      };
    })
    .sort((a, b) => b.score - a.score || a.keyword.localeCompare(b.keyword))
    .slice(0, limit);
}

export function getRelatedSearches(rule: Rule, limit = 8) {
  const subject = splitRuleSubject(rule);
  const base = subject.baseItem.toLowerCase();
  const searches = [
    subject.airline ? `${subject.baseItem} cabin baggage rules ${subject.airline}` : `${subject.baseItem} cabin baggage rules`,
    subject.airline ? `${subject.baseItem} checked baggage ${subject.airline}` : `${subject.baseItem} checked baggage rules`,
    `Can I take ${base} through airport security?`,
    `${subject.baseItem} international travel rules`,
    `${subject.baseItem} packing advice`,
    `${subject.baseItem} destination customs rules`,
  ];

  const siblingAirlines = rules
    .filter((candidate) => candidate.slug !== rule.slug)
    .map((candidate) => ({ candidate, subject: splitRuleSubject(candidate) }))
    .filter(({ subject: sibling }) => normalise(sibling.baseItem) === normalise(subject.baseItem) && sibling.airline)
    .slice(0, 4)
    .map(({ candidate, subject: sibling }) => ({
      label: `Can I take ${sibling.baseItem.toLowerCase()} on ${sibling.airline}?`,
      href: `/rules/${candidate.slug}/`,
      internal: true,
    }));

  const generated = unique(searches).map((label) => ({
    label,
    href: `/search/?q=${encodeURIComponent(label)}`,
    internal: false,
  }));

  return [...siblingAirlines, ...generated].slice(0, limit);
}

export function getCoverageMatrix() {
  const topics = new Map<string, { category: string; dimensions: Record<CoverageDimension, boolean>; pageCount: number }>();

  for (const rule of rules) {
    const subject = splitRuleSubject(rule);
    const key = subject.baseItem;
    const current = topics.get(key) || {
      category: rule.category,
      dimensions: { Airline: false, Airport: false, Country: false, Customs: false, 'Travel tips': false },
      pageCount: 0,
    };

    current.pageCount += 1;
    current.dimensions.Airline ||= Boolean(subject.airline);
    current.dimensions.Airport ||= rule.tags.some((tag) => /airport|security|heathrow|gatwick|stansted|manchester/i.test(tag));
    current.dimensions.Country ||= rule.tags.some((tag) => /country|india|uk|usa|dubai|uae|spain|japan|australia|canada/i.test(tag));
    current.dimensions.Customs ||= /customs|import|destination/i.test(`${rule.shortAnswer} ${rule.warning || ''} ${rule.tags.join(' ')}`);
    current.dimensions['Travel tips'] ||= rule.tips.length >= 3;
    topics.set(key, current);
  }

  return [...topics.entries()]
    .map(([topic, value]) => ({ topic, ...value, gaps: Object.entries(value.dimensions).filter(([, covered]) => !covered).map(([dimension]) => dimension as CoverageDimension) }))
    .sort((a, b) => b.gaps.length - a.gaps.length || b.pageCount - a.pageCount || a.topic.localeCompare(b.topic));
}
