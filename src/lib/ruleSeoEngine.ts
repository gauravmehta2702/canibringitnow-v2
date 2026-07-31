import type { Rule } from '@/data/rules';
import { rules } from '@/data/rules';
import { cleanDescription, SITE_NAME, SITE_URL } from '@/lib/siteSeo';
import { searchConsoleQueries, searchConsoleRulePages } from '@/data/searchConsoleSnapshot';

const AIRLINE_NAMES = [
  'British Airways', 'Qatar Airways', 'Singapore Airlines', 'Air India',
  'Virgin Atlantic', 'Turkish Airlines', 'Etihad Airways', 'Ryanair',
  'easyJet', 'Emirates', 'Lufthansa', 'KLM', 'Wizz Air', 'Jet2',
];

export type RuleSeoProfile = {
  baseItem: string;
  airline?: string;
  title: string;
  description: string;
  searchTerms: string[];
  canonical: string;
  confidenceLabel: 'High confidence' | 'Guidance only';
  confidenceReason: string;
};

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

export function splitRuleSubject(rule: Rule) {
  const airline = AIRLINE_NAMES.find((name) => normalise(rule.item).endsWith(`on ${normalise(name)}`));
  if (!airline) return { baseItem: rule.item, airline: undefined };

  const suffix = new RegExp(`\\s+on\\s+${airline.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
  return { baseItem: rule.item.replace(suffix, '').trim(), airline };
}

function findDemandPage(slug: string) {
  return searchConsoleRulePages.find((page) => page.slug === slug);
}

function bestDemandQuery(rule: Rule) {
  const { baseItem, airline } = splitRuleSubject(rule);
  const terms = `${baseItem} ${airline || ''}`.toLowerCase().split(/\s+/).filter((term) => term.length > 2);
  return searchConsoleQueries
    .map((query) => ({ query, score: terms.filter((term) => query.query.toLowerCase().includes(term)).length }))
    .filter((row) => row.score >= Math.min(2, terms.length))
    .sort((a, b) => b.score - a.score || b.query.impressions - a.query.impressions || a.query.position - b.query.position)[0]?.query;
}

function titleYear() {
  return new Date().getUTCFullYear();
}

export function buildRuleSeoProfile(rule: Rule): RuleSeoProfile {
  const { baseItem, airline } = splitRuleSubject(rule);
  const year = titleYear();
  const demandPage = findDemandPage(rule.slug);
  const demandQuery = bestDemandQuery(rule);
  const hasProvenDemand = Boolean(demandPage && demandPage.impressions >= 20 && demandPage.position <= 20);
  const policyIntent = demandQuery?.query.toLowerCase().includes('policy');
  const title = airline && hasProvenDemand && policyIntent
    ? `${airline} ${baseItem} Policy: Cabin & Checked Rules (${year})`
    : airline
      ? `Can You Take ${baseItem} on ${airline}? (${year} Rules)`
      : `Can You Take ${baseItem} on a Plane? (${year} Rules)`;

  const routeContext = airline ? ` on ${airline}` : ' on a flight';
  const demandPhrase = hasProvenDemand && demandQuery ? ` Answers searches such as “${demandQuery.query}”.` : '';
  const description = cleanDescription(
    `Cabin baggage: ${rule.cabin}. Checked baggage: ${rule.checked}. Check ${baseItem.toLowerCase()} rules${routeContext}, restrictions and packing advice for ${year}.${demandPhrase}`
  );

  const searchTerms = Array.from(new Set([
    baseItem,
    rule.item,
    ...rule.tags,
    airline ? `${baseItem} ${airline}` : '',
    airline ? `${airline} baggage rules` : `${baseItem} hand luggage`,
    `${baseItem} cabin baggage`,
    `${baseItem} checked baggage`,
  ].filter(Boolean))).slice(0, 18);

  const guidanceOnly = /general travel guidance|common airline baggage rules/i.test(rule.sourceNote);

  return {
    baseItem,
    airline,
    title,
    description,
    searchTerms,
    canonical: `${SITE_URL}/rules/${rule.slug}/`,
    confidenceLabel: guidanceOnly ? 'Guidance only' : 'High confidence',
    confidenceReason: guidanceOnly
      ? 'This page summarises common rules and requires confirmation with the airline, airport or destination authority.'
      : 'This page includes specific source context and a recent review date.',
  };
}

export function getSameItemAirlineRules(rule: Rule, limit = 6) {
  const subject = splitRuleSubject(rule);
  const key = normalise(subject.baseItem);
  return rules
    .filter((candidate) => candidate.slug !== rule.slug)
    .filter((candidate) => normalise(splitRuleSubject(candidate).baseItem) === key)
    .sort((a, b) => splitRuleSubject(a).airline?.localeCompare(splitRuleSubject(b).airline || '') || 0)
    .slice(0, limit);
}

export function buildRuleWebPageJsonLd(rule: Rule) {
  const profile = buildRuleSeoProfile(rule);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': profile.canonical,
    url: profile.canonical,
    name: profile.title,
    description: profile.description,
    dateModified: rule.updated,
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    about: {
      '@type': 'Thing',
      name: profile.baseItem,
      additionalType: rule.category,
    },
    keywords: profile.searchTerms.join(', '),
  };
}
