'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Luggage, Plane, Search, ShieldCheck } from 'lucide-react';
import { rules } from '@/data/rules';
import { smartSearch } from '@/lib/smartSearch';

const airlines = ['Ryanair', 'easyJet', 'British Airways', 'Emirates', 'Qatar Airways', 'Air India'];
const destinations = ['United Kingdom', 'USA', 'Japan', 'India', 'Canada', 'Australia', 'UAE', 'Singapore'];

function statusClass(status: string) {
  if (status === 'Allowed') return 'bg-green-50 text-green-900 ring-green-100';
  if (status === 'Not allowed') return 'bg-red-50 text-red-900 ring-red-100';
  return 'bg-orange-50 text-orange-900 ring-orange-100';
}

export default function CheckPage() {
  const [item, setItem] = useState('');
  const [airline, setAirline] = useState('');
  const [destination, setDestination] = useState('');

  const bestMatch = useMemo(() => {
    if (!item.trim()) return null;
    return smartSearch(item, 1)[0] || null;
  }, [item]);

  const related = useMemo(() => {
    if (!item.trim()) return rules.slice(0, 6);
    return smartSearch(item, 6);
  }, [item]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to home</a>

          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-brand-600" />
              <p className="font-semibold text-brand-600">Travel Rule Matrix</p>
            </div>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Check if you can bring it before you fly
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Enter an item, airline and destination to get a quick travel decision.
              This is an early decision engine and should always be verified with official sources before travelling.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm font-bold text-slate-700">Item</label>
                <div className="relative mt-2">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Power bank, insulin, perfume..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none focus:border-brand-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">Airline</label>
                <select
                  value={airline}
                  onChange={(e) => setAirline(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-brand-500 focus:bg-white"
                >
                  <option value="">Select airline</option>
                  {airlines.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">Destination</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 outline-none focus:border-brand-500 focus:bg-white"
                >
                  <option value="">Select destination</option>
                  {destinations.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {bestMatch ? (
            <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-7 w-7 text-green-600" />
                <p className="font-semibold text-green-700">Best available match</p>
              </div>

              <h2 className="mt-3 text-3xl font-black text-slate-950">{bestMatch.item}</h2>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{bestMatch.shortAnswer}</p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className={`rounded-3xl p-6 ring-1 ${statusClass(bestMatch.cabin)}`}>
                  <div className="flex items-center gap-3">
                    <Luggage className="h-6 w-6" />
                    <div>
                      <p className="text-sm font-semibold uppercase opacity-70">Cabin baggage</p>
                      <p className="text-2xl font-black">{bestMatch.cabin}</p>
                    </div>
                  </div>
                </div>

                <div className={`rounded-3xl p-6 ring-1 ${statusClass(bestMatch.checked)}`}>
                  <div className="flex items-center gap-3">
                    <Plane className="h-6 w-6" />
                    <div>
                      <p className="text-sm font-semibold uppercase opacity-70">Checked baggage</p>
                      <p className="text-2xl font-black">{bestMatch.checked}</p>
                    </div>
                  </div>
                </div>
              </div>

              {(airline || destination) && (
                <div className="mt-6 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                  <p className="font-bold text-slate-950">Your trip context</p>
                  <p className="mt-2 text-slate-600">
                    {airline ? `Airline: ${airline}. ` : ''}
                    {destination ? `Destination: ${destination}. ` : ''}
                    Always confirm airline and destination-specific restrictions before travel.
                  </p>
                </div>
              )}

              {bestMatch.warning && (
                <div className="mt-6 rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-100">
                  <p className="font-bold text-amber-950">Important warning</p>
                  <p className="mt-2 text-amber-800">{bestMatch.warning}</p>
                </div>
              )}

              <a
                href={`/rules/${bestMatch.slug}/`}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 font-bold text-white hover:bg-brand-700"
              >
                Open full rule <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
              <h2 className="text-2xl font-bold text-slate-950">Start with an item</h2>
              <p className="mt-3 text-slate-600">
                Try power bank, baby formula, medication, insulin, perfume, liquids or food.
              </p>
            </div>
          )}

          <div className="mt-8">
            <p className="font-semibold text-brand-600">Related checks</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">Useful travel rules</h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {related.map((rule) => (
                <a
                  key={rule.slug}
                  href={`/rules/${rule.slug}/`}
                  className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <p className="text-sm font-semibold text-brand-600">{rule.category}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">{rule.item}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
