'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Luggage, Plane, Search } from 'lucide-react';
import { rules } from '@/data/rules';

export default function SearchBox() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return rules.slice(0, 6);

    return rules
      .filter((rule) =>
        [rule.item, rule.category, rule.shortAnswer, ...rule.tags]
          .join(' ')
          .toLowerCase()
          .includes(q) ||
        q
          .split(' ')
          .filter(Boolean)
          .some((word) =>
            [rule.item, rule.category, rule.shortAnswer, ...rule.tags]
              .join(' ')
              .toLowerCase()
              .includes(word)
          )
      )
      .slice(0, 8);
  }, [query]);

  const submitSearch = () => {
    const q = query.trim();
    if (q) {
      window.location.href = `/search?q=${encodeURIComponent(q)}`;
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-5xl rounded-[2rem] bg-white p-4 text-left shadow-soft ring-1 ring-slate-200 md:p-5">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitSearch();
            }}
            placeholder="Search power bank, medication, baby milk, food, perfume..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-base outline-none focus:border-brand-500 focus:bg-white"
          />
        </div>

        <button
          onClick={submitSearch}
          className="rounded-2xl bg-brand-600 px-6 py-4 font-bold text-white transition hover:bg-brand-700"
        >
          Search
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {['power bank', 'baby milk', 'insulin', 'perfume', 'food Japan'].map((example) => (
          <button
            key={example}
            onClick={() => setQuery(example)}
            className="rounded-full bg-brand-50 px-3 py-1.5 font-medium text-brand-700 hover:bg-brand-100"
          >
            {example}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3">
        {results.map((rule) => (
          <a
            key={rule.slug}
            href={`/rules/${rule.slug}/`}
            className="rounded-3xl border border-slate-200 p-4 transition hover:border-brand-500 hover:bg-brand-50"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-lg font-bold text-slate-950">{rule.item}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
              </div>
              <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {rule.category}
              </span>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
              View rule <ArrowRight className="h-4 w-4" />
            </div>
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
