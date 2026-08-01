import { rules, type Rule, type RuleStatus } from '@/data/rules';

export type CategoryResearchRow = {
  category: string;
  total: number;
  cabinAllowed: number;
  cabinRestricted: number;
  cabinNotAllowed: number;
  checkedAllowed: number;
  checkedRestricted: number;
  checkedNotAllowed: number;
};

const statusKey: Record<RuleStatus, 'Allowed' | 'Restricted' | 'NotAllowed'> = {
  Allowed: 'Allowed',
  Restricted: 'Restricted',
  'Not allowed': 'NotAllowed',
};

export function buildCategoryResearchRows(source: Rule[] = rules): CategoryResearchRow[] {
  const rows = new Map<string, CategoryResearchRow>();

  for (const rule of source) {
    const row = rows.get(rule.category) ?? {
      category: rule.category,
      total: 0,
      cabinAllowed: 0,
      cabinRestricted: 0,
      cabinNotAllowed: 0,
      checkedAllowed: 0,
      checkedRestricted: 0,
      checkedNotAllowed: 0,
    };

    row.total += 1;
    row[`cabin${statusKey[rule.cabin]}`] += 1;
    row[`checked${statusKey[rule.checked]}`] += 1;
    rows.set(rule.category, row);
  }

  return [...rows.values()].sort((a, b) => b.total - a.total || a.category.localeCompare(b.category));
}

export function buildTravelResearchSnapshot(source: Rule[] = rules) {
  const categories = buildCategoryResearchRows(source);
  const latestReview = source.reduce((latest, rule) => (rule.updated > latest ? rule.updated : latest), '');
  const uniqueTags = new Set(source.flatMap((rule) => rule.tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean)));
  const withWarnings = source.filter((rule) => Boolean(rule.warning?.trim())).length;
  const withAffiliateType = source.filter((rule) => Boolean(rule.affiliateType?.trim())).length;

  const cabin = {
    allowed: source.filter((rule) => rule.cabin === 'Allowed').length,
    restricted: source.filter((rule) => rule.cabin === 'Restricted').length,
    notAllowed: source.filter((rule) => rule.cabin === 'Not allowed').length,
  };
  const checked = {
    allowed: source.filter((rule) => rule.checked === 'Allowed').length,
    restricted: source.filter((rule) => rule.checked === 'Restricted').length,
    notAllowed: source.filter((rule) => rule.checked === 'Not allowed').length,
  };

  return {
    totalRules: source.length,
    totalCategories: categories.length,
    uniqueTags: uniqueTags.size,
    withWarnings,
    withAffiliateType,
    latestReview,
    cabin,
    checked,
    categories,
  };
}

export function percentage(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 1000) / 10;
}
