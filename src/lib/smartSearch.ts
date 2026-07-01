import { rules, type Rule } from '@/data/rules';

const synonymMap: Record<string, string[]> = {
  insulin: ['insulin', 'diabetes', 'diabetic', 'medicine', 'medication', 'injection', 'medical'],
  medication: ['medication', 'medicine', 'prescription', 'tablets', 'pills', 'doctor letter', 'medical'],
  'power bank': ['power bank', 'portable charger', 'battery pack', 'charger', 'lithium battery'],
  battery: ['battery', 'batteries', 'lithium', 'power bank', 'portable charger', 'spare battery'],
  perfume: ['perfume', 'fragrance', 'aftershave', 'liquid', '100ml', 'toiletries'],
  deodorant: ['deodorant', 'aerosol', 'spray', 'roll on', 'toiletries', 'liquid'],
  baby: ['baby', 'infant', 'formula', 'milk', 'baby food', 'stroller', 'pram'],
  'baby milk': ['baby milk', 'formula', 'infant milk', 'baby food', 'baby travel'],
  food: ['food', 'snacks', 'fruit', 'meat', 'chocolate', 'customs', 'declare'],
  drone: ['drone', 'uav', 'camera drone', 'battery', 'electronics'],
  laptop: ['laptop', 'computer', 'macbook', 'electronics', 'security'],
  camera: ['camera', 'dslr', 'photography', 'lens', 'battery'],
  razor: ['razor', 'blade', 'shaving', 'grooming']
};

function normalise(value: string) {
  return value.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function expandQuery(query: string) {
  const q = normalise(query);
  const words = q.split(' ').filter(Boolean);
  const expanded = new Set<string>(words);

  Object.entries(synonymMap).forEach(([key, synonyms]) => {
    if (q.includes(key) || synonyms.some((synonym) => q.includes(synonym))) {
      synonyms.forEach((synonym) => {
        normalise(synonym).split(' ').forEach((word) => expanded.add(word));
      });
    }
  });

  return Array.from(expanded);
}

export function smartSearch(query: string, limit = 12): Rule[] {
  const q = normalise(query);

  if (!q) return rules.slice(0, limit);

  const expandedTerms = expandQuery(q);

  return rules
    .map((rule) => {
      const item = normalise(rule.item);
      const category = normalise(rule.category);
      const answer = normalise(rule.shortAnswer);
      const tags = rule.tags.map(normalise);
      const allText = [item, category, answer, ...tags].join(' ');

      let score = 0;

      if (item === q) score += 30;
      if (item.includes(q)) score += 18;
      if (tags.some((tag) => tag === q)) score += 14;
      if (category.includes(q)) score += 8;
      if (answer.includes(q)) score += 5;

      expandedTerms.forEach((term) => {
        if (item.includes(term)) score += 6;
        if (tags.some((tag) => tag.includes(term))) score += 5;
        if (category.includes(term)) score += 3;
        if (answer.includes(term)) score += 2;
        if (allText.includes(term)) score += 1;
      });

      return { rule, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.rule);
}

export function getSmartAnswer(query: string) {
  const results = smartSearch(query, 1);
  return results[0] || null;
}
