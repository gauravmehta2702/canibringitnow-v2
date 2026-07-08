'use client';
import { useMemo, useState } from 'react';
import { getDefaultChecklist } from '@/lib/orbit5Tools';
export default function TravelChecklistBuilder() {
  const [destination, setDestination] = useState('Japan'), [airline, setAirline] = useState('Emirates'), [travellerType, setTravellerType] = useState('2 adults and 1 baby'), [items, setItems] = useState('power bank, medication, baby formula');
  const checklist = useMemo(() => getDefaultChecklist(travellerType, destination, airline, items), [travellerType, destination, airline, items]);
  const fields = [['Destination', destination, setDestination], ['Airline', airline, setAirline], ['Travellers', travellerType, setTravellerType], ['Special items', items, setItems]] as const;
  return <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200"><h2 className="text-2xl font-black text-slate-950">Travel checklist builder</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{fields.map(([label, value, setter]) => <label key={label}><span className="text-sm font-bold text-slate-600">{label}</span><input value={value} onChange={(e) => setter(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold outline-none focus:border-brand-500" /></label>)}</div><div className="mt-6 grid gap-3 md:grid-cols-2">{checklist.map((item) => <div key={item} className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-700 ring-1 ring-slate-200">☐ {item}</div>)}</div></section>;
}
