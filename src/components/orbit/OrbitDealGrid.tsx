import type { OrbitDeal } from '@/lib/orbitEngine';

export default function OrbitDealGrid({ deals }: { deals: OrbitDeal[] }) {
  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <p className="font-bold text-brand-600">Travel deals intelligence</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">Contextual offers to research</h2>
      <p className="mt-3 max-w-3xl leading-7 text-slate-600">
        These are editorial deal-page ideas first. Add affiliate links later only where they genuinely help travellers.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {deals.map((deal) => (
          <a key={deal.title} href={deal.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{deal.intent} intent · {deal.label}</p>
            <p className="mt-1 font-black text-slate-950">{deal.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{deal.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
