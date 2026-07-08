import { airlines, countries, rules } from '@/data/rules';

export type Orbit6Card = { title: string; href: string; label: string; description: string; channel?: string; effort?: string; };

export function slug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getOrbit6Modules(): Orbit6Card[] {
  return [
    { title: 'Editorial Calendar', href: '/editorial-calendar/', label: 'Content', description: 'Weekly content calendar for search, Shorts, Pinterest and updates.' },
    { title: 'Page Refresh Queue', href: '/page-refresh-queue/', label: 'SEO', description: 'Pages to improve first based on traffic potential and trust needs.' },
    { title: 'Video Script Factory', href: '/video-script-factory/', label: 'Shorts', description: 'Short video scripts from high-intent travel questions.' },
    { title: 'Pinterest Pin Factory', href: '/pinterest-pin-factory/', label: 'Pinterest', description: 'Pin concepts for evergreen travel checklists and packing content.' },
    { title: 'Newsletter Starter', href: '/newsletter-starter/', label: 'Retention', description: 'Simple email content ideas for future visitor retention.' },
    { title: 'Content QA Checklist', href: '/content-qa-checklist/', label: 'Quality', description: 'Quality checks before publishing AI-assisted travel content.' },
    { title: 'Manual Work Reducer', href: '/manual-work-reducer/', label: 'Automation', description: 'A realistic semi-automated workflow with human approval.' },
  ];
}

export function getEditorialCalendar(): Orbit6Card[] {
  const ruleItems = rules.slice(0, 10).map((rule) => ({
    title: `Improve: ${rule.item}`, href: `/rules/${rule.slug}/`, label: rule.category,
    description: 'Add sharper answer, FAQs, related countries, airline checks and trust reminders.', channel: 'Update', effort: 'Medium'
  }));
  const countryItems = countries.slice(0, 6).map((country) => ({
    title: `${country} travel rules checklist`, href: `/country-guides/${slug(country)}/`, label: 'Country guide',
    description: `Create a practical travel rules checklist for ${country}: medication, food, batteries, customs and hotels.`, channel: 'SEO page', effort: 'Medium'
  }));
  const airlineItems = airlines.slice(0, 6).map((airline) => ({
    title: `${airline} baggage mistakes`, href: `/airline-guides/${slug(airline)}/`, label: 'Airline guide',
    description: `Create or improve a guide around common ${airline} baggage and item mistakes.`, channel: 'SEO page', effort: 'Medium'
  }));
  return [...ruleItems, ...countryItems, ...airlineItems];
}

export function getPageRefreshQueue(): Orbit6Card[] {
  return rules.slice(0, 24).map((rule) => ({
    title: `${rule.item}: refresh for ranking`, href: `/rules/${rule.slug}/`, label: rule.category,
    description: 'Check title, meta, first answer, warning, official sources, FAQ coverage and related links.',
    channel: 'Update', effort: rule.warning ? 'High' : 'Medium'
  }));
}

export function getVideoScripts(): Orbit6Card[] {
  return rules.slice(0, 18).map((rule) => {
    const item = rule.item.replace(/\bon a plane\b/gi, '').trim();
    return {
      title: `Can you take ${item}?`, href: `/rules/${rule.slug}/`, label: 'Short video',
      description: `Hook: "Can you take ${item} on a plane?" Answer cabin vs checked in 20 seconds, add warning, end with "Search before you fly at CanIBringItNow.com".`,
      channel: 'Short video', effort: 'Low'
    };
  });
}

export function getPinterestPins(): Orbit6Card[] {
  return ['Airport security checklist','Cabin bag vs checked bag','Power bank flight rules','Medication travel checklist','Baby travel airport checklist','Japan customs checklist','Ryanair baggage checklist','Emirates packing checklist','Long-haul flight packing list','Travel documents checklist','Liquids 100ml rule checklist','Airport delay survival kit'].map((topic) => ({
    title: topic, href: `/search/?q=${encodeURIComponent(topic)}`, label: 'Pinterest',
    description: 'Create a vertical pin with 5 checklist bullets and CTA to CanIBringItNow.com.', channel: 'Pinterest', effort: 'Low'
  }));
}

export function getNewsletterIdeas(): Orbit6Card[] {
  return [
    { title: 'This week before you fly', href: '/newsletter-starter/', label: 'Weekly', description: 'A weekly email with top 5 travel checks, seasonal tip, and one destination guide.', channel: 'Newsletter', effort: 'Low' },
    { title: 'Power bank rules reminder', href: '/search/?q=power%20bank%20rules', label: 'Batteries', description: 'Cabin vs checked baggage for power banks and batteries.', channel: 'Newsletter', effort: 'Low' },
    { title: 'Medication travel reminder', href: '/search/?q=medication%20travel%20rules', label: 'Medication', description: 'Check prescriptions and destination medicine rules.', channel: 'Newsletter', effort: 'Low' },
    { title: 'Family travel checklist', href: '/seasonal-travel/family-travel/', label: 'Family', description: 'Checklist for parents travelling with babies or children.', channel: 'Newsletter', effort: 'Low' },
  ];
}

export function getContentQAChecklist(): Orbit6Card[] {
  return [
    { title: 'Answer is clear in first 50 words', href: '/content-qa-checklist/', label: 'Snippet', description: 'Every page should quickly answer the main question.' },
    { title: 'Cabin vs checked is visible', href: '/content-qa-checklist/', label: 'Decision', description: 'Users should not need to read a long article to find the travel decision.' },
    { title: 'Official-source reminder is included', href: '/official-source-center/', label: 'Trust', description: 'Travel rules change, so verification reminders protect trust.' },
    { title: 'FAQs match real search intent', href: '/trending-travel-questions/', label: 'SEO', description: 'FAQs should answer what people actually ask.' },
    { title: 'Internal links are useful', href: '/internal-link-optimizer/', label: 'Links', description: 'Link to related rules, airlines, countries, airports and trip planner.' },
    { title: 'No thin AI filler', href: '/content-qa-checklist/', label: 'Quality', description: 'Do not add generic paragraphs that do not help travellers make a decision.' },
  ];
}

export function getManualWorkReducerPlan(): Orbit6Card[] {
  return [
    { title: 'Monday: Review queue', href: '/editorial-calendar/', label: '30 minutes', description: 'Pick 3 pages to improve and 3 short videos to create.' },
    { title: 'Tuesday: Publish updates', href: '/page-refresh-queue/', label: '60 minutes', description: 'Improve selected pages using the QA checklist.' },
    { title: 'Wednesday: Create social assets', href: '/video-script-factory/', label: '45 minutes', description: 'Create short scripts and Pinterest pins from the same topics.' },
    { title: 'Thursday: Internal links', href: '/internal-link-optimizer/', label: '30 minutes', description: 'Add links from related hubs and rules.' },
    { title: 'Friday: Analytics check', href: '/analytics-intelligence/', label: '30 minutes', description: 'Review top pages, CTR and countries; update next week’s queue.' },
    { title: 'Weekend: Optional batch work', href: '/manual-work-reducer/', label: 'Optional', description: 'Batch social posts if time allows.' },
  ];
}
