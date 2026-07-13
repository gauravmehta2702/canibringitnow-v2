import type { RuleStatus } from '@/data/rules';

export type TravelEntityKind = 'rule' | 'item' | 'airline' | 'country' | 'category' | 'guide' | 'source';

export type SourceAuthorityType =
  | 'government'
  | 'aviation-regulator'
  | 'airline'
  | 'airport'
  | 'customs'
  | 'industry'
  | 'editorial';

export type SourceRecord = {
  id: string;
  title: string;
  authorityType: SourceAuthorityType;
  url?: string;
  checkedOn?: string;
  appliesTo: string[];
  status: 'verified' | 'needs-verification' | 'editorial-summary';
};

export type TravelRuleNode = {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  itemSlug: string;
  airlineSlugs: string[];
  countrySlugs: string[];
  guideSlugs: string[];
  sourceIds: string[];
  cabin: RuleStatus;
  checked: RuleStatus;
  updated: string;
  tags: string[];
};

export type TravelEntityNode = {
  id: string;
  kind: Exclude<TravelEntityKind, 'rule' | 'source'>;
  slug: string;
  name: string;
  href: string;
  ruleIds: string[];
  tags: string[];
};

export type TravelGraphEdgeType =
  | 'belongs-to-category'
  | 'describes-item'
  | 'applies-to-airline'
  | 'applies-to-country'
  | 'supported-by-source'
  | 'related-by-topic'
  | 'same-item-different-context'
  | 'same-category'
  | 'same-baggage-outcome';

export type TravelGraphEdge = {
  id: string;
  from: string;
  to: string;
  type: TravelGraphEdgeType;
  weight: number;
  reasons: string[];
};

export type TravelGraph = {
  version: '2.0';
  generatedAt: string;
  rules: TravelRuleNode[];
  items: TravelEntityNode[];
  airlines: TravelEntityNode[];
  countries: TravelEntityNode[];
  categories: TravelEntityNode[];
  guides: TravelEntityNode[];
  sources: SourceRecord[];
  edges: TravelGraphEdge[];
};

export type RuleGraphContext = {
  rule: TravelRuleNode;
  item?: TravelEntityNode;
  category?: TravelEntityNode;
  airlines: TravelEntityNode[];
  countries: TravelEntityNode[];
  guides: TravelEntityNode[];
  sources: SourceRecord[];
  missingSourceTypes: SourceAuthorityType[];
};

export type GraphRecommendation = {
  href: string;
  title: string;
  description: string;
  eyebrow: string;
  score: number;
  reasons: string[];
};

export type JourneyGraphAssessment = {
  score: number;
  label: 'Low context' | 'Partial context' | 'Strong context' | 'Well connected';
  alerts: string[];
  recommendations: GraphRecommendation[];
  matchedRuleCount: number;
  officialSourceGapCount: number;
};
