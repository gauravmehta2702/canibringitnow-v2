export type Rule = {
  slug: string;
  item: string;
  category: string;
  shortAnswer: string;
  cabin: 'Allowed' | 'Restricted' | 'Not allowed';
  checked: 'Allowed' | 'Restricted' | 'Not allowed';
  warning?: string;
  affiliateType?: string;
  updated: string;
  tags: string[];
};

export const rules: Rule[] = [
  { slug:'power-bank-ryanair', item:'Power bank on Ryanair', category:'Batteries', shortAnswer:'Yes, but carry it in cabin baggage only. Do not place power banks in checked luggage.', cabin:'Allowed', checked:'Not allowed', warning:'Check watt-hour rating before travelling.', affiliateType:'Travel-safe power banks', updated:'2026-07-01', tags:['power bank','battery','ryanair','lithium'] },
  { slug:'baby-milk-plane', item:'Baby milk on a plane', category:'Baby travel', shortAnswer:'Usually allowed in reasonable quantities for the journey, but it may be screened separately at security.', cabin:'Allowed', checked:'Allowed', warning:'Carry baby items separately for inspection.', affiliateType:'Baby travel essentials', updated:'2026-07-01', tags:['baby milk','formula','infant','security'] },
  { slug:'medication-plane', item:'Medication on a plane', category:'Medication', shortAnswer:'Usually allowed. Keep medicine in original packaging and carry prescriptions where possible.', cabin:'Allowed', checked:'Allowed', warning:'Liquid medication may need extra screening.', affiliateType:'Travel medicine organisers', updated:'2026-07-01', tags:['medication','medicine','prescription','plane'] },
  { slug:'liquids-tsa', item:'Liquids under TSA rules', category:'Liquids', shortAnswer:'Liquids in carry-on are usually limited to small containers in a clear bag. Larger quantities may need checked baggage.', cabin:'Restricted', checked:'Allowed', warning:'Rules differ by country and airport.', affiliateType:'Clear liquid bags', updated:'2026-07-01', tags:['liquids','tsa','100ml','security'] },
  { slug:'deodorant-uk', item:'Deodorant in UK hand luggage', category:'Cosmetics', shortAnswer:'Usually allowed, but aerosols and gels must follow liquid restrictions in hand luggage.', cabin:'Restricted', checked:'Allowed', warning:'Aerosols may have quantity limits.', affiliateType:'Travel-size toiletries', updated:'2026-07-01', tags:['deodorant','uk','hand luggage','aerosol'] },
  { slug:'food-japan', item:'Food when travelling to Japan', category:'Food & customs', shortAnswer:'Some food is restricted or must be declared. Meat, plants, fruits and fresh foods can be heavily controlled.', cabin:'Restricted', checked:'Restricted', warning:'Always check customs rules before packing food.', affiliateType:'Travel snack organisers', updated:'2026-07-01', tags:['food','japan','customs','declare'] }
];

export const categories = ['Batteries','Liquids','Medication','Baby travel','Food & customs','Cosmetics','Electronics','Baggage'];
export const airlines = ['Ryanair','easyJet','British Airways','Emirates','Qatar Airways','Virgin Atlantic'];
export const countries = ['USA','Japan','India','Australia','Canada','UAE','Thailand','Singapore'];
