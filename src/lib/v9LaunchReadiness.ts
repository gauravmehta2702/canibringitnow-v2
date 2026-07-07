import { airlines, countries, rules } from '@/data/rules';

export type LaunchCheck = {
  title: string;
  status: 'Ready' | 'Needs review' | 'Next';
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  href: string;
};

export type LaunchMetric = {
  label: string;
  value: string;
  description: string;
};

export function getLaunchMetrics(): LaunchMetric[] {
  const categories = Array.from(new Set(rules.map((rule) => rule.category)));

  return [
    {
      label: 'Travel rules',
      value: rules.length.toString(),
      description: 'Core item pages available for search and internal linking.',
    },
    {
      label: 'Airlines',
      value: airlines.length.toString(),
      description: 'Airline entities available for hubs and combinations.',
    },
    {
      label: 'Countries',
      value: countries.length.toString(),
      description: 'Destination entities available for country and guide pages.',
    },
    {
      label: 'Categories',
      value: categories.length.toString(),
      description: 'Topical groups available for category authority.',
    },
  ];
}

export function getLaunchReadinessChecks(): LaunchCheck[] {
  return [
    {
      title: 'Core search works',
      status: 'Ready',
      priority: 'High',
      href: '/search/',
      description: 'Users can search travel rules by item, airline or country.',
    },
    {
      title: 'Travel Intelligence Engine works',
      status: 'Ready',
      priority: 'High',
      href: '/travel-intelligence/',
      description: 'Users can enter one travel question and get connected answers.',
    },
    {
      title: 'Trip Planner works',
      status: 'Ready',
      priority: 'High',
      href: '/trip-planner/',
      description: 'Users can create a preparation plan from airline, destination and items.',
    },
    {
      title: 'Privacy, terms and contact pages exist',
      status: 'Ready',
      priority: 'High',
      href: '/privacy/',
      description: 'Important for user trust, analytics, affiliates and future AdSense.',
    },
    {
      title: 'AdSense application',
      status: 'Next',
      priority: 'Medium',
      href: '/revenue-intelligence/',
      description: 'Apply only after the site has enough useful content and no broken critical pages.',
    },
    {
      title: 'Affiliate disclosures',
      status: 'Needs review',
      priority: 'High',
      href: '/disclaimer/',
      description: 'Before affiliate links are added, disclosure language should be clear.',
    },
    {
      title: 'Official source guidance',
      status: 'Needs review',
      priority: 'High',
      href: '/official-source-center/',
      description: 'High-trust travel guidance should remind users to verify with official sources.',
    },
    {
      title: 'Google Search Console',
      status: 'Next',
      priority: 'High',
      href: '/launch-readiness/',
      description: 'Connect and submit sitemap after the main routes are deployed.',
    },
  ];
}

export function getThirtyDayLaunchPlan(): LaunchCheck[] {
  return [
    {
      title: 'Week 1: Fix and verify',
      status: 'Next',
      priority: 'High',
      href: '/launch-readiness/',
      description: 'Check homepage, search, rule pages, trip planner, travel intelligence, destination guides and mobile UI.',
    },
    {
      title: 'Week 2: Publish and index',
      status: 'Next',
      priority: 'High',
      href: '/seo-scale/',
      description: 'Submit sitemap, check Search Console, improve pages with impressions and add internal links.',
    },
    {
      title: 'Week 3: Soft marketing',
      status: 'Next',
      priority: 'Medium',
      href: '/ai-content-factory/',
      description: 'Create short videos, Pinterest pins and helpful answers from the AI Content Factory queue.',
    },
    {
      title: 'Week 4: Soft monetisation',
      status: 'Next',
      priority: 'Medium',
      href: '/revenue-intelligence/',
      description: 'Add light affiliate links where useful and prepare AdSense application if quality is strong.',
    },
  ];
}

export function getAdSenseDoNotDoList(): string[] {
  return [
    'Do not cover the main answer with ads.',
    'Do not add ads before the page feels useful.',
    'Do not publish thin AI pages just to increase page count.',
    'Do not add affiliate links where they do not help the traveller.',
    'Do not make internal dashboards the main public experience.',
    'Do not apply before privacy, terms, contact and about pages are polished.',
  ];
}
