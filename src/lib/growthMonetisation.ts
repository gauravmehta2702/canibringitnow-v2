import { rules } from '@/data/rules';

export type GrowthProduct = {
  title: string;
  category: string;
  description: string;
  searchUrl: string;
};

const products: GrowthProduct[] = [
  { title: 'Clear airport liquids bag', category: 'Airport security', description: 'Useful for toiletries, liquids and airport screening.', searchUrl: '/search/?q=liquids%20bag%20airport%20security' },
  { title: 'Digital luggage scale', category: 'Baggage', description: 'Helps avoid overweight cabin or checked baggage fees.', searchUrl: '/search/?q=digital%20luggage%20scale' },
  { title: 'Universal travel adapter', category: 'Electronics', description: 'Useful for international trips with phones, laptops and chargers.', searchUrl: '/search/?q=universal%20travel%20adapter' },
  { title: 'Medicine organiser', category: 'Medication', description: 'Useful for keeping medication organised during travel.', searchUrl: '/search/?q=medicine%20organiser%20travel' },
  { title: 'Insulated baby bottle bag', category: 'Baby travel', description: 'Useful for baby milk, formula and feeding items.', searchUrl: '/search/?q=insulated%20baby%20bottle%20bag' },
  { title: 'Cable organiser pouch', category: 'Electronics', description: 'Useful for cables, chargers, adapters and small electronics.', searchUrl: '/search/?q=travel%20cable%20organiser' },
];

export function getGrowthProducts(ruleCategory?: string) {
  if (!ruleCategory) return products.slice(0, 4);
  const category = ruleCategory.toLowerCase();
  const priority = products.filter((product) =>
    product.category.toLowerCase().includes(category) ||
    category.includes(product.category.toLowerCase()) ||
    (category.includes('battery') && product.category === 'Electronics') ||
    (category.includes('baby') && product.category === 'Baby travel') ||
    (category.includes('medicine') && product.category === 'Medication')
  );
  const fallback = products.filter((product) => !priority.includes(product));
  return [...priority, ...fallback].slice(0, 4);
}

export function getHighValueActions(ruleSlug?: string) {
  const current = rules.find((rule) => rule.slug === ruleSlug);
  return [
    { title: 'Check another item', description: 'Search another travel item before you fly.', href: '/search/' },
    { title: 'Open airline hubs', description: 'Compare common baggage checks by airline.', href: '/airline-hub/' },
    { title: 'Open destination hubs', description: 'Check customs and country-specific travel rules.', href: '/country-hub/' },
    { title: current ? `More ${current.category} rules` : 'Open category hubs', description: 'Browse related rules by item category.', href: current ? `/categories/${current.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/` : '/category-hub/' },
  ];
}

export function getAdPlacementLabel(slot: 'top' | 'middle' | 'bottom') {
  if (slot === 'top') return 'Sponsored travel tool';
  if (slot === 'middle') return 'Helpful travel product';
  return 'Travel preparation offer';
}
