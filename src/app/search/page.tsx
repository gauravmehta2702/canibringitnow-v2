'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, Sparkles } from 'lucide-react';
import { getSmartAnswer, smartSearch } from '@/lib/smartSearch';
import { trackRuleClick, trackSearch } from '@/lib/track';
import type { Rule } from '@/data/rules';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Rule[]>([]);
  const [bestMatch, setBestMatch] = useState<Rule | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || '';
    const nextResults = smartSearch(q, 12);
    setQuery(q);
    setResults(nextResults);
    setBestMatch(getSmartAnswer(q));
    trackSearch(q, nextResults.length, 'search_results_page');
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            <ArrowLeft className="h-4 w-4" />
            Back to homepage
          </a>

          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <Search className="h-7 w-7 text-brand-600" />
              <p className="font-semibold text-brand-600">Smart search results</p>
            </div>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              {query ? `Results for “${query}”` : 'Search travel rules'}
            </h1>

            <p className="mt-4 max-w-2xl text-slate-600">
              Smart search understands related phrases like diabetes medicine, portable charger, baby formula and toiletries.
            </p>

            {bestMatch && (
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-brand-50 to-white p-6 ring-1 ring-brand-100">
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-600">
                  <Sparkles className="h-4 w-4" />
                  Best match
                </div>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">{bestMatch.item}</h2>
                <p className="mt-3 leading-7 text-slate-600">{bestMatch.shortAnswer}</p>
                <a
                  href={`/rules/${bestMatch.slug}/`}
                  onClick={() => trackRuleClick(bestMatch.slug, 'search_best_match', query)}
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-600"
                >
                  Open full rule <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}

            {results.length > 0 ? (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {results.map((rule) => (
                  <a
                    key={rule.slug}
                    href={`/rules/${rule.slug}/`}
                    onClick={() => trackRuleClick(rule.slug, 'search_result_card', query)}
                    className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-brand-500 hover:bg-brand-50"
                  >
                    <p className="text-sm font-semibold text-brand-600">{rule.category}</p>
                    <h2 className="mt-2 text-xl font-bold text-slate-950">{rule.item}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                      Open rule <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <h2 className="text-xl font-bold text-slate-950">No exact match yet</h2>
                <p className="mt-2 text-slate-600">
                  Try a simpler search like power bank, medication, baby milk, perfume, liquids or food.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
