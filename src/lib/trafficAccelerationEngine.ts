import { rules, type Rule } from '@/data/rules';
import {
  searchConsoleQueries,
  searchConsoleRulePages,
  searchConsoleSnapshotDate,
  type SearchConsolePageSnapshot,
  type SearchConsoleQuerySnapshot,
} from '@/data/searchConsoleSnapshot';
import { splitRuleSubject } from '@/lib/ruleSeoEngine';

export type TrafficPriority = 'Top-5 push' | 'Page-one push' | 'CTR repair' | 'Protect winner' | 'Observe';

export type TrafficTarget = SearchConsolePageSnapshot & {
  rule?: Rule;
  priority: TrafficPriority;
  opportunityScore: number;
  expectedAction: string;
  matchingQueries: SearchConsoleQuerySnapshot[];
};

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function words(value: string) {
  return new Set(normalise(value).split(/\s+/).filter((word) => word.length > 2));
}

function queryMatchScore(query: string, rule: Rule) {
  const subject = splitRuleSubject(rule);
  const queryWords = words(query);
  const targetWords = words(`${subject.baseItem} ${subject.airline || ''} ${rule.category}`);
  let matches = 0;
  for (const word of targetWords) if (queryWords.has(word)) matches += 1;
  return matches;
}

function classify(page: SearchConsolePageSnapshot): TrafficPriority {
  if (page.position <= 5 && page.ctr < 0.04) return 'Protect winner';
  if (page.position <= 10 && page.ctr < 0.02 && page.impressions >= 20) return 'CTR repair';
  if (page.position <= 10) return 'Top-5 push';
  if (page.position <= 20) return 'Page-one push';
  return 'Observe';
}

function actionFor(priority: TrafficPriority) {
  if (priority === 'Protect winner') return 'Refresh official-source context, improve snippet appeal and add supporting internal links without changing the core answer.';
  if (priority === 'CTR repair') return 'Rewrite title and description around the proven query, sharpen the above-the-fold answer and add direct internal links from strong hubs.';
  if (priority === 'Top-5 push') return 'Add query-specific FAQs, comparison context, external mentions and links from the airline, item and category hubs.';
  if (priority === 'Page-one push') return 'Close content gaps, improve internal authority and secure one or two relevant external mentions.';
  return 'Monitor impressions and only invest when the page shows clearer demand.';
}

function opportunityScore(page: SearchConsolePageSnapshot, priority: TrafficPriority) {
  const positionPotential = Math.max(0, 25 - page.position) * 2;
  const demand = Math.min(35, Math.log10(page.impressions + 1) * 16);
  const ctrGap = page.ctr < 0.01 ? 16 : page.ctr < 0.03 ? 10 : 4;
  const priorityBonus = priority === 'CTR repair' ? 12 : priority === 'Top-5 push' ? 10 : priority === 'Page-one push' ? 8 : 4;
  return Math.min(100, Math.round(positionPotential + demand + ctrGap + priorityBonus));
}

export function getMatchingQueries(rule: Rule, limit = 8) {
  return searchConsoleQueries
    .map((query) => ({ query, score: queryMatchScore(query.query, rule) }))
    .filter((row) => row.score >= 1)
    .sort((a, b) => b.score - a.score || b.query.impressions - a.query.impressions || a.query.position - b.query.position)
    .slice(0, limit)
    .map((row) => row.query);
}

export function getTrafficTargets(limit = 100): TrafficTarget[] {
  return searchConsoleRulePages
    .map((page) => {
      const rule = rules.find((candidate) => candidate.slug === page.slug);
      const priority = classify(page);
      return {
        ...page,
        rule,
        priority,
        opportunityScore: opportunityScore(page, priority),
        expectedAction: actionFor(priority),
        matchingQueries: rule ? getMatchingQueries(rule) : [],
      };
    })
    .sort((a, b) => b.opportunityScore - a.opportunityScore || b.impressions - a.impressions)
    .slice(0, limit);
}

export function getTrafficTargetForSlug(slug: string) {
  return getTrafficTargets(searchConsoleRulePages.length).find((target) => target.slug === slug);
}

export function getPriorityRuleLinks(limit = 12) {
  return getTrafficTargets(limit)
    .filter((target) => target.rule)
    .map((target) => ({
      href: `/rules/${target.slug}/`,
      label: target.rule!.item,
      category: target.rule!.category,
      priority: target.priority,
      impressions: target.impressions,
      position: target.position,
    }));
}

export function getSearchConsoleSummary() {
  const targets = getTrafficTargets(searchConsoleRulePages.length);
  return {
    snapshotDate: searchConsoleSnapshotDate,
    queryCount: searchConsoleQueries.length,
    rulePageCount: searchConsoleRulePages.length,
    totalClicks: searchConsoleRulePages.reduce((sum, row) => sum + row.clicks, 0),
    totalImpressions: searchConsoleRulePages.reduce((sum, row) => sum + row.impressions, 0),
    topFivePushes: targets.filter((row) => row.priority === 'Top-5 push').length,
    pageOnePushes: targets.filter((row) => row.priority === 'Page-one push').length,
    ctrRepairs: targets.filter((row) => row.priority === 'CTR repair').length,
  };
}

export const travelSectorExpansion = [
  { sector: 'Airports', route: '/airport-guides/', purpose: 'Security, terminals, transport, hotels, parking, lounges and accessibility.' },
  { sector: 'Destinations and customs', route: '/destination-intelligence/', purpose: 'Entry preparation, customs, medication, food, money and connectivity.' },
  { sector: 'Travel insurance', route: '/travel-services/travel-insurance/', purpose: 'Policy questions, traveller types, medical needs and disruption cover.' },
  { sector: 'Accommodation', route: '/travel-services/airport-hotels/', purpose: 'Airport hotels, layovers, early departures and family stays.' },
  { sector: 'Ground transport', route: '/travel-services/airport-transfers/', purpose: 'Transfers, parking, car hire and public-transport decisions.' },
  { sector: 'Connectivity and services', route: '/travel-services/esim-connectivity/', purpose: 'eSIMs, lounges and practical destination services.' },
];
