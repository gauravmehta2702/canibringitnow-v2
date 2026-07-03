'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Clock, Luggage, Plane, Search, TrendingUp } from 'lucide-react';
import { smartSearch } from '@/lib/smartSearch';
import { getPopularFallbackSearches, getRecentSearches, trackSearchEvent } from '@/lib/searchLearning';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const results = useMemo(() => smartSearch(query, 6), [query]);

  useEffect(() => setRecentSearches(getRecentSearches(5)), []);

  const submitSearch = (override?: string) => {
    const q = (override || query).trim();
    if (!q) return;
    const searchResults = smartSearch(q, 6);
    trackSearchEvent({ query: q, resultCount: searchResults.length, bestMatchSlug: searchResults[0]?.slug, source: 'homepage' });
    window.location.href = `/search/?q=${encodeURIComponent(q)}`;
  };

  const examples = getPopularFallbackSearches().slice(0, 5);

  return (
    <div className="mx-auto mt-8 max-w-5xl rounded-[2rem] bg-white p-4 text-left shadow-soft ring-1 ring-slate-200 md:p-5">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
            placeholder="Try insulin, diabetes medicine, power bank, baby formula, perfume..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-base outline-none focus:border-brand-500 focus:bg-white"
            aria-label="Search travel rules"
          />
        </div>
        <button onClick={() => submitSearch()} className="rounded-2xl bg-brand-600 px-6 py-4 font-bold text-white transition hover:bg-brand-700">Search</button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {examples.map((example) => (
          <button key={example} onClick={() => submitSearch(example)} className="rounded-full bg-brand-50 px-3 py-1.5 font-medium text-brand-700 hover:bg-brand-100">{example}</button>
        ))}
      </div>

      {recentSearches.length > 0 && (
        <div className="mt-4 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"><Clock className="h-3.5 w-3.5" /> Recent searches on this device</div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((recent) => (
              <button key={recent} onClick={() => submitSearch(recent)} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700">{recent}</button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 grid gap-3">
        {query.trim().length > 0 && results.length === 0 && (
          <div className="rounded-3xl border border-amber-100 bg-amber-50 p-4">
            <div className="flex items-center gap-2 font-bold text-amber-950"><TrendingUp className="h-5 w-5" /> No exact match yet</div>
            <p className="mt-2 text-sm leading-6 text-amber-800">Try a simpler phrase such as power bank, medication, baby formula, liquids or food. We use no-result searches to decide what to add next.</p>
          </div>
        )}

        {results.map((rule) => (
          <a key={rule.slug} href={`/rules/${rule.slug}/`} onClick={() => trackSearchEvent({ query, resultCount: results.length, bestMatchSlug: rule.slug, source: 'homepage' })} className="rounded-3xl border border-slate-200 p-4 transition hover:border-brand-500 hover:bg-brand-50">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-lg font-bold text-slate-950">{rule.item}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{rule.category}</span>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">View rule <ArrowRight className="h-4 w-4" /></div>
          </a>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
        <span className="inline-flex items-center gap-1"><Luggage className="h-3 w-3" /> Cabin & checked baggage</span>
        <span className="inline-flex items-center gap-1"><Plane className="h-3 w-3" /> Airline and travel rules</span>
      </div>
    </div>
  );
}
