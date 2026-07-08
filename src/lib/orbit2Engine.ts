import { rules } from '@/data/rules';

export type Orbit2Card = { title: string; href: string; label: string; description: string };
export type OrbitLanguage = { code: string; name: string; nativeName: string; markets: string[]; priority: 'High' | 'Medium' | 'Later' };
export type OrbitLaunchTask = { title: string; priority: 'High' | 'Medium' | 'Low'; owner: 'Build' | 'SEO' | 'Content' | 'Revenue'; description: string; href: string };

export const orbitLanguages: OrbitLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', markets: ['UK', 'USA', 'Canada', 'Australia', 'India'], priority: 'High' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', markets: ['Spain', 'Mexico', 'USA', 'Latin America'], priority: 'High' },
  { code: 'fr', name: 'French', nativeName: 'Français', markets: ['France', 'Canada', 'Belgium'], priority: 'High' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', markets: ['Germany', 'Austria', 'Switzerland'], priority: 'High' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', markets: ['India'], priority: 'Medium' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', markets: ['Japan'], priority: 'Medium' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', markets: ['Brazil', 'Portugal'], priority: 'Medium' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', markets: ['Italy'], priority: 'Medium' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', markets: ['UAE', 'Saudi Arabia', 'Qatar'], priority: 'Later' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', markets: ['Netherlands', 'Belgium'], priority: 'Later' },
];

export function getOrbitLanguage(code: string) { return orbitLanguages.find((language) => language.code === code); }

export function getTranslationSeedPages(languageCode: string, limit = 60): Orbit2Card[] {
  const language = getOrbitLanguage(languageCode) || orbitLanguages[0];
  return rules.slice(0, limit).map((rule) => ({
    title: `${rule.item} · ${language.name}`,
    href: `/${language.code}/rules/${rule.slug}/`,
    label: rule.category,
    description: `Translation-ready version of: ${rule.shortAnswer}`,
  }));
}

export function getSeoLaunchTasks(): OrbitLaunchTask[] {
  return [
    { title: 'Submit sitemap in Google Search Console', priority: 'High', owner: 'SEO', href: '/launch-readiness/', description: 'Submit the production sitemap and monitor discovered vs indexed pages.' },
    { title: 'Noindex internal dashboards', priority: 'High', owner: 'Build', href: '/indexing-control/', description: 'Keep audit/control pages away from Google and focus crawl budget on public travel pages.' },
    { title: 'Check top 20 paths weekly', priority: 'High', owner: 'SEO', href: '/traffic-command/', description: 'Use Cloudflare and Search Console to identify which pages deserve improvement.' },
    { title: 'Improve pages with impressions but low CTR', priority: 'High', owner: 'Content', href: '/ctr-booster/', description: 'Rewrite titles, descriptions and first-answer blocks for pages Google is already testing.' },
    { title: 'Build country and airline hub links from homepage', priority: 'Medium', owner: 'Build', href: '/orbit/', description: 'Make hub pages easier to reach from the homepage and high-traffic pages.' },
    { title: 'Start with 3 translation markets', priority: 'Medium', owner: 'Content', href: '/orbit-international/', description: 'Prepare Spanish, French and German first rather than translating everything at once.' },
    { title: 'Add affiliate disclosure before monetising', priority: 'High', owner: 'Revenue', href: '/revenue-launch/', description: 'Prepare clean disclosure language before hotel, eSIM, insurance or gear links are added.' },
    { title: 'Create 20 traffic-magnet articles', priority: 'Medium', owner: 'Content', href: '/traffic-magnets/', description: 'Create click-friendly but useful guides for airport security, mistakes, rules and packing.' },
  ];
}

