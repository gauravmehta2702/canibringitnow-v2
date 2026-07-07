import { ArrowRight, CalendarDays } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getAtlasTravelTimeline } from '@/lib/atlasSeoEngine';

export default function AtlasTravelTimeline({ rule }: { rule: Rule }) {
  const timeline = getAtlasTravelTimeline(rule);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <CalendarDays className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">Travel journey</p>
          <h2 className="text-2xl font-black text-slate-950">When to think about this item</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {timeline.map((stage, index) => (
          <article key={stage.title} className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{stage.label}</p>
            <h3 className="mt-2 font-black text-slate-950">{stage.title}</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
              {stage.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            {index < timeline.length - 1 && (
              <ArrowRight className="mt-4 hidden h-5 w-5 text-slate-300 md:block" />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
