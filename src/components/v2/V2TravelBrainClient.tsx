'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Brain, CheckCircle2, Plane, Search, ShieldCheck } from 'lucide-react';
import { analyseTripQuery } from '@/lib/v2TravelBrain';

const examples = [
  'I am flying Emirates to Japan with a power bank, medication and protein powder',
  'Ryanair flight with baby formula, stroller and liquids',
  'Virgin Atlantic with drone batteries and camera equipment',
  'Medication and CPAP machine on Qatar Airways to USA',
];

export default function V2TravelBrainClient() {
  const [query, setQuery] = useState(examples[0]);
  const result = useMemo(() => analyseTripQuery(query), [query]);

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-brand-600" />
          <p className="font-bold text-brand-600">V2 AI Travel Brain</p>
        </div>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Ask one complete travel question</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Enter your airline, destination and items. The travel brain connects rules, hubs, checklists and next actions.</p>
        <textarea value={query} onChange={(e) => setQuery(e.target.value)} rows={4} className="mt-8 w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 p-5 text-base font-medium outline-none focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100" />
        <div className="mt-4 flex flex-wrap gap-2">
          {examples.map((example) => (
            <button key={example} type="button" onClick={() => setQuery(example)} className="rounded-full bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700">
              {example}
            </button>
          ))}
        </div>
        <section className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-sky-200">
            <ShieldCheck className="h-4 w-4" /> Travel brain summary
          </p>
          <h2 className="mt-5 text-3xl font-black">Confidence {result.confidence}%</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">{result.summary}</p>
        </section>
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <div className="flex items-center gap-3"><Plane className="h-6 w-6 text-brand-600" /><h2 className="text-2xl font-black text-slate-950">Detected details</h2></div>
            <div className="mt-4 space-y-3">
              <p><strong>Airlines:</strong> {result.detectedAirlines.length ? result.detectedAirlines.join(', ') : 'None detected'}</p>
              <p><strong>Countries:</strong> {result.detectedCountries.length ? result.detectedCountries.join(', ') : 'None detected'}</p>
              <p><strong>Matched rules:</strong> {result.matchedRules.length}</p>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <div className="flex items-center gap-3"><CheckCircle2 className="h-6 w-6 text-brand-600" /><h2 className="text-2xl font-black text-slate-950">Before you fly</h2></div>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">{result.checklist.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>
        <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
          <div className="flex items-center gap-3"><Search className="h-6 w-6 text-brand-600" /><h2 className="text-2xl font-black text-slate-950">Best matching rule pages</h2></div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {result.matchedRules.map((rule) => (
              <a key={rule.slug} href={`/rules/${rule.slug}/`} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
                <p className="text-xs font-black uppercase tracking-wide text-brand-600">{rule.category}</p>
                <p className="mt-1 font-black text-slate-950">{rule.item}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">Open rule <ArrowRight className="h-4 w-4" /></span>
              </a>
            ))}
          </div>
        </section>
        <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="text-2xl font-black text-slate-950">Next actions</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {result.nextActions.map((action) => (
              <a key={action.href + action.title} href={action.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
                <p className="font-black text-slate-950">{action.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{action.description}</p>
              </a>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
