import { airlines, countries, rules, type Rule } from '@/data/rules';

export type OrbitCard = {
  title: string;
  href: string;
  label: string;
  description: string;
};

export type OrbitAirport = {
  name: string;
  slug: string;
  city: string;
  country: string;
  code: string;
  focus: string[];
};

export type OrbitDeal = {
  title: string;
  href: string;
  label: string;
  description: string;
  intent: 'High' | 'Medium' | 'Low';
};

export function orbitSlug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function cleanOrbitItem(item: string) {
  return item
    .replace(/\bon a plane\b/gi, '')
    .replace(/\bin hand luggage\b/gi, '')
    .replace(/\bin checked baggage\b/gi, '')
    .replace(/\bwhen travelling\b/gi, '')
    .trim();
}

export const orbitAirports: OrbitAirport[] = [
  { name: 'Heathrow Airport', slug: 'heathrow', city: 'London', country: 'United Kingdom', code: 'LHR', focus: ['liquids', 'power banks', 'medication', 'family travel', 'airport hotels'] },
  { name: 'Gatwick Airport', slug: 'gatwick', city: 'London', country: 'United Kingdom', code: 'LGW', focus: ['liquids', 'cabin bags', 'family travel', 'airport hotels'] },
  { name: 'Manchester Airport', slug: 'manchester', city: 'Manchester', country: 'United Kingdom', code: 'MAN', focus: ['liquids', 'electronics', 'baggage', 'airport parking'] },
  { name: 'Dubai International Airport', slug: 'dubai-international', city: 'Dubai', country: 'United Arab Emirates', code: 'DXB', focus: ['transit', 'customs', 'medication', 'electronics', 'airport hotels'] },
  { name: 'Hamad International Airport', slug: 'hamad-international', city: 'Doha', country: 'Qatar', code: 'DOH', focus: ['transit', 'batteries', 'lounge access', 'family travel'] },
  { name: 'Singapore Changi Airport', slug: 'singapore-changi', city: 'Singapore', country: 'Singapore', code: 'SIN', focus: ['transit', 'family travel', 'electronics', 'airport hotels'] },
  { name: 'Tokyo Haneda Airport', slug: 'tokyo-haneda', city: 'Tokyo', country: 'Japan', code: 'HND', focus: ['Japan customs', 'medication', 'transport', 'airport hotels'] },
  { name: 'Narita International Airport', slug: 'narita-international', city: 'Tokyo', country: 'Japan', code: 'NRT', focus: ['Japan customs', 'food rules', 'medication', 'airport hotels'] },
  { name: 'John F. Kennedy International Airport', slug: 'jfk', city: 'New York', country: 'USA', code: 'JFK', focus: ['TSA', 'liquids', 'medication', 'electronics'] },
  { name: 'Los Angeles International Airport', slug: 'lax', city: 'Los Angeles', country: 'USA', code: 'LAX', focus: ['TSA', 'electronics', 'customs', 'family travel'] },
  { name: 'Indira Gandhi International Airport', slug: 'delhi-airport', city: 'Delhi', country: 'India', code: 'DEL', focus: ['customs', 'food', 'medication', 'baggage'] },
  { name: 'Mumbai International Airport', slug: 'mumbai-airport', city: 'Mumbai', country: 'India', code: 'BOM', focus: ['customs', 'baggage', 'electronics', 'family travel'] },
  { name: 'Toronto Pearson Airport', slug: 'toronto-pearson', city: 'Toronto', country: 'Canada', code: 'YYZ', focus: ['customs', 'medication', 'food', 'winter travel'] },
  { name: 'Sydney Airport', slug: 'sydney-airport', city: 'Sydney', country: 'Australia', code: 'SYD', focus: ['customs', 'food', 'medicine', 'batteries'] },
  { name: 'Paris Charles de Gaulle Airport', slug: 'paris-cdg', city: 'Paris', country: 'France', code: 'CDG', focus: ['EU security', 'liquids', 'family travel', 'airport hotels'] },
  { name: 'Frankfurt Airport', slug: 'frankfurt-airport', city: 'Frankfurt', country: 'Germany', code: 'FRA', focus: ['EU security', 'transit', 'electronics', 'airport hotels'] },
];

export function getOrbitAirport(slug: string) {
  return orbitAirports.find((airport) => airport.slug === slug);
}

export function getOrbitItemHubs(limit = 80) {
  const seen = new Set<string>();
  return rules
    .map((rule) => ({
      slug: orbitSlug(cleanOrbitItem(rule.item)),
      item: cleanOrbitItem(rule.item),
      rule,
    }))
    .filter((entry) => {
      if (!entry.slug || seen.has(entry.slug)) return false;
      seen.add(entry.slug);
      return true;
    })
    .slice(0, limit);
}

export function getOrbitItemHub(slug: string) {
  return getOrbitItemHubs(200).find((hub) => hub.slug === slug);
}

