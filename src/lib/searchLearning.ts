export type SearchLearningEvent = {
  query: string;
  resultCount: number;
  bestMatchSlug?: string;
  source: 'homepage' | 'search-page' | 'matrix' | 'unknown';
  createdAt: string;
};

const STORAGE_KEY = 'cibin_search_learning_v1';

function normaliseQuery(query: string) {
  return query.toLowerCase().replace(/\s+/g, ' ').trim();
}

export function trackSearchEvent(event: Omit<SearchLearningEvent, 'createdAt'>) {
  if (typeof window === 'undefined') return;
  const cleanedQuery = normaliseQuery(event.query);
  if (!cleanedQuery) return;

  const payload: SearchLearningEvent = { ...event, query: cleanedQuery, createdAt: new Date().toISOString() };

  try {
    const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]') as SearchLearningEvent[];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([payload, ...existing].slice(0, 100)));
  } catch {}

  const gtag = (window as any).gtag;
  if (typeof gtag === 'function') {
    gtag('event', 'site_search', {
      search_term: payload.query,
      result_count: payload.resultCount,
      best_match: payload.bestMatchSlug || '',
      search_source: payload.source,
      no_results: payload.resultCount === 0,
    });
  }
}

export function getRecentSearches(limit = 6) {
  if (typeof window === 'undefined') return [];
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]') as SearchLearningEvent[];
    const seen = new Set<string>();
    return existing
      .map((event) => event.query)
      .filter((query) => {
        if (seen.has(query)) return false;
        seen.add(query);
        return true;
      })
      .slice(0, limit);
  } catch {
    return [];
  }
}

export function getPopularFallbackSearches() {
  return ['power bank', 'medication', 'baby formula', 'liquids', 'perfume', 'food japan', 'portable charger', 'diabetes medicine'];
}
