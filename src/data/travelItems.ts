export type TravelDecision = 'Allowed' | 'Restricted' | 'Not allowed';
export type TravelRisk = 'Low' | 'Medium' | 'High';

export type TravelItem = {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  category: string;
  shortAnswer: string;
  cabin: TravelDecision;
  checked: TravelDecision;
  risk: TravelRisk;
  confidence: number;
  warning?: string;
  relatedItems: string[];
  tags: string[];
  updated: string;
  affiliateType?: string;
  officialSources: {
    label: string;
    type: 'Airline' | 'Airport security' | 'Customs' | 'Government' | 'General';
    url?: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const travelItems: TravelItem[] = [
  {
    id: 'power-bank',
    slug: 'power-bank',
    name: 'Power bank',
    aliases: ['portable charger', 'battery pack', 'powerbank', 'external battery', 'charging bank'],
    category: 'Batteries',
    shortAnswer: 'Power banks are usually allowed in cabin baggage only and should not be packed in checked luggage.',
    cabin: 'Allowed',
    checked: 'Not allowed',
    risk: 'Medium',
    confidence: 0.92,
    warning: 'Check the watt-hour rating before travelling. Airlines may restrict large lithium batteries.',
    relatedItems: ['lithium-battery', 'laptop', 'camera', 'charger'],
    tags: ['power bank', 'battery', 'lithium', 'portable charger', 'electronics'],
    updated: '2026-07-01',
    affiliateType: 'Travel-safe power banks',
    officialSources: [
      { label: 'Airline baggage rules', type: 'Airline' },
      { label: 'Airport security guidance', type: 'Airport security' },
    ],
    faqs: [
      { question: 'Can I put a power bank in checked luggage?', answer: 'Usually no. Power banks are normally required to stay in cabin baggage because they contain lithium batteries.' },
      { question: 'Can I carry more than one power bank?', answer: 'Usually yes, but airlines may limit quantity and capacity. Check the watt-hour rating before travel.' },
    ],
  },
  {
    id: 'baby-formula',
    slug: 'baby-formula',
    name: 'Baby formula',
    aliases: ['baby milk', 'infant milk', 'formula milk', 'baby food', 'baby bottle'],
    category: 'Baby travel',
    shortAnswer: 'Baby formula is usually allowed in reasonable quantities for the journey, but it may be screened separately.',
    cabin: 'Allowed',
    checked: 'Allowed',
    risk: 'Low',
    confidence: 0.9,
    warning: 'Carry baby items separately so they can be inspected at security.',
    relatedItems: ['baby-food', 'liquids', 'medication'],
    tags: ['baby milk', 'formula', 'infant', 'baby travel', 'security'],
    updated: '2026-07-01',
    affiliateType: 'Baby travel essentials',
    officialSources: [
      { label: 'Airport security guidance', type: 'Airport security' },
      { label: 'Airline family travel rules', type: 'Airline' },
    ],
    faqs: [
      { question: 'Can baby formula be over 100ml?', answer: 'In many airports, baby milk and formula for the journey may be allowed over normal liquid limits, but it can require separate screening.' },
    ],
  },
  {
    id: 'medication',
    slug: 'medication',
    name: 'Medication',
    aliases: ['medicine', 'prescription', 'pills', 'tablets', 'doctor medicine', 'medical items'],
    category: 'Medication',
    shortAnswer: 'Medication is usually allowed. Keep it in original packaging and carry prescriptions where possible.',
    cabin: 'Allowed',
    checked: 'Allowed',
    risk: 'Medium',
    confidence: 0.88,
    warning: 'Some medicines are restricted by destination country. Check rules before international travel.',
    relatedItems: ['insulin', 'liquid-medication', 'medical-devices'],
    tags: ['medication', 'medicine', 'prescription', 'plane', 'medical'],
    updated: '2026-07-01',
    affiliateType: 'Travel medicine organisers',
    officialSources: [
      { label: 'Destination customs authority', type: 'Customs' },
      { label: 'Airline medical guidance', type: 'Airline' },
    ],
    faqs: [
      { question: 'Should medicine go in cabin baggage?', answer: 'Important medication should usually be carried in cabin baggage so it remains accessible during the journey.' },
      { question: 'Do I need a prescription letter?', answer: 'A prescription or doctor letter is recommended, especially for liquid medicine, injections or controlled medication.' },
    ],
  },
  {
    id: 'liquids',
    slug: 'liquids',
    name: 'Liquids',
    aliases: ['100ml liquids', 'liquid bag', 'toiletries', 'gels', 'creams', 'sprays'],
    category: 'Liquids',
    shortAnswer: 'Liquids in carry-on baggage are usually restricted to small containers in a clear bag.',
    cabin: 'Restricted',
    checked: 'Allowed',
    risk: 'Medium',
    confidence: 0.9,
    warning: 'Rules differ by airport and country. Check the latest security guidance before travel.',
    relatedItems: ['perfume', 'deodorant', 'shampoo', 'toothpaste'],
    tags: ['liquids', '100ml', 'security', 'toiletries', 'gel'],
    updated: '2026-07-01',
    affiliateType: 'Clear liquid bags',
    officialSources: [{ label: 'Airport security guidance', type: 'Airport security' }],
    faqs: [
      { question: 'Are liquids allowed in hand luggage?', answer: 'Usually yes, but only within airport security limits such as small containers inside a clear liquids bag.' },
    ],
  },
  {
    id: 'perfume',
    slug: 'perfume',
    name: 'Perfume',
    aliases: ['fragrance', 'aftershave', 'cologne', 'scent'],
    category: 'Cosmetics',
    shortAnswer: 'Perfume is usually allowed in hand luggage if it follows liquid restrictions.',
    cabin: 'Restricted',
    checked: 'Allowed',
    risk: 'Low',
    confidence: 0.86,
    warning: 'Perfume in cabin baggage usually needs to follow liquid size limits.',
    relatedItems: ['liquids', 'deodorant', 'cosmetics'],
    tags: ['perfume', 'fragrance', 'liquids', '100ml', 'cosmetics'],
    updated: '2026-07-01',
    affiliateType: 'Travel-size toiletries',
    officialSources: [{ label: 'Airport security guidance', type: 'Airport security' }],
    faqs: [
      { question: 'Can perfume go in checked luggage?', answer: 'Perfume is usually allowed in checked luggage, but quantity and airline rules may apply.' },
    ],
  },
  {
    id: 'food',
    slug: 'food',
    name: 'Food',
    aliases: ['snacks', 'chocolate', 'fruit', 'meat', 'fresh food', 'packed food'],
    category: 'Food & customs',
    shortAnswer: 'Food rules depend heavily on the destination. Some foods may be restricted or must be declared.',
    cabin: 'Restricted',
    checked: 'Restricted',
    risk: 'High',
    confidence: 0.82,
    warning: 'Meat, plants, fruit, seeds and fresh foods can be heavily restricted by customs.',
    relatedItems: ['customs', 'snacks', 'baby-food'],
    tags: ['food', 'customs', 'declare', 'fruit', 'meat', 'snacks'],
    updated: '2026-07-01',
    affiliateType: 'Travel snack organisers',
    officialSources: [{ label: 'Destination customs authority', type: 'Customs' }],
    faqs: [
      { question: 'Do I need to declare food?', answer: 'Many countries require some foods to be declared. Always check destination customs rules before packing food.' },
    ],
  },
];