export function getOrbitAirlineHub(slug: string) {
  return airlines.find((airline) => orbitSlug(airline) === slug);
}

export function getOrbitCountryHub(slug: string) {
  return countries.find((country) => orbitSlug(country) === slug);
}

export function getRelatedRulesForText(text: string, limit = 9) {
  const terms = text.toLowerCase().split(/[^a-z0-9]+/).filter((term) => term.length > 2);
  return rules
    .map((rule) => {
      const haystack = `${rule.item} ${rule.category} ${rule.shortAnswer} ${rule.tags.join(' ')}`.toLowerCase();
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { rule, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.rule);
}

export function getHubCardsForRule(rule: Rule): OrbitCard[] {
  const item = cleanOrbitItem(rule.item);
  return [
    { title: `${item} airline rules`, href: `/topics/${rule.slug}-airline-rules/`, label: 'Airline cluster', description: `Compare ${item.toLowerCase()} across airline contexts.` },
    { title: `${item} country rules`, href: `/topics/${rule.slug}-country-rules/`, label: 'Country cluster', description: `Check ${item.toLowerCase()} with destination and customs context.` },
    { title: `${item} packing guide`, href: `/topics/${rule.slug}-packing-guide/`, label: 'Packing', description: `Plan how to pack ${item.toLowerCase()} before travelling.` },
    { title: `${item} questions`, href: `/questions/can-i-bring-${rule.slug}/`, label: 'Questions', description: `Answer common questions about ${item.toLowerCase()}.` },
    { title: `Search ${item}`, href: `/search/?q=${encodeURIComponent(item)}`, label: 'Search', description: `Search every related travel check for ${item.toLowerCase()}.` },
    { title: `Trip planner`, href: `/trip-planner/`, label: 'Tool', description: 'Combine airline, destination and packed items in one plan.' },
  ];
}

export function getAirlineHubCards(airline: string): OrbitCard[] {
  const priorityRules = rules.slice(0, 12);
  const ruleCards = priorityRules.map((rule) => ({
    title: `${cleanOrbitItem(rule.item)} on ${airline}`,
    href: `/search/?q=${encodeURIComponent(`${cleanOrbitItem(rule.item)} on ${airline}`)}`,
    label: rule.category,
    description: `Check ${cleanOrbitItem(rule.item).toLowerCase()} with ${airline} baggage context.`,
  }));

  return [
    ...ruleCards,
    { title: `${airline} baggage questions`, href: `/search/?q=${encodeURIComponent(`${airline} baggage rules`)}`, label: 'Baggage', description: `Find baggage and packing questions for ${airline}.` },
    { title: `${airline} trip planner`, href: `/trip-planner/`, label: 'Planner', description: `Plan a trip using ${airline} with items and destination context.` },
  ].slice(0, 15);
}

export function getCountryHubCards(country: string): OrbitCard[] {
  const priorityRules = rules.slice(0, 12);
  const ruleCards = priorityRules.map((rule) => ({
    title: `${cleanOrbitItem(rule.item)} to ${country}`,
    href: `/search/?q=${encodeURIComponent(`${cleanOrbitItem(rule.item)} to ${country}`)}`,
    label: rule.category,
    description: `Check ${cleanOrbitItem(rule.item).toLowerCase()} with ${country} customs and destination context.`,
  }));

  return [
    ...ruleCards,
    { title: `${country} customs questions`, href: `/search/?q=${encodeURIComponent(`${country} customs rules`)}`, label: 'Customs', description: `Search customs and border rule questions for ${country}.` },
    { title: `${country} destination guide`, href: `/destinations/${orbitSlug(country)}/`, label: 'Destination', description: `Open the ${country} destination preparation guide.` },
    { title: `${country} hotels and travel deals`, href: `/travel-deals/${orbitSlug(country)}/`, label: 'Deals', description: `View travel-deal ideas connected to ${country}.` },
  ].slice(0, 15);
}

export function getAirportHubCards(airport: OrbitAirport): OrbitCard[] {
  const focusCards = airport.focus.map((focus) => ({
    title: `${focus} at ${airport.name}`,
    href: `/search/?q=${encodeURIComponent(`${focus} ${airport.name}`)}`,
    label: 'Airport topic',
    description: `Search ${focus} guidance connected to ${airport.name}.`,
  }));

  return [
    ...focusCards,
    { title: `${airport.city} airport hotels`, href: `/search/?q=${encodeURIComponent(`top 5 airport hotels near ${airport.name}`)}`, label: 'Hotels', description: `Find airport hotel ideas near ${airport.name}.` },
    { title: `${airport.city} transport`, href: `/search/?q=${encodeURIComponent(`${airport.name} transport to city centre`)}`, label: 'Transport', description: `Plan airport transport for ${airport.city}.` },
    { title: `${airport.name} family travel`, href: `/search/?q=${encodeURIComponent(`${airport.name} family travel baby facilities`)}`, label: 'Family', description: `Find family and baby travel questions for ${airport.name}.` },
    { title: `${airport.name} rules`, href: `/search/?q=${encodeURIComponent(`${airport.name} security rules`)}`, label: 'Security', description: `Search airport security rules for ${airport.name}.` },
  ].slice(0, 12);
}

export function getOrbitDeals(countryOrCity = 'Japan'): OrbitDeal[] {
  return [
    { title: `Cheap flights to ${countryOrCity}`, href: `/search/?q=${encodeURIComponent(`cheap flights to ${countryOrCity}`)}`, label: 'Flights', intent: 'High', description: `Flight-deal research page idea for travellers going to ${countryOrCity}.` },
    { title: `Top 5 budget hotels in ${countryOrCity}`, href: `/search/?q=${encodeURIComponent(`top 5 budget hotels in ${countryOrCity}`)}`, label: 'Budget hotels', intent: 'High', description: `Budget hotel guide angle for ${countryOrCity}.` },
    { title: `Top 5 family hotels in ${countryOrCity}`, href: `/search/?q=${encodeURIComponent(`top 5 family hotels in ${countryOrCity}`)}`, label: 'Family hotels', intent: 'Medium', description: `Family hotel guide angle for ${countryOrCity}.` },
    { title: `Airport hotels in ${countryOrCity}`, href: `/search/?q=${encodeURIComponent(`airport hotels in ${countryOrCity}`)}`, label: 'Airport hotels', intent: 'Medium', description: `Airport hotel guide angle for arrivals, stopovers and early flights.` },
    { title: `${countryOrCity} eSIM deals`, href: `/search/?q=${encodeURIComponent(`${countryOrCity} eSIM deals`)}`, label: 'eSIM', intent: 'High', description: `Connectivity deal angle for travellers.` },
    { title: `${countryOrCity} travel insurance`, href: `/search/?q=${encodeURIComponent(`${countryOrCity} travel insurance`)}`, label: 'Insurance', intent: 'High', description: `Insurance comparison angle for international travellers.` },
    { title: `Best travel adapter for ${countryOrCity}`, href: `/search/?q=${encodeURIComponent(`best travel adapter for ${countryOrCity}`)}`, label: 'Gear', intent: 'Medium', description: `Travel gear recommendation angle.` },
    { title: `Best power bank for travel`, href: `/search/?q=best%20power%20bank%20for%20travel`, label: 'Electronics', intent: 'Medium', description: `Electronics guide linked to battery travel rules.` },
  ];
}

export function getDiscoverStories(): OrbitCard[] {
  return [
    { title: '10 airport security mistakes travellers make', href: '/search/?q=airport%20security%20mistakes', label: 'Discover', description: 'High-click travel advice story for Google Discover and social sharing.' },
    { title: 'Countries where medicine rules can surprise travellers', href: '/search/?q=medicine%20rules%20by%20country', label: 'Medication', description: 'Useful story connecting medication, customs and destination rules.' },
    { title: 'Power bank rules explained before your next flight', href: '/search/?q=power%20bank%20rules%20explained', label: 'Batteries', description: 'Clear explanation of battery and cabin baggage restrictions.' },
    { title: 'What airport security may ask you to remove from your bag', href: '/search/?q=airport%20security%20remove%20from%20bag', label: 'Security', description: 'Practical security checklist for travellers.' },
    { title: 'Best airports for families and babies', href: '/search/?q=best%20airports%20for%20families%20babies', label: 'Family travel', description: 'Family travel content angle connected to airport hubs.' },
    { title: 'Most confusing airline baggage rules', href: '/search/?q=confusing%20airline%20baggage%20rules', label: 'Airlines', description: 'Airline comparison angle for organic and social traffic.' },
  ];
}

export function getOrbitIndexCards(): OrbitCard[] {
  return [
    { title: 'Item hubs', href: '/item-guides/', label: 'Rules', description: 'Browse item-led travel rule hubs.' },
    { title: 'Airline hubs', href: '/airline-guides/', label: 'Airlines', description: 'Browse airline-led baggage and travel rule hubs.' },
    { title: 'Country hubs', href: '/country-guides/', label: 'Countries', description: 'Browse country-led customs and destination rule hubs.' },
    { title: 'Airport hubs', href: '/airport-guides/', label: 'Airports', description: 'Browse airport-led security, hotel and transport pages.' },
    { title: 'Travel deals', href: '/travel-deals/', label: 'Deals', description: 'Explore contextual flight, hotel, eSIM and gear deal ideas.' },
    { title: 'Discover stories', href: '/discover-travel/', label: 'Google Discover', description: 'Click-friendly travel advice ideas for social and Discover.' },
    { title: 'Travel gear', href: '/travel-gear-deals/', label: 'Gear', description: 'Travel adapter, power bank, luggage and packing gear ideas.' },
    { title: 'Cheap travel', href: '/cheap-travel/', label: 'Budget travel', description: 'Cheap flights, cheap hotels and budget trip planning.' },
  ];
}
