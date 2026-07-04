import type { Rule } from '@/data/rules';

export type RevenueProduct = {
  title: string;
  description: string;
  searchTerm: string;
  category: string;
  intent: 'affiliate' | 'adsense-ready' | 'future-partner';
};

const fallbackProducts: RevenueProduct[] = [
  {
    title: 'Packing cubes',
    description: 'Keep cabin and checked baggage organised for faster airport checks.',
    searchTerm: 'travel packing cubes',
    category: 'Travel organisation',
    intent: 'affiliate',
  },
  {
    title: 'Digital luggage scale',
    description: 'Avoid surprise airline baggage charges before reaching the airport.',
    searchTerm: 'digital luggage scale travel',
    category: 'Baggage tools',
    intent: 'affiliate',
  },
  {
    title: 'Universal travel adapter',
    description: 'Useful for international trips with phones, laptops and cameras.',
    searchTerm: 'universal travel adapter',
    category: 'Electronics',
    intent: 'affiliate',
  },
];

const productMap: Record<string, RevenueProduct[]> = {
  Batteries: [
    {
      title: 'Airline-safe power bank',
      description: 'Choose a clearly labelled power bank and check the Wh rating before travel.',
      searchTerm: 'airline safe power bank 100Wh',
      category: 'Power & charging',
      intent: 'affiliate',
    },
    {
      title: 'Cable organiser pouch',
      description: 'Keep chargers, cables and batteries easy to inspect at security.',
      searchTerm: 'travel cable organiser pouch',
      category: 'Electronics',
      intent: 'affiliate',
    },
    {
      title: 'USB travel charger',
      description: 'A compact charger helps reduce loose electronics in your bag.',
      searchTerm: 'compact USB travel charger',
      category: 'Power & charging',
      intent: 'affiliate',
    },
  ],
  Electronics: [
    {
      title: 'Electronics organiser',
      description: 'Keep laptops, chargers, adapters and cables together.',
      searchTerm: 'electronics organiser travel case',
      category: 'Electronics',
      intent: 'affiliate',
    },
    {
      title: 'Universal travel adapter',
      description: 'Useful for international travel with laptops and phones.',
      searchTerm: 'universal travel adapter',
      category: 'Travel electronics',
      intent: 'affiliate',
    },
    {
      title: 'Laptop sleeve',
      description: 'Protect electronics and make security screening easier.',
      searchTerm: 'travel laptop sleeve',
      category: 'Electronics',
      intent: 'affiliate',
    },
  ],
  Medication: [
    {
      title: 'Travel medicine organiser',
      description: 'Keep medicine, prescriptions and small documents together.',
      searchTerm: 'travel medicine organiser',
      category: 'Health travel',
      intent: 'affiliate',
    },
    {
      title: 'Insulated medication pouch',
      description: 'Useful for temperature-sensitive medication during travel.',
      searchTerm: 'insulated medication travel pouch',
      category: 'Health travel',
      intent: 'affiliate',
    },
    {
      title: 'Clear document wallet',
      description: 'Carry prescriptions, doctor letters and insurance papers together.',
      searchTerm: 'clear travel document wallet',
      category: 'Documents',
      intent: 'affiliate',
    },
  ],
  'Baby travel': [
    {
      title: 'Insulated baby bottle bag',
      description: 'Keep baby milk and bottles organised for airport checks.',
      searchTerm: 'insulated baby bottle travel bag',
      category: 'Family travel',
      intent: 'affiliate',
    },
    {
      title: 'Formula dispenser',
      description: 'Pre-portion formula powder for easier travel days.',
      searchTerm: 'baby formula dispenser travel',
      category: 'Family travel',
      intent: 'affiliate',
    },
    {
      title: 'Baby travel organiser',
      description: 'Keep baby food, wipes and travel essentials together.',
      searchTerm: 'baby travel organiser bag',
      category: 'Family travel',
      intent: 'affiliate',
    },
  ],
  Liquids: [
    {
      title: 'Clear liquids bag',
      description: 'Make airport security faster by keeping liquids organised.',
      searchTerm: 'clear airport liquids bag',
      category: 'Airport security',
      intent: 'affiliate',
    },
    {
      title: 'Travel bottle set',
      description: 'Use small refillable bottles for toiletries and creams.',
      searchTerm: 'travel bottle set 100ml',
      category: 'Toiletries',
      intent: 'affiliate',
    },
    {
      title: 'Leakproof toiletry bag',
      description: 'Protect clothing and electronics from spills.',
      searchTerm: 'leakproof travel toiletry bag',
      category: 'Toiletries',
      intent: 'affiliate',
    },
  ],
  Cosmetics: [
    {
      title: 'Travel toiletry organiser',
      description: 'Keep makeup, perfume, deodorant and gels easier to inspect.',
      searchTerm: 'travel toiletry organiser',
      category: 'Toiletries',
      intent: 'affiliate',
    },
    {
      title: 'Clear liquids bag',
      description: 'Useful for perfume, gels, creams and liquid cosmetics.',
      searchTerm: 'clear airport liquids bag',
      category: 'Airport security',
      intent: 'affiliate',
    },
    {
      title: 'Travel-size containers',
      description: 'Decant toiletries into travel-size bottles before flying.',
      searchTerm: 'travel size toiletry containers',
      category: 'Toiletries',
      intent: 'affiliate',
    },
  ],
  'Food & customs': [
    {
      title: 'Travel snack organiser',
      description: 'Separate snacks from restricted or declarable food items.',
      searchTerm: 'travel snack organiser',
      category: 'Food travel',
      intent: 'affiliate',
    },
    {
      title: 'Reusable food containers',
      description: 'Keep dry food packed neatly and labelled.',
      searchTerm: 'travel food containers',
      category: 'Food travel',
      intent: 'affiliate',
    },
    {
      title: 'Packing cubes',
      description: 'Separate food, clothes and electronics for cleaner packing.',
      searchTerm: 'travel packing cubes',
      category: 'Travel organisation',
      intent: 'affiliate',
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

export function getRevenueDisclosure() {
  return 'Some links may become affiliate links. We only recommend products that are relevant to travel preparation.';
}
