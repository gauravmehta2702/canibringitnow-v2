'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, Luggage, Plane, Search, ShieldCheck } from 'lucide-react';
import { rules } from '@/data/rules';

export default function SearchBox() {
  const [item, setItem] = useState('');
  const [airline, setAirline] = useState('');
  const [destination, setDestination] = useState('');

  const results = useMemo(() => {
    const query = [item, airline, destination].join(' ').toLowerCase().trim();

    if (!query) return rules.slice(0, 4);

    return rules
      .filter((rule) =>
        [rule.item, rule.category, rule.shortAnswer, ...rule.tags]
          .join(' ')
          .toLowerCase()
          .includes(query) ||
        query
          .split(' ')
          .some((word) =>
            [rule.item, rule.category, rule.shortAnswer, ...rule.tags]
              .join(' ')
              .toLowerCase()
              .includes(word)
          )
      )
      .slice(0, 6);
  }, [item, airline, destination]);

  return (
    <div className="mx-auto mt-8 max-w-5xl rounded-[2rem] bg-white p-4 text-left shadow-soft ring-1 ring-slate-200 md:p-5">
      <div className="grid gap-3 md:grid-cols-3">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Luggage className="h-4 w-4 text-brand-600" />
            Item
          </span>
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Power bank, medication, food..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none focus:border-brand-500 focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Plane className="h-4 w-4 text-brand-600" />
            Airline optional
          </span>
          <input
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
            placeholder="Ryanair, Emirates, BA..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none focus:border-brand-500 focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Search className="h-4 w-4 text-brand-600" />
            Destination optional
          </span>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Japan, USA, India..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base outline-none focus:border-brand-500 focus:bg-white"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {['power bank Ryanair', 'baby milk plane', 'medication', 'food Japan', 'deodorant UK'].map((example) => (
          <button
            key={example}
            onClick={() => {
              setItem(example);
              setAirline('');
              setDestination('');
            }}
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

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 font-medium text-green-700">
                <ShieldCheck className="h-3 w-3" />
                Cabin: {rule.cabin}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 font-medium text-orange-700">
                <AlertTriangle className="h-3 w-3" />
                Checked: {rule.checked}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700">
                Updated {rule.updated}
              </span>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
              View full rule <ArrowRight className="h-4 w-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
