'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { rules } from '@/data/rules';

function searchRules(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return rules
    .map((rule) => {
      const text = [rule.item, rule.category, rule.shortAnswer, ...rule.tags].join(' ').toLowerCase();
      let score = 0;

      if (rule.item.toLowerCase().includes(q)) score += 5;
      if (rule.category.toLowerCase().includes(q)) score += 3;
      if (rule.tags.some((tag) => tag.toLowerCase().includes(q))) score += 3;

      q.split(' ').filter(Boolean).forEach((word) => {
        if (text.includes(word)) score += 1;
      });

      return { rule, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.rule);
}

export default function SearchPage() {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') || '');
  }, []);

  const results = searchRules(query);

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
              <p className="font-semibold text-brand-600">Search results</p>
            </div>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              {query ? `Results for “${query}”` : 'Search travel rules'}
            </h1>

            <p className="mt-4 max-w-2xl text-slate-600">
              Find clear travel guidance for cabin baggage, checked baggage, airport security and customs restrictions.
            </p>

            {results.length > 0 ? (
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {results.map((rule) => (
                  <a
                    key={rule.slug}
                    href={`/rules/${rule.slug}/`}
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
