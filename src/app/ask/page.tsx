'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Bot, CheckCircle2, Search, ShieldCheck } from 'lucide-react';
import { getTravelAgentAnswer } from '@/lib/travelAgent';

const examples = [
  'Can I take a power bank on Emirates?',
  'Can I bring protein powder to Japan?',
  'Flying with CPAP machine on Qatar Airways',
  'Can I take baby formula to USA?',
];

export default function AskPage() {
  const [query, setQuery] = useState('');
  const answer = useMemo(() => (query.trim() ? getTravelAgentAnswer(query) : null), [query]);

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to home</a>

          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <Bot className="h-7 w-7 text-brand-600" />
              <p className="font-semibold text-brand-600">AI-ready travel assistant</p>
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Ask a travel item question
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Type a simple question about an item, airline or destination. This assistant uses your travel rules database and keeps the answer clear.
            </p>

            <div className="mt-8 flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Example: Can I take protein powder to Japan?"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none focus:border-brand-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {examples.map((example) => (
                <button key={example} onClick={() => setQuery(example)} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-100">
                  {example}
                </button>
              ))}
            </div>
          </div>

          {answer && (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-7 w-7 text-green-600" />
                  <p className="font-semibold text-green-700">Best available answer</p>
                </div>
                <h2 className="mt-4 text-3xl font-black text-slate-950">{answer.bestRule?.item || 'No exact match yet'}</h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">{answer.summary}</p>

                {answer.bestRule && (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl bg-green-50 p-5 ring-1 ring-green-100">
                      <p className="text-sm font-black uppercase text-green-900/70">Cabin baggage</p>
                      <p className="mt-1 text-2xl font-black text-green-950">{answer.bestRule.cabin}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                      <p className="text-sm font-black uppercase text-slate-500">Checked baggage</p>
                      <p className="mt-1 text-2xl font-black text-slate-950">{answer.bestRule.checked}</p>
                    </div>
                  </div>
                )}

                {answer.bestRule && (
                  <a href={`/rules/${answer.bestRule.slug}/`} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 font-bold text-white hover:bg-brand-700">
                    Open full rule <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </section>

              <aside className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-soft">
                <h2 className="text-2xl font-black">Before you travel</h2>
                <div className="mt-6 space-y-4">
                  {answer.checklist.map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-300" />
                      <p className="leading-7 text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
