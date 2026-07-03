import { rules, type Rule } from '@/data/rules';

export type ItemHub = {
  name: string;
  slug: string;
  category: string;
  description: string;
  rules: Rule[];
  tags: string[];
};

export function itemSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const patterns = [
  /\s+on\s+.+$/i,
  /\s+to\s+.+$/i,
  /\s+in\s+uk\s+hand\s+luggage$/i,
  /\s+under\s+tsa\s+rules$/i,
  /\s+on\s+a\s+plane$/i,
];

export function getBaseItemName(item: string) {
  let cleaned = item.trim();
  for (const pattern of patterns) cleaned = cleaned.replace(pattern, '');
  return cleaned.trim() || item;
}

function getItemDescription(name: string, category: string, count: number) {
  return `Check ${name.toLowerCase()} travel rules for cabin baggage, checked baggage, airport security, airline restrictions and destination guidance. This guide links to ${count} related rule${count === 1 ? '' : 's'}.`;
}

export function getItems(): ItemHub[] {
  const grouped = new Map<string, Rule[]>();

  rules.forEach((rule) => {
    const name = getBaseItemName(rule.item);
    const key = itemSlug(name);
    grouped.set(key, [...(grouped.get(key) || []), rule]);
  });

  return Array.from(grouped.entries())
    .map(([slug, itemRules]) => {
      const name = getBaseItemName(itemRules[0].item);
      const tags = Array.from(new Set(itemRules.flatMap((rule) => rule.tags))).slice(0, 24);
      return {
        name,
        slug,
        category: itemRules[0].category,
        description: getItemDescription(name, itemRules[0].category, itemRules.length),
        rules: itemRules,
        tags,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getItemBySlug(slug: string) {
  return getItems().find((item) => item.slug === slug);
}

export function findItemHubs(query: string, limit = 6) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return getItems()
    .map((item) => {
      const text = [item.name, item.category, item.description, ...item.tags].join(' ').toLowerCase();
      let score = 0;
      if (item.name.toLowerCase() === q) score += 100;
      if (item.name.toLowerCase().includes(q)) score += 50;
      if (text.includes(q)) score += 20;
      q.split(/\s+/).forEach((word) => {
        if (word && text.includes(word)) score += 4;
      });
      return { item, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.item);
}
