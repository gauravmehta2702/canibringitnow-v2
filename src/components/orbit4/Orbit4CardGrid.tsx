import { ArrowRight } from 'lucide-react';
import type { Orbit4Card } from '@/lib/orbit4Engine';

export default function Orbit4CardGrid({ title, eyebrow, cards }: { title: string; eyebrow: string; cards: Orbit4Card[] }) {
  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <p className="font-bold text-brand-600">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {cards.map((card) => (
          <a key={`${card.href}-${card.title}`} href={card.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{card.label}</p>
            <p className="mt-1 font-black text-slate-950">{card.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">Open <ArrowRight className="h-4 w-4" /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
