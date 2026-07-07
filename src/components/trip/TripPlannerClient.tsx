'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, CheckCircle2, Plane, Route, Search } from 'lucide-react';
import { generateTripPlan, type TripPlannerInput } from '@/lib/v4TripPlatform';

export default function TripPlannerClient() {
  const [input, setInput] = useState<TripPlannerInput>({
    from: 'London',
    to: 'Japan',
    airline: 'Emirates',
    days: 10,
    travellers: '2 adults and 1 baby',
    items: 'power bank, medication, baby formula and protein powder',
  });

  const plan = useMemo(() => generateTripPlan(input), [input]);

  function update<K extends keyof TripPlannerInput>(key: K, value: TripPlannerInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
      <div className="flex items-center gap-3">
        <Route className="h-8 w-8 text-brand-600" />
        <p className="font-bold text-brand-600">V4 Integrated Trip Planner</p>
      </div>

      <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
        Build your travel preparation plan
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        Enter your route, airline, travellers and items. The planner connects rules, packing tasks, destination guidance and next actions.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <input className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold outline-none focus:border-brand-500" value={input.from} onChange={(e) => update('from', e.target.value)} placeholder="From" />
        <input className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold outline-none focus:border-brand-500" value={input.to} onChange={(e) => update('to', e.target.value)} placeholder="Destination" />
        <input className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold outline-none focus:border-brand-500" value={input.airline} onChange={(e) => update('airline', e.target.value)} placeholder="Airline" />
        <input type="number" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold outline-none focus:border-brand-500" value={input.days} onChange={(e) => update('days', Number(e.target.value))} placeholder="Days" />
        <input className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold outline-none focus:border-brand-500 md:col-span-2" value={input.travellers} onChange={(e) => update('travellers', e.target.value)} placeholder="Travellers" />
      </div>

      <textarea
        rows={4}
        className="mt-4 w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 p-5 font-bold outline-none focus:border-brand-500"
        value={input.items}
        onChange={(e) => update('items', e.target.value)}
        placeholder="Items you are carrying"
      />

      <section className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white">
        <div className="flex items-center gap-3">
          <Plane className="h-6 w-6 text-sky-300" />
          <p className="font-bold text-sky-300">Trip summary</p>
        </div>
        <h2 className="mt-4 text-3xl font-black">{plan.summary}</h2>
        <p className="mt-3 text-slate-300">Detected airline: {plan.detectedAirline} · Destination: {plan.detectedCountry}</p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-brand-600" />
            <h2 className="text-2xl font-black text-slate-950">Core checklist</h2>
          </div>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
            {plan.checklist.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
          <div className="flex items-center gap-3">
            <Search className="h-6 w-6 text-brand-600" />
            <h2 className="text-2xl font-black text-slate-950">Matched rule pages</h2>
          </div>
          <div className="mt-4 space-y-3">
            {plan.matchedRules.map((rule) => (
              <a key={rule.slug} href={`/rules/${rule.slug}/`} className="block rounded-2xl bg-white p-4 ring-1 ring-slate-200 hover:bg-brand-50">
                <p className="text-xs font-black uppercase tracking-wide text-brand-600">{rule.category}</p>
                <p className="font-black text-slate-950">{rule.item}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-6 w-6 text-brand-600" />
          <h2 className="text-2xl font-black text-slate-950">Travel preparation timeline</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {plan.timeline.map((stage) => (
            <div key={stage.when} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="font-black text-slate-950">{stage.when}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-600">
                {stage.tasks.map((task) => <li key={task}>{task}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
        <h2 className="text-2xl font-black text-slate-950">Next actions</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {plan.actions.map((action) => (
            <a key={action.href + action.title} href={action.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
              <p className="text-xs font-black uppercase tracking-wide text-brand-600">{action.label}</p>
              <p className="mt-1 font-black text-slate-950">{action.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{action.description}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">Open <ArrowRight className="h-4 w-4" /></span>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}
