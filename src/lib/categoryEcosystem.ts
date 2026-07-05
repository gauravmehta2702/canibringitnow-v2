import { rules } from '@/data/rules';

export function categorySlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getCategories() {
  return Array.from(new Set(rules.map((rule) => rule.category))).sort();
}

export function getCategoryRules(category: string) {
  return rules.filter((rule) => rule.category === category);
}

export function getTopCategoryHubs(limit = 12) {
  return getCategories().slice(0, limit).map((name) => ({
    name,
    slug: categorySlug(name),
    rules: getCategoryRules(name),
  }));
}

export function getCategorySearches(category: string) {
  const categoryRules = getCategoryRules(category).slice(0, 8);

  if (categoryRules.length > 0) {
    return categoryRules.map((rule) => rule.item);
  }

  return [
    `${category} in cabin baggage`,
    `${category} in checked luggage`,
    `${category} airport security rules`,
    `${category} airline rules`,
    `${category} customs rules`,
  ];
}
