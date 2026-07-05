import { ArrowRight, TrendingUp } from 'lucide-react';
import { getHighValueActions } from '@/lib/growthMonetisation';

export default function GrowthActionBlock({ slug }: { slug?: string }) {
  const actions = getHighValueActions(slug);
  return (
    <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-white shadow-soft">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-6 w-6 text-sky-300" />
        <div>
          <p className="font-bold text-sky-300">Growth navigation</p>
          <h2 className="text-2xl font-black">Continue your travel checks</h2>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {actions.map((action) => (
          <a key={action.href} href={action.href} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 hover:bg-white/15">
            <p className="font-black">{action.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{action.description}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-sky-300">Open <ArrowRight className="h-4 w-4" /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
