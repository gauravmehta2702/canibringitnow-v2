'use client';

import { ArrowRight, MapPin, Plane, Route, SearchCheck } from 'lucide-react';
import { resolveJourneyIntent } from '@/lib/journeyIntent';

export default function JourneyIntentPanel({ query }: { query: string }) {
  if (!query.trim()) return null;
  const intent = resolveJourneyIntent(query);
  if (!intent.links.length) return null;

  return (
    <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
      <div className="flex items-center gap-2 text-sky-300"><SearchCheck className="h-5 w-5" /><p className="font-bold">Connected journey results</p></div>
      <h2 className="mt-2 text-2xl font-black">Continue beyond the baggage answer</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">We connected your search to relevant airline, airport, destination, item and travel-service pages.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {intent.links.map((link) => (
          <a key={`${link.type}-${link.href}`} href={link.href} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 transition hover:bg-white/15">
            <p className="text-xs font-black uppercase tracking-wide text-sky-300">{link.type}</p>
            <h3 className="mt-1 font-bold">{link.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{link.description}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white">Open <ArrowRight className="h-4 w-4" /></span>
          </a>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-300">
        {intent.airline && <span className="inline-flex items-center gap-1"><Plane className="h-3 w-3" />{intent.airline}</span>}
        {intent.airport && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{intent.airport.code}</span>}
        {intent.country && <span className="inline-flex items-center gap-1"><Route className="h-3 w-3" />{intent.country}</span>}
      </div>
    </section>
  );
}
