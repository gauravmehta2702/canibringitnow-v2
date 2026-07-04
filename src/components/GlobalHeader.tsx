'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ArrowRight, Clock, Home, Luggage, Plane, Search, Sparkles, X } from 'lucide-react';
import { airlines, countries, rules } from '@/data/rules';
import { smartSearch } from '@/lib/smartSearch';
import { trackSearchEvent } from '@/lib/searchLearning';

type RecentRule = {
  slug: string;
  item: string;
  category: string;
};

const RECENT_SEARCH_KEY = 'cibit_recent_searches_v2';
const RECENT_RULE_KEY = 'cibit_recent_rules_v1';

function pushUnique<T>(items: T[], item: T, getKey: (value: T) => string, limit = 6) {
  const key = getKey(item);
  return [item, ...items.filter((value) => getKey(value) !== key)].slice(0, limit);
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures in private browsing.
  }
}

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function GlobalHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recentRules, setRecentRules] = useState<RecentRule[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const currentQuery = searchParams.get('q') || '';
    setQuery(currentQuery);
  }, [searchParams]);

  useEffect(() => {
    setRecentSearches(readJson<string[]>(RECENT_SEARCH_KEY, []));
    setRecentRules(readJson<RecentRule[]>(RECENT_RULE_KEY, []));
  }, []);

  useEffect(() => {
    const match = pathname.match(/^\/rules\/([^/]+)/);
    if (!match) return;

    const rule = rules.find((candidate) => candidate.slug === match[1]);
    if (!rule) return;

    const next = pushUnique(
      readJson<RecentRule[]>(RECENT_RULE_KEY, []),
      { slug: rule.slug, item: rule.item, category: rule.category },
      (value) => value.slug,
      5,
    );
    writeJson(RECENT_RULE_KEY, next);
    setRecentRules(next);
  }, [pathname]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;
      if (event.key === '/' && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const ruleSuggestions = useMemo(() => (query.trim() ? smartSearch(query, 5) : []), [query]);

  const entitySuggestions = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const airlineMatches = airlines
      .filter((airline) => airline.toLowerCase().includes(q))
      .slice(0, 2)
      .map((airline) => ({ label: airline, href: `/airlines/${slugify(airline)}/`, type: 'Airline guide' }));

    const countryMatches = countries
      .filter((country) => country.toLowerCase().includes(q))
      .slice(0, 2)
      .map((country) => ({ label: country, href: `/countries/${slugify(country)}/`, type: 'Destination guide' }));

    return [...airlineMatches, ...countryMatches];
  }, [query]);

  const shouldShowPanel = focused && (query.trim().length > 0 || recentSearches.length > 0 || recentRules.length > 0);

  function submitSearch(value?: string) {
    const q = (value || query).trim();
    if (!q) return;

    const results = smartSearch(q, 6);
    const next = pushUnique(readJson<string[]>(RECENT_SEARCH_KEY, []), q, (item) => item.toLowerCase(), 6);
    writeJson(RECENT_SEARCH_KEY, next);
    setRecentSearches(next);
    trackSearchEvent({ query: q, resultCount: results.length, bestMatchSlug: results[0]?.slug, source: 'global-header' });
    window.location.href = `/search/?q=${encodeURIComponent(q)}`;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:px-8">
        <a href="/" className="flex shrink-0 items-center gap-2 font-black text-slate-950" aria-label="Can I Bring It Now homepage">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white shadow-sm">
            <Luggage className="h-5 w-5" />
          </span>
          <span className="hidden sm:inline">Can I Bring It Now</span>
        </a>

        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={(event) => event.key === 'Enter' && submitSearch()}
            placeholder="Ask naturally: power bank on Emirates, baby milk to USA..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-12 text-sm font-medium outline-none transition focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
            aria-label="Search travel rules from any page"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {shouldShowPanel && (
            <div
              onMouseDown={(event) => event.preventDefault()}
              className="absolute left-0 right-0 top-[calc(100%+0.65rem)] max-h-[70vh] overflow-y-auto rounded-3xl bg-white p-3 shadow-2xl ring-1 ring-slate-200"
            >
              {query.trim().length > 0 && (
                <div>
                  <div className="mb-2 flex items-center gap-2 px-2 text-xs font-black uppercase tracking-wide text-brand-600">
                    <Sparkles className="h-4 w-4" /> Best matches
                  </div>
                  <div className="grid gap-2">
                    {entitySuggestions.map((item) => (
                      <a key={item.href} href={item.href} className="rounded-2xl bg-brand-50 px-4 py-3 hover:bg-brand-100">
                        <p className="text-xs font-black uppercase tracking-wide text-brand-600">{item.type}</p>
                        <p className="font-black text-slate-950">{item.label}</p>
                      </a>
                    ))}
                    {ruleSuggestions.map((rule) => (
                      <a key={rule.slug} href={`/rules/${rule.slug}/`} className="rounded-2xl bg-slate-50 px-4 py-3 hover:bg-brand-50">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500">{rule.category}</p>
                        <p className="font-black text-slate-950">{rule.item}</p>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{rule.shortAnswer}</p>
                      </a>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => submitSearch()}
                    className="mt-3 flex w-full items-center justify-between rounded-2xl bg-brand-600 px-4 py-3 font-black text-white hover:bg-brand-700"
                  >
                    Search for “{query}” <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {query.trim().length === 0 && recentSearches.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center gap-2 px-2 text-xs font-black uppercase tracking-wide text-slate-500">
                    <Clock className="h-4 w-4" /> Recent searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((recent) => (
                      <button key={recent} onClick={() => submitSearch(recent)} className="rounded-full bg-slate-100 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-brand-50 hover:text-brand-700">
                        {recent}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.trim().length === 0 && recentRules.length > 0 && (
                <div className="mt-4">
                  <div className="mb-2 flex items-center gap-2 px-2 text-xs font-black uppercase tracking-wide text-slate-500">
                    <Plane className="h-4 w-4" /> Recently viewed
                  </div>
                  <div className="grid gap-2">
                    {recentRules.map((rule) => (
                      <a key={rule.slug} href={`/rules/${rule.slug}/`} className="rounded-2xl bg-slate-50 px-4 py-3 hover:bg-brand-50">
                        <p className="text-xs font-black uppercase tracking-wide text-brand-600">{rule.category}</p>
                        <p className="font-black text-slate-950">{rule.item}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <nav className="hidden items-center gap-3 text-sm font-bold text-slate-600 lg:flex" aria-label="Main navigation">
          <a href="/" className="rounded-xl px-3 py-2 hover:bg-slate-100"><Home className="inline h-4 w-4" /> Home</a>
          <a href="/categories/" className="rounded-xl px-3 py-2 hover:bg-slate-100">Categories</a>
          <a href="/airlines/" className="rounded-xl px-3 py-2 hover:bg-slate-100">Airlines</a>
          <a href="/countries/" className="rounded-xl px-3 py-2 hover:bg-slate-100">Countries</a>
          <a href="/ask/" className="rounded-xl bg-slate-950 px-4 py-2 text-white hover:bg-slate-800">Ask</a>
        </nav>
      </div>
    </header>
  );
}
