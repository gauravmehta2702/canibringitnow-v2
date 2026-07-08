export type AnalyticsEventName =
  | 'site_search'
  | 'tool_used'
  | 'trip_planner_used'
  | 'outbound_click'
  | 'affiliate_click'
  | 'rule_view'
  | 'country_hub_view'
  | 'airline_hub_view'
  | 'airport_hub_view'
  | 'knowledge_page_view'
  | 'newsletter_interest';

export type AnalyticsPayload = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}

export function trackEvent(name: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', name, cleanPayload(payload));
  }

  if (window.clarity) {
    window.clarity('event', name);
  }
}

export function trackSearch(query: string, source = 'site_search') {
  trackEvent('site_search', {
    search_term: query,
    source,
  });
}

export function trackToolUsed(toolName: string) {
  trackEvent('tool_used', {
    tool_name: toolName,
  });
}

export function trackTripPlannerUsed(destination?: string, airline?: string) {
  trackEvent('trip_planner_used', {
    destination,
    airline,
  });
}

export function trackOutboundClick(url: string, label?: string) {
  trackEvent('outbound_click', {
    url,
    label,
  });
}

export function trackAffiliateClick(url: string, placement?: string) {
  trackEvent('affiliate_click', {
    url,
    placement,
  });
}

function cleanPayload(payload: AnalyticsPayload) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  );
}
