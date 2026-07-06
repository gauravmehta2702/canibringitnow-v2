import { Hotel } from 'lucide-react';
import { getTop5Guide } from '@/lib/v3Top5GuideEngine';

export default function Top5GuideTemplate({ destination = 'Tokyo', guideType = 'affordable hotels' }: { destination?: string; guideType?: string }) {
  const guide = getTop5Guide(destination, guideType);

  return (
    <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
      <div className="flex items-center gap-3">
        <Hotel className="h-8 w-8 text-brand-600" />
        <p className="font-bold text-brand-600">Top 5 guide template</p>
      </div>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{guide.title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{guide.description}</p>
      <div className="mt-8 grid gap-4">
        {guide.items.map((item) => (
          <article key={item.rank} className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <p className="text-sm font-black uppercase tracking-wide text-brand-600">#{item.rank} · {item.bestFor}</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">{item.name}</h2>
            <p className="mt-3 leading-7 text-slate-600">{item.why}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900 ring-1 ring-amber-100">
        Note: This is a template system. Before publishing real hotel recommendations, replace placeholders with researched hotels, current prices, neighbourhood context and affiliate disclosures.
      </p>
    </section>
  );
}
