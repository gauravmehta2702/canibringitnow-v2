'use client';
import { useMemo, useState } from 'react';
import { Search, Plane, ShieldCheck, AlertTriangle } from 'lucide-react';
import { rules } from '@/data/rules';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return rules.slice(0, 4);
    return rules.filter(r => [r.item, r.category, r.shortAnswer, ...r.tags].join(' ').toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  return <div className="mx-auto mt-8 max-w-3xl rounded-3xl bg-white p-3 shadow-soft ring-1 ring-slate-200">
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Power bank, baby milk, medication, food to Japan..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-base outline-none focus:border-brand-500 focus:bg-white" />
      </div>
      <button className="rounded-2xl bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-900">Check rules</button>
    </div>
    <div className="mt-4 grid gap-3">
      {results.map(r => <a key={r.slug} href={`/rules/${r.slug}/`} className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-brand-500 hover:bg-brand-50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-950">{r.item}</p>
            <p className="mt-1 text-sm text-slate-600">{r.shortAnswer}</p>
          </div>
          <span className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{r.category}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-green-700"><ShieldCheck className="h-3 w-3" /> Cabin: {r.cabin}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-orange-700"><AlertTriangle className="h-3 w-3" /> Checked: {r.checked}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-blue-700"><Plane className="h-3 w-3" /> Updated {r.updated}</span>
        </div>
      </a>)}
    </div>
  </div>
}
