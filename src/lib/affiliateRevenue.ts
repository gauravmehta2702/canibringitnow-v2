import type { Rule } from '@/data/rules';

export type AffiliateProduct = {
  id: string;
  title: string;
  description: string;
  category: string;
  searchTerm: string;
  merchant: 'amazon';
};

const DEFAULT_PRODUCTS: AffiliateProduct[] = [
  {
    id: 'packing-cubes',
    title: 'Packing cubes',
    description: 'Organise cabin and checked luggage before airport checks.',
    category: 'Packing',
    searchTerm: 'travel packing cubes',
    merchant: 'amazon',
  },
  {
    id: 'luggage-scale',
    title: 'Digital luggage scale',
    description: 'Check baggage weight before you reach the airport.',
    category: 'Baggage',
    searchTerm: 'digital luggage scale travel',
    merchant: 'amazon',
  },
  {
    id: 'travel-adapter',
    title: 'Universal travel adapter',
    description: 'Useful for international trips with phones, laptops and cameras.',
    category: 'Electronics',
    searchTerm: 'universal travel adapter',
    merchant: 'amazon',
  },
];

const CATEGORY_PRODUCTS: Record<string, AffiliateProduct[]> = {
  Batteries: [
    {
      id: 'airline-safe-power-bank',
      title: 'Airline-safe power bank',
      description: 'Look for a clearly labelled power bank and check the Wh rating.',
      category: 'Power',
      searchTerm: 'airline safe power bank 100Wh',
      merchant: 'amazon',
    },
    {
      id: 'cable-organiser',
      title: 'Cable organiser pouch',
      description: 'Keep chargers, cables and small electronics easy to inspect.',
      category: 'Electronics',
      searchTerm: 'travel cable organiser pouch',
      merchant: 'amazon',
    },
    {
      id: 'usb-travel-charger',
      title: 'Compact USB travel charger',
      description: 'Reduce loose plugs and cables in your cabin bag.',
      category: 'Power',
      searchTerm: 'compact USB travel charger',
      merchant: 'amazon',
    },
  ],
  Medication: [
    {
      id: 'medicine-organiser',
      title: 'Travel medicine organiser',
      description: 'Keep medicines, prescriptions and documents together.',
      category: 'Health',
      searchTerm: 'travel medicine organiser',
      merchant: 'amazon',
    },
    {
      id: 'insulated-medication-pouch',
      title: 'Insulated medication pouch',
      description: 'Useful for temperature-sensitive medication during travel.',
      category: 'Health',
      searchTerm: 'insulated medication travel pouch',
      merchant: 'amazon',
    },
    {
      id: 'document-wallet',
      title: 'Clear document wallet',
      description: 'Carry prescriptions, doctor letters and insurance papers together.',
      category: 'Documents',
      searchTerm: 'clear travel document wallet',
      merchant: 'amazon',
    },
  ],
  'Baby travel': [
    {
      id: 'baby-bottle-bag',
      title: 'Insulated baby bottle bag',
      description: 'Keep baby milk and bottles organised for airport checks.',
      category: 'Baby travel',
      searchTerm: 'insulated baby bottle travel bag',
      merchant: 'amazon',
    },
    {
      id: 'formula-dispenser',
      title: 'Formula dispenser',
      description: 'Pre-portion baby formula for easier travel days.',
      category: 'Baby travel',
      searchTerm: 'baby formula dispenser travel',
      merchant: 'amazon',
    },
    {
      id: 'baby-travel-organiser',
      title: 'Baby travel organiser',
      description: 'Keep baby food, wipes and essentials together.',
      category: 'Baby travel',
      searchTerm: 'baby travel organiser bag',
      merchant: 'amazon',
    },
  ],
  Liquids: [
    {
      id: 'clear-liquids-bag',
      title: 'Clear liquids bag',
      description: 'Make airport security faster by keeping liquids organised.',
      category: 'Airport security',
      searchTerm: 'clear airport liquids bag',
      merchant: 'amazon',
    },
    {
      id: 'travel-bottles',
      title: 'Travel bottle set',
      description: 'Use small refillable bottles for toiletries and creams.',
      category: 'Toiletries',
      searchTerm: 'travel bottle set 100ml',
      merchant: 'amazon',
    },
    {
      id: 'leakproof-toiletry-bag',
      title: 'Leakproof toiletry bag',
      description: 'Protect clothes and electronics from spills.',
      category: 'Toiletries',
      searchTerm: 'leakproof travel toiletry bag',
      merchant: 'amazon',
    },
  ],
};

export function getAffiliateProducts(rule?: Rule): AffiliateProduct[] {
  if (!rule) return DEFAULT_PRODUCTS;
  return CATEGORY_PRODUCTS[rule.category] || DEFAULT_PRODUCTS;
}

export function getAffiliateUrl(product: AffiliateProduct) {
  const tag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;
  const query = encodeURIComponent(product.searchTerm);
  if (tag) return `https://www.amazon.co.uk/s?k=${query}&tag=${encodeURIComponent(tag)}`;
  return `https://www.amazon.co.uk/s?k=${query}`;
}
