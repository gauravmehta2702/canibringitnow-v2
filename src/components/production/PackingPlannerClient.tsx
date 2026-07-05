'use client';

import { useMemo, useState } from 'react';
import { Luggage } from 'lucide-react';
import { generatePackingPlan } from '@/lib/v2PackingPlanner';

export default function PackingPlannerClient() {
  const [destination, setDestination] = useState('Japan');
  const [airline, setAirline] = useState('Emirates');
  const [days, setDays] = useState(7);
  const [withBaby, setWithBaby] = useState(false);
  const [withMedication, setWithMedication] = useState(true);
  const [withElectronics, setWithElectronics] = useState(true);

  const plan = useMemo(
    () => generatePackingPlan({ destination, airline, days, withBaby, withMedication, withElectronics }),
    [destination, airline, days, withBaby, withMedication, withElectronics],
  );

  return (
    <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
      <div className="flex items-center gap-3">
        <Luggage className="h-8 w-8 text-brand-600" />
        <p className="font-bold text-brand-600">V2 Packing Planner</p>
      </div>

      <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Smart packing checklist</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
        Generate a simple checklist based on destination, airline and travel needs.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <input value={destination} onChange={(e) => setDestination(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold outline-none focus:border-brand-500" placeholder="Destination" />
        <input value={airline} onChange={(e) => setAirline(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold outline-none focus:border-brand-500" placeholder="Airline" />
        <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold outline-none focus:border-brand-500" placeholder="Days" />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <label className="rounded-full bg-slate-50 px-4 py-2 text-sm font-bold ring-1 ring-slate-200">
          <input type="checkbox" checked={withElectronics} onChange={(e) => setWithElectronics(e.target.checked)} className="mr-2" />
          Electronics
        </label>
        <label className="rounded-full bg-slate-50 px-4 py-2 text-sm font-bold ring-1 ring-slate-200">
          <input type="checkbox" checked={withMedication} onChange={(e) => setWithMedication(e.target.checked)} className="mr-2" />
          Medication
        </label>
        <label className="rounded-full bg-slate-50 px-4 py-2 text-sm font-bold ring-1 ring-slate-200">
          <input type="checkbox" checked={withBaby} onChange={(e) => setWithBaby(e.target.checked)} className="mr-2" />
          Baby travel
        </label>
      </div>

      <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
        <h2 className="text-3xl font-black">{plan.title}</h2>
        <p className="mt-3 text-slate-300">{plan.summary}</p>
      </section>

      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {plan.items.map((item) => (
          <li key={item} className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-700 ring-1 ring-slate-200">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
