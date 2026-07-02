import { rules } from '@/data/rules';

export function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getCategoryDescription(category: string) {
  const descriptions: Record<string, string> = {
    Batteries: 'Check travel rules for power banks, lithium batteries, chargers and electronic accessories before you fly.',
    Liquids: 'Understand cabin baggage liquid rules, airport security limits and checked baggage options.',
    Medication: 'Prepare for travel with medicine, prescriptions, liquid medication and health-related items.',
    'Baby travel': 'Check rules for baby milk, formula, baby food and family travel essentials.',
    'Food & customs': 'Understand food, customs and declaration rules before travelling internationally.',
    Cosmetics: 'Check rules for toiletries, deodorant, perfume, sprays, gels and travel-size products.',
    Electronics: 'Travel guidance for laptops, cameras, drones, batteries, chargers and electronic devices.',
    Baggage: 'Understand cabin baggage, checked baggage and airport packing rules.',
  };

  return descriptions[category] || `Browse travel rules for ${category.toLowerCase()} items.`;
}

export function getCategories() {
  const uniqueCategories = Array.from(new Set(rules.map((rule) => rule.category)));

  return uniqueCategories.map((category) => {
    const categoryRules = rules.filter((rule) => rule.category === category);

    return {
      name: category,
      slug: slugify(category),
      rules: categoryRules,
      count: categoryRules.length,
      description: getCategoryDescription(category),
    };
  });
}

export function getCategoryBySlug(slug: string) {
  return getCategories().find((category) => category.slug === slug);
}
