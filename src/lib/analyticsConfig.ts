export const analyticsConfig = {
  ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '',
  clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '',
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  enableAnalytics:
    process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true' ||
    process.env.NODE_ENV === 'production',
};

export const analyticsEvents = [
  'site_search',
  'tool_used',
  'trip_planner_used',
  'outbound_click',
  'affiliate_click',
  'rule_view',
  'country_hub_view',
  'airline_hub_view',
  'airport_hub_view',
  'knowledge_page_view',
];
