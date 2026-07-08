import { airlines, countries, rules } from '@/data/rules';

export type Orbit4Card = {
  title: string;
  href: string;
  label: string;
  description: string;
};

export type Orbit4Score = {
  title: string;
  score: number;
  label: string;
  recommendation: string;
};

export function orbit4Slug(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function getOrbit4Modules(): Orbit4Card[] {
  return [
    { title: 'Launch Control', href: '/launch-control/', label: 'Operations', description: 'Final launch checklist for indexing, analytics, content and revenue readiness.' },
    { title: 'SEO Health Monitor', href: '/seo-health-monitor/', label: 'SEO', description: 'What to check weekly in Search Console, Cloudflare and page performance.' },
    { title: 'Content Expansion Queue', href: '/content-expansion-queue/', label: 'Content', description: 'Prioritised rule, airline, country, airport, hotel and Discover content ideas.' },
    { title: 'Internal Link Optimizer', href: '/internal-link-optimizer/', label: 'Links', description: 'Site-wide crawl paths and link opportunities to improve topical authority.' },
    { title: 'Indexable Pages Map', href: '/indexable-pages-map/', label: 'Indexing', description: 'Public pages Google should crawl first and internal pages to avoid promoting.' },
    { title: 'Revenue Safe Zones', href: '/revenue-safe-zones/', label: 'Revenue', description: 'Where ads and affiliate cards can appear without hurting trust.' },
    { title: 'Visitor Retention Engine', href: '/visitor-retention-engine/', label: 'Engagement', description: 'Ways to keep visitors moving from one answer to trip planning and related pages.' },
    { title: 'Next 30 Days Plan', href: '/next-30-days/', label: 'Action plan', description: 'A focused weekly plan to reach first 10,000 visitors/month organically.' },
  ];
}

export function getSeoHealthScores(): Orbit4Score[] {
  return [
    { title: 'Technical speed', score: 90, label: 'Strong', recommendation: 'Keep pages lightweight. Avoid heavy images and unnecessary scripts.' },
    { title: 'Internal linking', score: 78, label: 'Improve', recommendation: 'Link every hub to rules, questions, topics, countries, airlines and tools.' },
    { title: 'Indexing readiness', score: 76, label: 'Improve', recommendation: 'Submit sitemap, inspect important URLs and monitor crawled/indexed status.' },
    { title: 'Search intent coverage', score: 84, label: 'Strong', recommendation: 'Continue question-led pages and semantic search clusters.' },
    { title: 'Revenue readiness', score: 62, label: 'Wait', recommendation: 'Delay AdSense until public pages are indexed and traffic begins to grow.' },
    { title: 'International readiness', score: 65, label: 'Prepare', recommendation: 'Start with translation architecture; publish reviewed high-value language pages later.' },
  ];
}

export function getContentExpansionQueue(): Orbit4Card[] {
  const ruleIdeas = rules.slice(0, 12).map((rule) => ({
    title: `${rule.item}: improve full guide`,
    href: `/rules/${rule.slug}/`,
    label: rule.category,
    description: `Strengthen answer, FAQs, official-source reminder, related questions and internal links.`,
  }));
  const airlineIdeas = airlines.slice(0, 8).map((airline) => ({
    title: `${airline} baggage and item guide`,
    href: `/airline-guides/${orbit4Slug(airline)}/`,
    label: 'Airline',
    description: `Improve ${airline} hub with top item checks, questions and trip planner links.`,
  }));
  const countryIdeas = countries.slice(0, 8).map((country) => ({
    title: `${country} customs and travel rules`,
    href: `/country-guides/${orbit4Slug(country)}/`,
    label: 'Country',
    description: `Improve ${country} hub with medication, food, batteries, baby travel, hotels and deals.`,
  }));
  return [...ruleIdeas, ...airlineIdeas, ...countryIdeas];
}

export function getInternalLinkPlan(): Orbit4Card[] {
  return [
    { title: 'Homepage to ORBIT hub', href: '/orbit/', label: 'Critical', description: 'Make the main hub reachable from the homepage and navigation.' },
    { title: 'Rule pages to item hubs', href: '/item-guides/', label: 'Rules', description: 'Every rule page should link to item hubs and question pages.' },
    { title: 'Country hubs to deals', href: '/travel-deals/', label: 'Revenue later', description: 'Country guides should naturally link to eSIM, hotel and travel gear ideas.' },
    { title: 'Airport guides to airport hotels', href: '/airport-guides/', label: 'Hotels', description: 'Airport pages should link to hotel and transport content.' },
    { title: 'Search page to trending questions', href: '/trending-travel-questions/', label: 'Retention', description: 'Search pages should offer related questions if the query is broad.' },
    { title: 'Seasonal hubs to rules', href: '/seasonal-travel/', label: 'Seasonal SEO', description: 'Seasonal pages should link to relevant packing and rule pages.' },
    { title: 'Discover pages to rules', href: '/discover-travel/', label: 'Discover', description: 'Click-friendly content must link back to useful rule pages.' },
    { title: 'Trip planner to country and airline hubs', href: '/trip-planner/', label: 'Engagement', description: 'Trip planning should push users to relevant destination and airline pages.' },
  ];
}

export function getIndexablePageGroups(): Orbit4Card[] {
  return [
    { title: 'Index: rule pages', href: '/rules/', label: 'Index', description: 'Core answer pages: highest value for organic search.' },
    { title: 'Index: question pages', href: '/questions/', label: 'Index', description: 'Question-led long-tail pages for Google and AI Overviews.' },
    { title: 'Index: topic clusters', href: '/topics/', label: 'Index', description: 'Authority pages for airline, country and packing clusters.' },
    { title: 'Index: ORBIT hubs', href: '/orbit-sitemap/', label: 'Index', description: 'Item, airline, country, airport, deals and seasonal pages.' },
    { title: 'Noindex: audit dashboards', href: '/atlas-audit/', label: 'Noindex recommended', description: 'Internal planning pages should not become the public SEO focus.' },
    { title: 'Noindex: launch dashboards', href: '/launch-readiness/', label: 'Noindex recommended', description: 'Keep operational pages out of search results where possible.' },
    { title: 'Monitor: search pages', href: '/search/', label: 'Careful', description: 'Search result pages can create duplicates; use mainly as utility pages.' },
    { title: 'Prioritise: sitemap paths', href: '/orbit-sitemap/', label: 'Crawl', description: 'Keep crawl paths clean and linked from public hubs.' },
  ];
}

export function getRevenueSafeZones(): Orbit4Card[] {
  return [
    { title: 'After the fast answer', href: '/adsense-layout/', label: 'AdSense', description: 'Never place ads before the main travel decision.' },
    { title: 'After official-source reminder', href: '/official-source-center/', label: 'Trust', description: 'Ads are safer after the user has seen important verification guidance.' },
    { title: 'Below related questions', href: '/trending-travel-questions/', label: 'Engagement', description: 'Ads can appear after useful follow-up links.' },
    { title: 'Airport hotel cards', href: '/airport-guides/', label: 'Affiliate', description: 'Best on airport guides and travel-deal pages.' },
    { title: 'eSIM cards', href: '/country-guides/', label: 'Affiliate', description: 'Best on destination and trip planner pages.' },
    { title: 'Travel gear cards', href: '/travel-gear-deals/', label: 'Affiliate', description: 'Best below relevant rules for batteries, liquids, luggage and medication.' },
  ];
}

export function getRetentionPaths(): Orbit4Card[] {
  return [
    { title: 'Answer to related item', href: '/item-guides/', label: 'Path 1', description: 'User checks one item, then explores related items in the same category.' },
    { title: 'Answer to airline guide', href: '/airline-guides/', label: 'Path 2', description: 'User checks an item, then checks the airline context.' },
    { title: 'Answer to country guide', href: '/country-guides/', label: 'Path 3', description: 'User checks an item, then checks destination customs.' },
    { title: 'Answer to trip planner', href: '/trip-planner/', label: 'Path 4', description: 'User turns a single rule into a full trip checklist.' },
    { title: 'Airport guide to hotels', href: '/travel-deals/', label: 'Path 5', description: 'User planning an airport journey sees useful hotel and deal content.' },
    { title: 'Seasonal hub to packing', href: '/packing-planner/', label: 'Path 6', description: 'Seasonal pages push users into packing and rules.' },
  ];
}

export function getNext30DayPlan(): Orbit4Card[] {
  return [
    { title: 'Week 1: Verify deployment', href: '/launch-control/', label: 'Week 1', description: 'Test core URLs, sitemap, mobile layout, page speed and Cloudflare deployment.' },
    { title: 'Week 1: Submit sitemap', href: '/indexable-pages-map/', label: 'Week 1', description: 'Submit sitemap in Google Search Console and inspect priority pages.' },
    { title: 'Week 2: Improve top 20 pages', href: '/seo-health-monitor/', label: 'Week 2', description: 'Improve rule pages, country hubs and airline hubs already receiving visits.' },
    { title: 'Week 2: Add internal links', href: '/internal-link-optimizer/', label: 'Week 2', description: 'Strengthen links between rule pages, ORBIT hubs and trip planner.' },
    { title: 'Week 3: Publish traffic magnets', href: '/traffic-magnets/', label: 'Week 3', description: 'Use 5 to 10 Discover-style topics and link them to useful pages.' },
    { title: 'Week 3: Start short videos', href: '/social-export-studio/', label: 'Week 3', description: 'Create 5 simple Shorts/Reels from trending questions.' },
    { title: 'Week 4: CTR improvement', href: '/ctr-booster/', label: 'Week 4', description: 'Use Search Console impressions to rewrite titles and meta descriptions.' },
    { title: 'Week 4: Revenue preparation', href: '/revenue-safe-zones/', label: 'Week 4', description: 'Prepare affiliate disclosures and safe ad zones; do not overload pages.' },
  ];
}
