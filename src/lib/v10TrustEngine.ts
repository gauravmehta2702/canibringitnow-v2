import { rules } from '@/data/rules';

export type TrustSourceGroup = {
  title: string;
  label: string;
  description: string;
  examples: string[];
};

export type QualityItem = {
  title: string;
  score: number;
  status: 'Strong' | 'Improve' | 'Watch';
  recommendation: string;
};

export function getOfficialSourceGroups(): TrustSourceGroup[] {
  return [
    {
      title: 'Airline official policy',
      label: 'Airlines',
      description: 'For baggage allowance, cabin baggage, checked baggage, lithium battery limits and special items.',
      examples: ['British Airways baggage policy', 'Emirates dangerous goods policy', 'Ryanair cabin bag rules'],
    },
    {
      title: 'Airport security authority',
      label: 'Airport security',
      description: 'For liquids, screening, prohibited items and security officer discretion.',
      examples: ['UK airport security guidance', 'TSA rules', 'EU airport security guidance'],
    },
    {
      title: 'Government customs authority',
      label: 'Customs',
      description: 'For food, medication, plants, animal products, alcohol, tobacco and import restrictions.',
      examples: ['Japan Customs', 'US CBP', 'UK Border Force'],
    },
    {
      title: 'Health and medicine authority',
      label: 'Medication',
      description: 'For controlled medicines, prescriptions, doctor letters and import permits.',
      examples: ['NHS travel medicines advice', 'Government health authority', 'Embassy medicine rules'],
    },
    {
      title: 'Destination travel advisory',
      label: 'Destination',
      description: 'For entry rules, safety advisories and official travel information.',
      examples: ['UK FCDO travel advice', 'Government travel advisories', 'Embassy pages'],
    },
  ];
}

export function getQualityAuditItems(): QualityItem[] {
  const ruleCount = rules.length;
  return [
    {
      title: 'Core content depth',
      score: ruleCount >= 100 ? 85 : 65,
      status: ruleCount >= 100 ? 'Strong' : 'Improve',
      recommendation: 'Continue expanding useful rule pages, but avoid thin programmatic pages.',
    },
    {
      title: 'Trust and disclaimers',
      score: 78,
      status: 'Improve',
      recommendation: 'Add clear official-source reminders on major decision pages.',
    },
    {
      title: 'Navigation clarity',
      score: 88,
      status: 'Strong',
      recommendation: 'Keep Start Here, Before You Fly, Search and Trip Planner easy to find.',
    },
    {
      title: 'Revenue safety',
      score: 72,
      status: 'Watch',
      recommendation: 'Keep monetisation below the answer and only recommend relevant travel products.',
    },
    {
      title: 'AdSense readiness',
      score: 70,
      status: 'Watch',
      recommendation: 'Apply after launch pages are polished, indexed and receiving some traffic.',
    },
    {
      title: 'Marketing readiness',
      score: 82,
      status: 'Strong',
      recommendation: 'Use AI Content Factory weekly rather than trying to publish manually every day.',
    },
  ];
}

export function getTrustCopyBlocks() {
  return [
    {
      title: 'Important travel rule reminder',
      text: 'Travel rules can change. Use Can I Bring It Now as a fast preparation guide, then verify important restrictions with your airline, airport, customs authority or destination government before flying.',
    },
    {
      title: 'Affiliate disclosure',
      text: 'Some links may become affiliate links. Recommendations should remain relevant, optional and designed to help travellers prepare better.',
    },
    {
      title: 'AI assistance disclosure',
      text: 'AI may help organise explanations and summaries, but the site should rely on structured travel data, useful guidance and official-source reminders.',
    },
  ];
}
