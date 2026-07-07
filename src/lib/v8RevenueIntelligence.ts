import { rules } from '@/data/rules';

export type RevenueOpportunity = {
  title: string;
  href: string;
  category: string;
  intent: 'Low' | 'Medium' | 'High';
  placement: string;
  reason: string;
};

export function getRevenueOpportunities(): RevenueOpportunity[] {
  return [
    {
      title: 'Universal travel adapters',
      href: '/search/?q=universal%20travel%20adapter',
      category: 'Electronics',
      intent: 'High',
      placement: 'Destination pages, packing planner, before-you-fly dashboard',
      reason: 'Strong fit for international travellers and destination preparation.',
    },
    {
      title: 'Digital luggage scales',
      href: '/search/?q=digital%20luggage%20scale',
      category: 'Baggage',
      intent: 'High',
      placement: 'Airline pages and baggage-related rule pages',
      reason: 'Useful before flying and relevant to airline baggage allowance concerns.',
    },
    {
      title: 'Clear liquids bags',
      href: '/search/?q=clear%20airport%20liquids%20bag',
      category: 'Airport security',
      intent: 'High',
      placement: 'Liquids, toiletries and airport security pages',
      reason: 'Highly relevant to airport security preparation.',
    },
    {
      title: 'Medicine organisers',
      href: '/search/?q=travel%20medicine%20organiser',
      category: 'Medication',
      intent: 'Medium',
      placement: 'Medication pages and trip planner',
      reason: 'Good fit for users travelling with medicine.',
    },
    {
      title: 'Baby bottle travel bags',
      href: '/search/?q=baby%20bottle%20travel%20bag',
      category: 'Baby travel',
      intent: 'Medium',
      placement: 'Baby formula, baby milk and family travel pages',
      reason: 'Relevant for parents travelling with infants.',
    },
    {
      title: 'eSIM providers',
      href: '/search/?q=travel%20esim',
      category: 'Travel service',
      intent: 'High',
      placement: 'Destination pages and trip planner',
      reason: 'Very relevant once the user has a destination.',
    },
    {
      title: 'Travel insurance',
      href: '/search/?q=travel%20insurance',
      category: 'Travel service',
      intent: 'High',
      placement: 'Trip planner and before-you-fly dashboard',
      reason: 'High-value affiliate category when contextually placed.',
    },
    {
      title: 'Airport hotels',
      href: '/destination-guides/',
      category: 'Hotels',
      intent: 'Medium',
      placement: 'Destination guides and travel dashboard',
      reason: 'Relevant for early flights, stopovers and late arrivals.',
    },
  ];
}

export function getAdSenseReadinessChecklist() {
  return [
    'Privacy policy, terms, contact and about pages are live.',
    'Site has clear navigation and no broken core pages.',
    'Content is useful, original and not thin programmatic text.',
    'Mobile experience is clean and fast.',
    'Ads will not cover the answer or disrupt the user journey.',
    'Affiliate links use clear disclosure when added.',
    'Search Console is connected and pages are being indexed.',
    'The site has enough helpful content before applying.',
  ];
}

export function getRuleRevenueMatches(limit = 16): RevenueOpportunity[] {
  return rules.slice(0, limit).map((rule) => {
    const category = rule.category.toLowerCase();

    if (category.includes('battery') || category.includes('electronics')) {
      return {
        title: `${rule.item}: adapter and electronics accessories`,
        href: `/rules/${rule.slug}/`,
        category: 'Electronics',
        intent: 'High',
        placement: 'Below answer and after checklist',
        reason: 'Electronics-related rules can naturally recommend adapters, cable organisers or travel pouches.',
      };
    }

    if (category.includes('medicine') || category.includes('medication')) {
      return {
        title: `${rule.item}: medicine organiser`,
        href: `/rules/${rule.slug}/`,
        category: 'Medication',
        intent: 'Medium',
        placement: 'After official-source warning',
        reason: 'Medication pages can recommend organisation tools without replacing official advice.',
      };
    }

    if (category.includes('baby')) {
      return {
        title: `${rule.item}: baby travel essentials`,
        href: `/rules/${rule.slug}/`,
        category: 'Baby travel',
        intent: 'Medium',
        placement: 'After practical travel tips',
        reason: 'Baby travel pages can recommend useful preparation items.',
      };
    }

    return {
      title: `${rule.item}: travel preparation opportunity`,
      href: `/rules/${rule.slug}/`,
      category: rule.category,
      intent: 'Low',
      placement: 'Only if genuinely useful',
      reason: 'Keep recommendations relevant and avoid clutter.',
    };
  });
}
