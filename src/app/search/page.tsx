'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles, TrendingUp } from 'lucide-react';
import { getSmartAnswer, smartSearch } from '@/lib/smartSearch';
import { atlasSearch } from '@/lib/atlasSearchEngine';
import AtlasSearchIntentPanel from '@/components/atlas/AtlasSearchIntentPanel';
import { getPopularFallbackSearches, trackSearchEvent } from '@/lib/searchLearning';
import SearchIntelligencePanel from '@/components/search/SearchIntelligencePanel';
import RecentlyViewedRules from '@/components/search/RecentlyViewedRules';
import type { Rule } from '@/data/rules';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Rule[]>([]);
  const [bestMatch, setBestMatch] = useState<Rule | null>(null);
  const [searchReasons, setSearchReasons] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    const atlasResults = atlasSearch(q, 12);
    const searchResults = atlasResults.map((result) => result.rule);
    const reasons = Object.fromEntries(atlasResults.map((result) => [result.rule.slug, result.reasons]));
    const match = getSmartAnswer(q);
    setQuery(q);
    setResults(searchResults);
    setBestMatch(match);
    setSearchReasons(reasons);
    if (q.trim()) trackSearchEvent({ query: q, resultCount: searchResults.length, bestMatchSlug: match?.slug || searchResults[0]?.slug, source: 'search-page' });
  }, []);

  const suggestions = getPopularFallbackSearches();

  const runSearch = (value: string) => {
    const nextQuery = value.trim();
    if (!nextQuery) return;
    window.location.href = `/search/?q=${encodeURIComponent(nextQuery)}`;
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600"><ArrowLeft className="h-4 w-4" /> Back to homepage</a>
          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <div className="flex items-center gap-3"><Search className="h-7 w-7 text-brand-600" /><p className="font-semibold text-brand-600">Smart search results</p></div>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">{query ? `Results for “${query}”` : 'Search travel rules'}</h1>
            <p className="mt-4 max-w-2xl text-slate-600">ATLAS search understands synonyms, airlines, destinations and baggage intent such as medicine, tablets, portable charger, cabin bag and customs.</p>

            <div className="mt-7 flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && runSearch(query)}
                  aria-label="Search travel rules"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none focus:border-brand-500 focus:bg-white"
                  placeholder="Search an item, airline, country or baggage question"
                />
              </div>
              <button type="button" onClick={() => runSearch(query)} className="rounded-2xl bg-brand-600 px-6 py-4 font-black text-white hover:bg-brand-700">Search again</button>
            </div>

            <SearchIntelligencePanel query={query} onChoose={runSearch} />
            <RecentlyViewedRules />

            {bestMatch && (
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-brand-50 to-white p-6 ring-1 ring-brand-100">
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-600"><Sparkles className="h-4 w-4" /> Best match</div>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">{bestMatch.item}</h2>
                <p className="mt-3 leading-7 text-slate-600">{bestMatch.shortAnswer}</p>
                <a href={`/rules/${bestMatch.slug}/`} onClick={() => trackSearchEvent({ query, resultCount: results.length, bestMatchSlug: bestMatch.slug, source: 'search-page' })} className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-600">Open full rule <ArrowRight className="h-4 w-4" /></a>
              </div>
            )}

            <AtlasSearchIntentPanel query={query} />

            {results.length > 0 ? (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {results.map((rule) => (
                  <a key={rule.slug} href={`/rules/${rule.slug}/`} onClick={() => trackSearchEvent({ query, resultCount: results.length, bestMatchSlug: rule.slug, source: 'search-page' })} className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-brand-500 hover:bg-brand-50">
                    <p className="text-sm font-semibold text-brand-600">{rule.category}</p>
                    <h2 className="mt-2 text-xl font-bold text-slate-950">{rule.item}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
                    {searchReasons[rule.slug]?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {searchReasons[rule.slug].map((reason) => (
                          <span key={reason} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{reason}</span>
                        ))}
                      </div>
                    )}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">Open rule <ArrowRight className="h-4 w-4" /></span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-brand-600" /><h2 className="text-xl font-bold text-slate-950">No exact match yet</h2></div>
                <p className="mt-2 text-slate-600">Try a simpler search like power bank, medication, baby milk, perfume, liquids or food. We will use searches like this to decide what to add next.</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => <a key={suggestion} href={`/search/?q=${encodeURIComponent(suggestion)}`} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700">{suggestion}</a>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
