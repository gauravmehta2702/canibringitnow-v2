import { Megaphone } from 'lucide-react';
import { getWeeklyMarketingSeeds } from '@/lib/aiMarketingSeeds';

export default function AIMarketingSeedsBlock() {
  const seeds = getWeeklyMarketingSeeds(24);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <Megaphone className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">AI Marketing Seeds</p>
          <h2 className="text-2xl font-black text-slate-950">Weekly content ideas</h2>
        </div>
      </div>
      <p className="mt-3 leading-7 text-slate-600">Use these as reviewable ideas. Do not mass-publish without checking quality and accuracy.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {seeds.map((seed) => (
          <div key={`${seed.type}-${seed.title}`} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{seed.type}</p>
            <p className="mt-1 font-black text-slate-950">{seed.title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{seed.prompt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
