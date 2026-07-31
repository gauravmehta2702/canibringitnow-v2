import { ArrowRight, TrendingUp } from 'lucide-react';
import { getPriorityRuleLinks } from '@/lib/trafficAccelerationEngine';

export default function SearchDemandLinks({ limit = 8 }: { limit?: number }) {
  const links = getPriorityRuleLinks(limit);
  if (!links.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
      <div className="rounded-[2rem] bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-9">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-2 font-black text-brand-600"><TrendingUp className="h-5 w-5" /> Travellers are searching</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">High-demand questions already appearing in Google</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">These practical travel questions are receiving search visibility. Direct links help travellers reach the strongest answer and strengthen the site’s most promising topic clusters.</p>
          </div>
          <a href="/search/" className="inline-flex items-center gap-2 font-black text-brand-700">Search all travel guidance <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:bg-brand-50 hover:ring-brand-100">
              <p className="text-xs font-black uppercase tracking-wide text-brand-600">{link.category}</p>
              <h3 className="mt-2 text-lg font-black text-slate-950">{link.label}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Cabin, checked-baggage and practical travel guidance.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-700">Read the answer <ArrowRight className="h-4 w-4" /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
