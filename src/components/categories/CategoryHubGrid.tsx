import { ArrowRight, Boxes } from 'lucide-react';
import { getTopCategoryHubs } from '@/lib/categoryEcosystem';

export default function CategoryHubGrid() {
  const hubs = getTopCategoryHubs(18);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <Boxes className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">G8 Category ecosystem</p>
          <h2 className="text-2xl font-black text-slate-950">Popular item category hubs</h2>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {hubs.map((hub) => (
          <a key={hub.slug} href={`/categories/${hub.slug}/`} className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-brand-50 hover:ring-brand-200">
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">Category guide</p>
            <p className="mt-1 font-black text-slate-950">{hub.name}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{hub.rules.length} travel checks available</p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">Open category <ArrowRight className="h-4 w-4" /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
