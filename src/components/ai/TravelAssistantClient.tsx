'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, Brain, CheckCircle2, Plane, Search, ShieldCheck } from 'lucide-react';
import { analyseTravelQuestion } from '@/lib/aiTravelAssistant';

const exampleQuestions = [
  'Can I take a power bank on Emirates to Japan?',
  'Flying to USA with baby formula and medication',
  'Can I take protein powder to Japan?',
  'CPAP machine on Qatar Airways',
  'Drone batteries on Virgin Atlantic',
];

export default function TravelAssistantClient() {
  const [query, setQuery] = useState('Can I take a power bank on Emirates to Japan?');
  const answer = useMemo(() => analyseTravelQuestion(query), [query]);

  function submitSearch(value: string) {
    const q = value.trim();
    if (!q) return;
    window.location.href = `/search/?q=${encodeURIComponent(q)}`;
  }

  return (
    <div className="mt-8">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-brand-600" />
          <p className="font-bold text-brand-600">G5 AI travel assistant</p>
        </div>

        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
          Ask a full travel question
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Type naturally. The assistant detects items, airlines and destinations, then links you to the most relevant travel rules.
        </p>

        <div className="mt-8 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <label htmlFor="travel-ai-query" className="sr-only">Ask a travel rules question</label>
          <textarea
            id="travel-ai-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            rows={4}
            className="w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-base font-medium outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            placeholder="Example: I am flying from Heathrow to Tokyo on Emirates with a power bank, protein powder and medication..."
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {exampleQuestions.map((example) => (
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

          <button
            type="button"
            onClick={() => submitSearch(query)}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-black text-white hover:bg-brand-700"
          >
            <Search className="h-5 w-5" />
            Open full search results
          </button>
        </div>

        <section className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-sky-200">
              <ShieldCheck className="h-4 w-4" />
              Travel intelligence summary
            </p>
            <h2 className="mt-5 text-3xl font-black">Confidence {answer.confidence}%</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-300">{answer.summary}</p>
          </div>
        </section>

        {answer.entities.length > 0 && (
          <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <Plane className="h-6 w-6 text-brand-600" />
              <h2 className="text-2xl font-black text-slate-950">Detected travel details</h2>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {answer.entities.map((entity) => (
                <a
                  key={`${entity.type}-${entity.label}-${entity.href}`}
                  href={entity.href}
                  className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50"
                >
                  <p className="text-xs font-black uppercase tracking-wide text-brand-600">{entity.type}</p>
                  <p className="mt-1 font-black text-slate-950">{entity.label}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {answer.matchedRules.length > 0 && (
          <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-brand-600" />
              <h2 className="text-2xl font-black text-slate-950">Best matching rules</h2>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {answer.matchedRules.map((rule) => (
                <a
                  key={rule.slug}
                  href={`/rules/${rule.slug}/`}
                  className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50"
                >
                  <p className="text-xs font-black uppercase tracking-wide text-brand-600">{rule.category}</p>
                  <p className="mt-1 font-black text-slate-950">{rule.item}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">
                    Open rule <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <h2 className="text-xl font-black text-slate-950">Before you fly</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
              {answer.checklist.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>

          <div className="rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-100">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-700" />
              <h2 className="text-xl font-black text-amber-950">Warnings</h2>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-amber-800">
              {answer.warnings.map((warning) => <li key={warning}>{warning}</li>)}
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="text-2xl font-black text-slate-950">Related questions</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {answer.relatedQuestions.map((question) => (
              <a
                key={question}
                href={`/search/?q=${encodeURIComponent(question)}`}
                className="rounded-full bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700"
              >
                {question}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
