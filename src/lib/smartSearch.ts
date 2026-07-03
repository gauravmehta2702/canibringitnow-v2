import { rules, type Rule } from '@/data/rules';

const synonymMap: Record<string, string[]> = {
  insulin: ['insulin', 'diabetes', 'diabetic', 'medicine', 'medication', 'injection', 'medical', 'glucose'],
  medication: ['medication', 'medicine', 'prescription', 'tablets', 'pills', 'doctor letter', 'medical', 'drug', 'pharmacy'],
  'power bank': ['power bank', 'portable charger', 'battery pack', 'powerbank', 'external battery', 'charging bank', 'phone charger', 'lithium battery'],
  battery: ['battery', 'batteries', 'lithium', 'power bank', 'portable charger', 'spare battery', 'camera battery', 'drone battery'],
  perfume: ['perfume', 'fragrance', 'aftershave', 'cologne', 'liquid', '100ml', 'toiletries'],
  deodorant: ['deodorant', 'aerosol', 'spray', 'roll on', 'toiletries', 'liquid', 'antiperspirant'],
  baby: ['baby', 'infant', 'formula', 'milk', 'baby food', 'stroller', 'pram', 'breast milk', 'bottle'],
  'baby milk': ['baby milk', 'formula', 'infant milk', 'baby formula', 'baby food', 'baby travel'],
  food: ['food', 'snacks', 'fruit', 'meat', 'chocolate', 'customs', 'declare', 'packed food', 'fresh food'],
  drone: ['drone', 'uav', 'camera drone', 'battery', 'electronics', 'drone battery'],
  laptop: ['laptop', 'computer', 'macbook', 'notebook', 'electronics', 'security'],
  camera: ['camera', 'dslr', 'photography', 'lens', 'battery', 'gopro'],
  razor: ['razor', 'blade', 'shaving', 'grooming', 'electric razor'],
  liquids: ['liquids', '100ml', 'liquid bag', 'toiletries', 'gel', 'cream', 'spray'],
  cpap: ['cpap', 'sleep apnea', 'breathing machine', 'medical device', 'medical equipment'],
};

function normalise(value: string) {
  return value.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function expandQuery(query: string) {
  const q = normalise(query);
  const words = q.split(' ').filter(Boolean);
  const expanded = new Set<string>(words);

  Object.entries(synonymMap).forEach(([key, synonyms]) => {
    if (q.includes(key) || synonyms.some((synonym) => q.includes(normalise(synonym)))) {
      synonyms.forEach((synonym) => normalise(synonym).split(' ').forEach((word) => expanded.add(word)));
    }
  });

  return Array.from(expanded);
}

function nearMatch(a: string, b: string) {
  if (a.length < 4 || b.length < 4) return false;
  return a.includes(b) || b.includes(a) || a.slice(0, 5) === b.slice(0, 5);
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
      const restrictions = rule.restrictions.map(normalise);
      const tips = rule.tips.map(normalise);
      const allText = [item, category, answer, ...tags, ...restrictions, ...tips].join(' ');

      let score = 0;
      if (item === q) score += 60;
      if (item.includes(q)) score += 35;
      if (tags.some((tag) => tag === q)) score += 28;
      if (category.includes(q)) score += 14;
      if (answer.includes(q)) score += 8;

      expandedTerms.forEach((term) => {
        if (item.includes(term)) score += 8;
        if (tags.some((tag) => tag.includes(term))) score += 7;
        if (category.includes(term)) score += 4;
        if (answer.includes(term)) score += 3;
        if (restrictions.some((restriction) => restriction.includes(term))) score += 3;
        if (tips.some((tip) => tip.includes(term))) score += 2;
        if (allText.includes(term)) score += 1;
        if (nearMatch(item, term) || tags.some((tag) => nearMatch(tag, term))) score += 2;
      });

      return { rule, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((result) => result.rule);
}

export function getSmartAnswer(query: string) {
  return smartSearch(query, 1)[0] || null;
}

export function getSearchSuggestions(query: string) {
  const results = smartSearch(query, 5);
  if (results.length > 0) return results.map((rule) => rule.item);
  return ['power bank', 'medication', 'baby formula', 'liquids', 'food customs'];
}
