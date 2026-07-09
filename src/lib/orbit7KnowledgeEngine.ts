import { airlines, countries, rules, type Rule } from '@/data/rules';

export type KnowledgeCard = { title: string; href: string; label: string; description: string; };
export type GeneratedPage = KnowledgeCard & { slug: string; template: string; rule?: Rule; entity?: string; intent: 'Airline' | 'Country' | 'Baggage' | 'Question' | 'Guide'; };

export function kSlug(value: string) { return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
export function cleanItemName(item: string) { return item.replace(/\bon a plane\b/gi, '').replace(/\bin hand luggage\b/gi, '').replace(/\bin checked baggage\b/gi, '').trim(); }

export const pageTemplates = [
  { id: 'item-airline', title: 'Item x Airline', description: 'Targets searches like Can I take power bank on Emirates?' },
  { id: 'item-country', title: 'Item x Country', description: 'Targets searches like Can I bring medication to Japan?' },
  { id: 'item-baggage', title: 'Item x Baggage Type', description: 'Targets cabin baggage and checked baggage queries.' },
  { id: 'item-question', title: 'Question-led', description: 'Targets natural language searches and AI Overviews.' },
  { id: 'item-guide', title: 'Guide cluster', description: 'Targets packing guides, airport security guides and customs guides.' },
];

export function generateKnowledgePages(limit = 500): GeneratedPage[] {
  const pages: GeneratedPage[] = [];
  const seedRules = rules.slice(0, 80);
  const seedAirlines = airlines.slice(0, 12);
  const seedCountries = countries.slice(0, 12);

  seedRules.forEach((rule) => {
    const item = cleanItemName(rule.item);
    const itemSlug = kSlug(item);
    pages.push({ slug: `${itemSlug}-complete-guide`, title: `${item} complete travel guide`, href: `/knowledge/${itemSlug}-complete-guide/`, label: 'Complete guide', description: `${rule.shortAnswer} Includes cabin baggage, checked baggage, airlines, countries, FAQs and packing guidance.`, template: 'item-guide', rule, intent: 'Guide' });
    pages.push({ slug: `${itemSlug}-cabin-baggage`, title: `Can I take ${item} in cabin baggage?`, href: `/knowledge/${itemSlug}-cabin-baggage/`, label: 'Cabin baggage', description: `Cabin baggage status: ${rule.cabin}. ${rule.shortAnswer}`, template: 'item-baggage', rule, intent: 'Baggage' });
    pages.push({ slug: `${itemSlug}-checked-baggage`, title: `Can I pack ${item} in checked baggage?`, href: `/knowledge/${itemSlug}-checked-baggage/`, label: 'Checked baggage', description: `Checked baggage status: ${rule.checked}. ${rule.shortAnswer}`, template: 'item-baggage', rule, intent: 'Baggage' });
    seedAirlines.forEach((airline) => pages.push({ slug: `${itemSlug}-on-${kSlug(airline)}`, title: `Can I take ${item} on ${airline}?`, href: `/knowledge/${itemSlug}-on-${kSlug(airline)}/`, label: 'Airline rule', description: `${rule.shortAnswer} For ${airline}, verify the latest baggage policy before flying.`, template: 'item-airline', rule, entity: airline, intent: 'Airline' }));
    seedCountries.forEach((country) => pages.push({ slug: `${itemSlug}-to-${kSlug(country)}`, title: `Can I bring ${item} to ${country}?`, href: `/knowledge/${itemSlug}-to-${kSlug(country)}/`, label: 'Country rule', description: `${rule.shortAnswer} For ${country}, customs or destination rules may also apply.`, template: 'item-country', rule, entity: country, intent: 'Country' }));
    [`Is ${item} allowed through airport security?`, `Do I need to declare ${item} at customs?`, `What happens if airport security stops ${item}?`, `How should I pack ${item} for a flight?`].forEach((question) => pages.push({ slug: kSlug(question), title: question, href: `/knowledge/${kSlug(question)}/`, label: 'Question', description: `${rule.shortAnswer} Check airline, airport security and destination rules before travelling.`, template: 'item-question', rule, intent: 'Question' }));
  });
  const seen = new Set<string>();
  return pages.filter((page) => { if (seen.has(page.slug)) return false; seen.add(page.slug); return true; }).slice(0, limit);
}

export function getKnowledgePage(slug: string) { return generateKnowledgePages(80).find((page) => page.slug === slug); }

export function getRelatedKnowledgeLinks(page: GeneratedPage): KnowledgeCard[] {
  const rule = page.rule; if (!rule) return [];
  const item = cleanItemName(rule.item); const itemSlug = kSlug(item);
  const links: KnowledgeCard[] = [
    { title: `${item} main rule`, href: `/rules/${rule.slug}/`, label: 'Rule', description: rule.shortAnswer },
    { title: `${item} item hub`, href: `/item-guides/${itemSlug}/`, label: 'Item hub', description: `Open the main hub for ${item}.` },
    { title: `${item} questions`, href: `/questions/can-i-bring-${rule.slug}/`, label: 'Questions', description: `Common questions about ${item}.` },
    { title: `${item} airline rules`, href: `/topics/${rule.slug}-airline-rules/`, label: 'Topic', description: `Airline-specific context for ${item}.` },
    { title: `${item} country rules`, href: `/topics/${rule.slug}-country-rules/`, label: 'Topic', description: `Country and customs context for ${item}.` },
    { title: `${item} packing guide`, href: `/topics/${rule.slug}-packing-guide/`, label: 'Packing', description: `Packing guidance for ${item}.` },
  ];
  airlines.slice(0, 4).forEach((airline) => links.push({ title: `${item} on ${airline}`, href: `/knowledge/${itemSlug}-on-${kSlug(airline)}/`, label: 'Airline', description: `Check ${item} with ${airline}.` }));
  countries.slice(0, 4).forEach((country) => links.push({ title: `${item} to ${country}`, href: `/knowledge/${itemSlug}-to-${kSlug(country)}/`, label: 'Country', description: `Check ${item} with ${country}.` }));
  links.push({ title: 'Trip Planner', href: '/trip-planner/', label: 'Tool', description: 'Plan airline, country and items together.' }, { title: 'Travel Tools', href: '/travel-tools/', label: 'Tools', description: 'Use calculators and checklists before flying.' }, { title: 'Travel Deals', href: '/travel-deals/', label: 'Deals', description: 'Research hotels, eSIMs, insurance and gear later.' });
  return links.slice(0, 18);
}

export function buildKnowledgeJsonLd(page: GeneratedPage) {
  const url = `https://canibringitnow.com/knowledge/${page.slug}/`;
  return [
    { '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, description: page.description, url, isPartOf: { '@type': 'WebSite', name: 'Can I Bring It Now', url: 'https://canibringitnow.com/' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [ { '@type': 'Question', name: page.title, acceptedAnswer: { '@type': 'Answer', text: page.description } }, { '@type': 'Question', name: 'Should I verify this before travelling?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Travel rules can change, so verify important restrictions with your airline, airport security, customs authority or destination government before flying.' } } ] },
  ];
}

export function getKnowledgeStats(): KnowledgeCard[] {
  const pages = generateKnowledgePages(80);
  return [
    { title: 'Generated SEO pages', href: '/knowledge/', label: pages.length.toString(), description: 'Long-tail knowledge pages generated from structured rules.' },
    { title: 'Seed rules used', href: '/rules/', label: rules.slice(0, 80).length.toString(), description: 'Rules feeding item, airline, country and question pages.' },
    { title: 'Airlines in combinations', href: '/airline-guides/', label: airlines.slice(0, 12).length.toString(), description: 'Priority airline combinations for first indexing phase.' },
    { title: 'Countries in combinations', href: '/country-guides/', label: countries.slice(0, 12).length.toString(), description: 'Priority destination combinations for first indexing phase.' },
  ];
}

export function getBacklinkMagnetResources(): KnowledgeCard[] {
  return [
    { title: 'Printable airport security checklist', href: '/backlink-resources/airport-security-checklist/', label: 'Checklist', description: 'A useful resource bloggers and travellers can reference.' },
    { title: 'Family travel packing checklist', href: '/backlink-resources/family-travel-checklist/', label: 'Family', description: 'A shareable checklist for parents travelling with babies or children.' },
    { title: 'Medication travel checklist', href: '/backlink-resources/medication-travel-checklist/', label: 'Medication', description: 'A high-trust resource for prescriptions, documents and destination checks.' },
    { title: 'Power bank rules summary', href: '/backlink-resources/power-bank-rules-summary/', label: 'Batteries', description: 'A simple reference resource for lithium batteries and power banks.' },
    { title: 'Country customs checklist', href: '/backlink-resources/country-customs-checklist/', label: 'Customs', description: 'A reference checklist for food, medicine, alcohol, tobacco and declarations.' },
    { title: 'Student travel checklist', href: '/backlink-resources/student-travel-checklist/', label: 'Students', description: 'A practical checklist for students flying abroad.' },
  ];
}
export function getBacklinkResource(slug: string) { return getBacklinkMagnetResources().find((resource) => resource.href.endsWith(`/${slug}/`)); }
