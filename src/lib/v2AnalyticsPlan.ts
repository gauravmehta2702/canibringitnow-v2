export type AnalyticsEventPlan = {
  event: string;
  trigger: string;
  purpose: string;
  priority: 'High' | 'Medium' | 'Low';
};

export function getAnalyticsPlan(): AnalyticsEventPlan[] {
  return [
    { event: 'search_submitted', trigger: 'User submits any search', purpose: 'Find high-intent search demand.', priority: 'High' },
    { event: 'rule_page_viewed', trigger: 'User opens a rule page', purpose: 'Identify most valuable rule pages.', priority: 'High' },
    { event: 'hub_page_viewed', trigger: 'User opens airline/country/category hub', purpose: 'Measure hub demand.', priority: 'High' },
    { event: 'ai_brain_used', trigger: 'User types in V2 AI Travel Brain', purpose: 'Measure AI assistant engagement.', priority: 'High' },
    { event: 'packing_planner_used', trigger: 'User changes planner fields', purpose: 'Measure engagement and affiliate intent.', priority: 'Medium' },
    { event: 'product_card_clicked', trigger: 'User clicks product suggestion', purpose: 'Measure affiliate intent.', priority: 'High' },
    { event: 'outbound_source_clicked', trigger: 'User clicks official source', purpose: 'Measure trust and verification behaviour.', priority: 'Medium' },
    { event: 'related_link_clicked', trigger: 'User clicks related rule/internal link', purpose: 'Measure internal linking quality.', priority: 'Medium' },
  ];
}
