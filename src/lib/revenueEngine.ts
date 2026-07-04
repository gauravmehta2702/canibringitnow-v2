import type { Rule } from '@/data/rules';

export type RevenueProduct = {
  title: string;
  description: string;
  searchTerm: string;
  category: string;
};

const fallbackProducts: RevenueProduct[] = [
  {
    title: 'Packing cubes',
    description: 'Keep cabin and checked baggage organised for faster airport checks.',
    searchTerm: 'travel packing cubes',
    category: 'Travel organisation',
  },
  {
    title: 'Digital luggage scale',
    description: 'Avoid surprise airline baggage charges before reaching the airport.',
    searchTerm: 'digital luggage scale travel',
    category: 'Baggage tools',
  },
  {
    title: 'Universal travel adapter',
    description: 'Useful for international trips with phones, laptops and cameras.',
    searchTerm: 'universal travel adapter',
    category: 'Electronics',
  },
];

const productMap: Record<string, RevenueProduct[]> = {
  Batteries: [
    {
      title: 'Airline-safe power bank',
      description: 'Choose a clearly labelled power bank and check the Wh rating before travel.',
      searchTerm: 'airline safe power bank 100Wh',
      category: 'Power & charging',
    },
    {
      title: 'Cable organiser pouch',
      description: 'Keep chargers, cables and batteries easy to inspect at security.',
      searchTerm: 'travel cable organiser pouch',
      category: 'Electronics',
    },
    {
      title: 'USB travel charger',
      description: 'A compact charger helps reduce loose electronics in your bag.',
      searchTerm: 'compact USB travel charger',
      category: 'Power & charging',
    },
  ],
  Medication: [
    {
      title: 'Travel medicine organiser',
      description: 'Keep medicine, prescriptions and small documents together.',
      searchTerm: 'travel medicine organiser',
      category: 'Health travel',
    },
    {
      title: 'Insulated medication pouch',
      description: 'Useful for temperature-sensitive medication during travel.',
      searchTerm: 'insulated medication travel pouch',
      category: 'Health travel',
    },
    {
      title: 'Clear document wallet',
      description: 'Carry prescriptions, doctor letters and insurance papers together.',
      searchTerm: 'clear travel document wallet',
      category: 'Documents',
    },
  ],
  'Baby travel': [
    {
      title: 'Insulated baby bottle bag',
      description: 'Keep baby milk and bottles organised for airport checks.',
      searchTerm: 'insulated baby bottle travel bag',
      category: 'Family travel',
    },
    {
      title: 'Formula dispenser',
      description: 'Pre-portion formula powder for easier travel days.',
      searchTerm: 'baby formula dispenser travel',
      category: 'Family travel',
    },
    {
      title: 'Baby travel organiser',
      description: 'Keep baby food, wipes and travel essentials together.',
      searchTerm: 'baby travel organiser bag',
      category: 'Family travel',
    },
  ],
  Liquids: [
    {
      title: 'Clear liquids bag',
      description: 'Make airport security faster by keeping liquids organised.',
      searchTerm: 'clear airport liquids bag',
      category: 'Airport security',
    },
    {
      title: 'Travel bottle set',
      description: 'Use small refillable bottles for toiletries and creams.',
      searchTerm: 'travel bottle set 100ml',
      category: 'Toiletries',
    },
    {
      title: 'Leakproof toiletry bag',
      description: 'Protect clothing and electronics from spills.',
      searchTerm: 'leakproof travel toiletry bag',
      category: 'Toiletries',
    },
  ],
};

export function getRevenueProducts(rule?: Rule): RevenueProduct[] {
  if (!rule) return fallbackProducts;
  return productMap[rule.category] || fallbackProducts;
}

export function getAffiliateSearchUrl(searchTerm: string) {
  const tag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;
  const encoded = encodeURIComponent(searchTerm);

  if (tag) {
    return `https://www.amazon.co.uk/s?k=${encoded}&tag=${encodeURIComponent(tag)}`;
  }

  return `https://www.amazon.co.uk/s?k=${encoded}`;
}