export function getTrafficMagnetIdeas(): Orbit2Card[] {
  return [
    { title: '10 things airport security may stop in your bag', href: '/search/?q=things%20airport%20security%20stops', label: 'Airport security', description: 'A Google Discover-style article linked to rules and packing guidance.' },
    { title: 'Can airport security confiscate your power bank?', href: '/search/?q=airport%20security%20confiscate%20power%20bank', label: 'Power banks', description: 'Strong question-led traffic idea for batteries and electronics.' },
    { title: 'Medicine travel mistakes that can delay your trip', href: '/search/?q=medicine%20travel%20mistakes', label: 'Medication', description: 'Useful high-trust topic connected to prescriptions and destination rules.' },
    { title: 'Baby formula airport security rules explained', href: '/search/?q=baby%20formula%20airport%20security%20rules', label: 'Baby travel', description: 'Family-travel content with strong practical search intent.' },
    { title: 'What to pack in cabin bag vs checked bag', href: '/search/?q=cabin%20bag%20vs%20checked%20bag%20what%20to%20pack', label: 'Packing', description: 'Broad evergreen guide connected to hundreds of item pages.' },
    { title: 'Countries where food rules surprise travellers', href: '/search/?q=food%20customs%20rules%20by%20country', label: 'Customs', description: 'Destination customs angle for food and supplements.' },
    { title: 'Ryanair baggage rules travellers misunderstand', href: '/search/?q=Ryanair%20baggage%20rules%20mistakes', label: 'Airlines', description: 'Airline baggage traffic magnet.' },
    { title: 'Emirates power bank rules explained', href: '/search/?q=Emirates%20power%20bank%20rules%20explained', label: 'Airlines', description: 'High-intent airline + item content angle.' },
    { title: 'Japan customs rules travellers should check', href: '/search/?q=Japan%20customs%20rules%20travellers%20should%20check', label: 'Japan', description: 'Destination authority content for Japan.' },
    { title: 'Best airport hotels for early morning flights', href: '/search/?q=best%20airport%20hotels%20early%20morning%20flights', label: 'Hotels', description: 'Monetisable hotel content angle for later affiliate use.' },
  ];
}

export function getRevenueLaunchCards(): Orbit2Card[] {
  return [
    { title: 'eSIM recommendations', href: '/travel-deals/', label: 'High intent', description: 'Best placed on country guides, trip planner and destination pages.' },
    { title: 'Travel insurance', href: '/travel-deals/', label: 'High value', description: 'Best placed on trip planner, before-you-fly and destination guides.' },
    { title: 'Airport hotels', href: '/airport-guides/', label: 'Hotels', description: 'Best placed on airport guides and country deal pages.' },
    { title: 'Universal adapters', href: '/travel-gear-deals/', label: 'Gear', description: 'Best placed on country guides and packing planner.' },
    { title: 'Power banks', href: '/travel-gear-deals/', label: 'Electronics', description: 'Best placed after battery rule explanations, not before the answer.' },
    { title: 'Luggage scales', href: '/travel-gear-deals/', label: 'Baggage', description: 'Best placed on airline baggage and packing pages.' },
    { title: 'Packing cubes', href: '/travel-gear-deals/', label: 'Packing', description: 'Best placed on trip planner and packing guide pages.' },
    { title: 'Clear liquids bags', href: '/travel-gear-deals/', label: 'Airport security', description: 'Best placed on liquids and airport security pages.' },
  ];
}

export function getIndexingControlPages(): Orbit2Card[] {
  return [
    { title: 'Public pages to index', href: '/indexing-control/#index', label: 'Index', description: 'Rules, questions, topics, item guides, airline guides, country guides, airport guides and travel deals.' },
    { title: 'Internal pages to noindex', href: '/indexing-control/#noindex', label: 'Noindex', description: 'Audit dashboards, launch readiness pages, quality audit pages and internal planning pages.' },
    { title: 'Priority crawl paths', href: '/orbit-sitemap/', label: 'Crawl', description: 'A human-readable sitemap linking the most important ORBIT pages.' },
    { title: 'Search Console checks', href: '/launch-readiness/', label: 'Monitor', description: 'Watch discovered, crawled and indexed status weekly.' },
  ];
}
