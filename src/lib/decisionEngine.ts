import { travelItems, type TravelItem } from '@/data/travelItems';

function normalise(value: string) {
  return value.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function getTravelItemBySlug(slug: string) {
  return travelItems.find((item) => item.slug === slug);
}

export function findTravelItems(query: string, limit = 8): TravelItem[] {
  const q = normalise(query);
  if (!q) return travelItems.slice(0, limit);
  const words = q.split(' ').filter(Boolean);

  return travelItems
    .map((item) => {
      const searchable = [item.name, item.category, item.shortAnswer, ...item.aliases, ...item.tags, ...item.relatedItems].join(' ').toLowerCase();
      let score = 0;
      if (normalise(item.name) === q) score += 50;
      if (normalise(item.name).includes(q)) score += 25;
      if (item.aliases.some((alias) => normalise(alias) === q)) score += 35;
      if (item.aliases.some((alias) => normalise(alias).includes(q))) score += 20;
      if (item.tags.some((tag) => normalise(tag).includes(q))) score += 15;
      if (normalise(item.category).includes(q)) score += 8;
      words.forEach((word) => {
        if (searchable.includes(word)) score += 3;
      });
      return { item, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.item);
}

export function getDecisionScore(item: TravelItem) {
  let score = Math.round(item.confidence * 100);
  if (item.risk === 'High') score -= 12;
  if (item.risk === 'Medium') score -= 5;
  if (item.checked === 'Not allowed') score -= 3;
  return Math.max(40, Math.min(99, score));
}

export function getRiskLabel(item: TravelItem) {
  if (item.risk === 'Low') return 'Low risk';
  if (item.risk === 'Medium') return 'Medium risk';
  return 'High risk';
}

export function getRelatedTravelItems(item: TravelItem) {
  return travelItems.filter((candidate) => item.relatedItems.includes(candidate.id)).slice(0, 6);
}
