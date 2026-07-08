'use client';
import { useMemo, useState } from 'react';
export default function CabinBagSizeChecker() {
  const [height, setHeight] = useState(55), [width, setWidth] = useState(40), [depth, setDepth] = useState(20);
  const result = useMemo(() => ({ total: height + width + depth, likely: height <= 56 && width <= 45 && depth <= 25 }), [height, width, depth]);
  const fields = [['Height cm', height, setHeight], ['Width cm', width, setWidth], ['Depth cm', depth, setDepth]] as const;
  return <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200"><h2 className="text-2xl font-black text-slate-950">Cabin bag size checker</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{fields.map(([label, value, setter]) => <label key={label}><span className="text-sm font-bold text-slate-600">{label}</span><input type="number" min="0" value={value} onChange={(e) => setter(Number(e.target.value))} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-bold outline-none focus:border-brand-500" /></label>)}</div><div className={`mt-6 rounded-3xl p-5 ring-1 ${result.likely ? 'bg-green-50 text-green-950 ring-green-100' : 'bg-amber-50 text-amber-950 ring-amber-100'}`}><p className="text-sm font-black uppercase tracking-wide">Quick estimate</p><p className="mt-2 text-3xl font-black">{result.likely ? 'Looks cabin-friendly' : 'Check airline carefully'}</p><p className="mt-2 leading-7">Total dimensions: {result.total}cm. Airline limits vary by fare and route.</p></div></section>;
}
