import { rules } from '@/data/rules';
import { getAirlines } from '@/lib/airlineUtils';
import { getCategories } from '@/lib/categoryUtils';
import { getCountries } from '@/lib/countryUtils';
import { launchLimits } from '@/lib/launchLimits';

export const growthRelease9 = {
  name: 'Growth Release 9',
  summary: 'Production hardening, focused indexing, stronger rule pages, and safer revenue placements.',
  buildTarget: 'Cloudflare Pages static export',
};

export const growthRelease9Checklist = [
  {
    title: 'Focused indexing batch',
    status: 'Ready',
    detail: `Initial sitemap and static export are limited to the strongest pages first: ${launchLimits.rules} rule pages, ${launchLimits.questionPages} question pages, ${launchLimits.airlines} airline pages and ${launchLimits.countries} country pages.`,
  },
  {
    title: 'Google verification path',
    status: 'Ready',
    detail: 'Search Console verification remains driven by NEXT_PUBLIC_GSC_VERIFICATION, so the code can stay public while the verification value stays in Cloudflare environment variables.',
  },
  {
    title: 'Analytics path',
    status: 'Ready',
    detail: 'GA4 remains driven by NEXT_PUBLIC_GA_ID and can be enabled without touching source code.',
  },
  {
    title: 'Revenue-safe layout',
    status: 'Ready',
    detail: 'Affiliate recommendations stay inside helpful travel-planning blocks rather than interrupting the rule decision answer.',
  },
  {
    title: 'Trust-first warnings',
    status: 'Ready',
    detail: 'Rule pages continue to remind travellers to confirm important restrictions with official airline, airport or government sources.',
  },
];

export function getGrowthRelease9Metrics() {
  return [
    { label: 'Rules in first batch', value: launchLimits.rules.toString(), note: `${rules.length} total rules available in data` },
    { label: 'Airline hubs in first batch', value: launchLimits.airlines.toString(), note: `${getAirlines().length} airline pages available` },
    { label: 'Country hubs in first batch', value: launchLimits.countries.toString(), note: `${getCountries().length} country pages available` },
    { label: 'Category hubs', value: getCategories().length.toString(), note: 'All category hubs remain indexable' },
  ];
}

export const nextGrowthActions = [
  'Submit sitemap.xml in Google Search Console after every successful production deployment.',
  'Request indexing first for homepage, rules hub, search page, top rule pages, airline hub and country hub.',
  'Watch Search Console for discovered-not-indexed pages before expanding page limits.',
  'Add AdSense only after the first set of useful pages is stable and crawlable.',
  'Use affiliate links first on travel essentials, packing and rule pages where they naturally help the user.',
];
