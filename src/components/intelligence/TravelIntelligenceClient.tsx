'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Brain, CalendarDays, Link2, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { analyseTravelIntelligence } from '@/lib/travelIntelligenceEngine';

const examples = [
  'Power bank on Emirates to Japan',
  'Medication on Qatar Airways to USA',
  'Baby formula on Ryanair to Spain',
  'Drone batteries on Virgin Atlantic to India',
  'Protein powder to Australia',
];

export default function TravelIntelligenceClient() {
  const [query, setQuery] = useState(examples[0]);
  const result = useMemo(() => analyseTravelIntelligence({ query }), [query]);

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-brand-600" />
          <p className="font-bold text-brand-600">V3.5 Travel Intelligence Engine</p>
        </div>

        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
          One travel question. Connected answer.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Enter an item, airline or destination. The engine connects rules, related questions, packing timeline and next actions.
        </p>

        <div className="mt-8 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-base font-bold outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              placeholder="Example: power bank on Emirates to Japan"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setQuery(example)}
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-sky-200">
            <ShieldCheck className="h-4 w-4" /> Travel decision summary
          </p>
          <h2 className="mt-5 text-3xl font-black">Confidence {result.confidence}%</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">{result.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-sm font-bold text-slate-300">
            <span className="rounded-full bg-white/10 px-4 py-2">Airlines: {result.detectedAirlines.length ? result.detectedAirlines.join(', ') : 'None detected'}</span>
            <span className="rounded-full bg-white/10 px-4 py-2">Countries: {result.detectedCountries.length ? result.detectedCountries.join(', ') : 'None detected'}</span>
            <span className="rounded-full bg-white/10 px-4 py-2">Rules: {result.matchedRules.length}</span>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-brand-600" />
            <h2 className="text-2xl font-black text-slate-950">Best matching rules</h2>
          </div>
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
          <div className="flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-brand-600" />
            <h2 className="text-2xl font-black text-slate-950">Travel preparation timeline</h2>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {result.timeline.map((step) => (
              <div key={step.when} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-xs font-black uppercase tracking-wide text-brand-600">{step.when}</p>
                <p className="mt-1 font-black text-slate-950">{step.title}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                  {step.tasks.map((task) => <li key={task}>{task}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <Search className="h-6 w-6 text-brand-600" />
              <h2 className="text-2xl font-black text-slate-950">Related questions</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {result.relatedQuestions.map((link) => (
                <a key={link.title} href={link.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
                  <p className="text-xs font-black uppercase tracking-wide text-brand-600">{link.label}</p>
                  <p className="font-black text-slate-950">{link.title}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <Link2 className="h-6 w-6 text-brand-600" />
              <h2 className="text-2xl font-black text-slate-950">Next best actions</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {result.internalLinks.map((link) => (
                <a key={`${link.href}-${link.title}`} href={link.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
                  <p className="text-xs font-black uppercase tracking-wide text-brand-600">{link.label}</p>
                  <p className="font-black text-slate-950">{link.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{link.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
