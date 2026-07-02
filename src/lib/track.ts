type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const enrichedPayload = {
    page_path: window.location.pathname,
    page_location: window.location.href,
    ...payload,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...enrichedPayload,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, enrichedPayload);
  }
}

export function trackSearch(query: string, resultCount: number, source: string) {
  const cleaned = query.trim().toLowerCase();

  if (!cleaned) return;

  trackEvent("travel_search", {
    search_term: cleaned,
    result_count: resultCount,
    search_source: source,
    no_results: resultCount === 0,
  });
}

export function trackRuleClick(ruleSlug: string, source: string, query?: string) {
  trackEvent("rule_click", {
    rule_slug: ruleSlug,
    click_source: source,
    search_term: query?.trim().toLowerCase(),
  });
}
