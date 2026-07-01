export type RuleStatus = 'Allowed' | 'Restricted' | 'Not allowed';

export type Rule = {
  slug: string;
  item: string;
  category: string;
  shortAnswer: string;
  cabin: RuleStatus;
  checked: RuleStatus;
  warning?: string;
  restrictions: string[];
  tips: string[];
  sourceNote: string;
  affiliateType?: string;
  updated: string;
  tags: string[];
};

export const rules: Rule[] = [
  {
    slug: 'power-bank-ryanair',
    item: 'Power bank on Ryanair',
    category: 'Batteries',
    shortAnswer: 'Yes, but carry it in cabin baggage only. Do not place power banks in checked luggage.',
    cabin: 'Allowed',
    checked: 'Not allowed',
    warning: 'Check the watt-hour rating before travelling. Very large battery packs may need airline approval.',
    restrictions: ['Carry in hand luggage only.', 'Protect terminals from short circuit.', 'Check battery Wh rating before travel.'],
    tips: ['Keep the power bank accessible at security.', 'Carry it in a pouch or original case.', 'Do not pack loose lithium batteries in checked luggage.'],
    sourceNote: 'Based on common airline and aviation safety guidance. Always check Ryanair and airport security rules before travel.',
    affiliateType: 'Travel-safe power banks',
    updated: '2026-07-01',
    tags: ['power bank', 'battery', 'ryanair', 'lithium', 'charger']
  },
  {
    slug: 'baby-milk-plane',
    item: 'Baby milk on a plane',
    category: 'Baby travel',
    shortAnswer: 'Usually allowed in reasonable quantities for the journey, but it may be screened separately at security.',
    cabin: 'Allowed',
    checked: 'Allowed',
    warning: 'Security officers may ask you to open containers for inspection.',
    restrictions: ['Carry baby milk separately for inspection.', 'Rules can vary by airport.', 'Only take reasonable quantities for the journey.'],
    tips: ['Place baby milk at the top of your bag.', 'Arrive early for screening.', 'Keep baby items together in a clear pouch.'],
    sourceNote: 'Based on common airport security guidance for infant feeding items. Confirm with your departure airport.',
    affiliateType: 'Baby travel essentials',
    updated: '2026-07-01',
    tags: ['baby milk', 'formula', 'infant', 'security', 'baby food']
  },
  {
    slug: 'medication-plane',
    item: 'Medication on a plane',
    category: 'Medication',
    shortAnswer: 'Usually allowed. Keep medicine in original packaging and carry prescriptions where possible.',
    cabin: 'Allowed',
    checked: 'Allowed',
    warning: 'Some medicines are controlled in certain countries and may need documents or approval.',
    restrictions: ['Keep medicine labelled where possible.', 'Carry prescriptions or doctor letters for important medication.', 'Check destination rules for controlled medicines.'],
    tips: ['Pack essential medication in cabin baggage.', 'Keep a copy of your prescription.', 'Use a small organiser for tablets and documents.'],
    sourceNote: 'Based on general travel medicine guidance. Confirm with airline, airport security and destination country rules.',
    affiliateType: 'Travel medicine organisers',
    updated: '2026-07-01',
    tags: ['medication', 'medicine', 'prescription', 'plane', 'liquid medication']
  },
  {
    slug: 'liquids-tsa',
    item: 'Liquids under TSA rules',
    category: 'Liquids',
    shortAnswer: 'Liquids in carry-on are usually limited to small containers in a clear bag. Larger quantities may need checked baggage.',
    cabin: 'Restricted',
    checked: 'Allowed',
    warning: 'Liquid rules differ by country and airport, especially for exemptions and duty-free items.',
    restrictions: ['Use travel-size containers.', 'Place liquids in a clear resealable bag.', 'Check airport rules before travelling.'],
    tips: ['Use refillable travel bottles.', 'Pack larger bottles in checked luggage.', 'Keep the liquids bag easy to remove.'],
    sourceNote: 'Based on common TSA-style security restrictions. Check the latest TSA or airport guidance before travel.',
    affiliateType: 'Clear liquid bags',
    updated: '2026-07-01',
    tags: ['liquids', 'tsa', '100ml', 'security', 'toiletries']
  },
  {
    slug: 'deodorant-uk',
    item: 'Deodorant in UK hand luggage',
    category: 'Cosmetics',
    shortAnswer: 'Usually allowed, but aerosols and gels must follow liquid restrictions in hand luggage.',
    cabin: 'Restricted',
    checked: 'Allowed',
    warning: 'Aerosols may have quantity and safety limits. Always check airport rules.',
    restrictions: ['Aerosol and gel deodorants usually count as liquids.', 'Travel-size containers are safest for cabin baggage.', 'Larger items are usually better packed in checked luggage.'],
    tips: ['Use solid stick deodorant to avoid liquid limits.', 'Keep aerosols capped.', 'Place liquid toiletries in a clear bag.'],
    sourceNote: 'Based on common UK airport security rules for liquids and aerosols. Confirm with your airport.',
    affiliateType: 'Travel-size toiletries',
    updated: '2026-07-01',
    tags: ['deodorant', 'uk', 'hand luggage', 'aerosol', 'toiletries']
  },
  {
    slug: 'food-japan',
    item: 'Food when travelling to Japan',
    category: 'Food & customs',
    shortAnswer: 'Some food is restricted or must be declared. Meat, plants, fruits and fresh foods can be heavily controlled.',
    cabin: 'Restricted',
    checked: 'Restricted',
    warning: 'Customs rules can be strict. Do not pack high-risk food unless you have checked official rules.',
    restrictions: ['Fresh fruit, meat and plant products may be restricted.', 'Some food may need declaration.', 'Rules depend on the exact product and origin country.'],
    tips: ['Avoid packing fresh food unless necessary.', 'Keep commercial packaging and ingredient labels.', 'Declare items when required.'],
    sourceNote: 'Based on general customs guidance. Confirm with Japan customs/quarantine rules before travel.',
    affiliateType: 'Travel snack organisers',
    updated: '2026-07-01',
    tags: ['food', 'japan', 'customs', 'declare', 'quarantine']
  }
];

export const categories = ['Batteries', 'Liquids', 'Medication', 'Baby travel', 'Food & customs', 'Cosmetics', 'Electronics', 'Baggage'];
export const airlines = ['Ryanair', 'easyJet', 'British Airways', 'Emirates', 'Qatar Airways', 'Virgin Atlantic'];
export const countries = ['USA', 'Japan', 'India', 'Australia', 'Canada', 'UAE', 'Thailand', 'Singapore'];
