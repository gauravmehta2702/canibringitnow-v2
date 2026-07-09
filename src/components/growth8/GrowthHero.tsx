import { TrendingUp } from 'lucide-react';

export default function GrowthHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
          <TrendingUp className="h-6 w-6 text-sky-300" />
        </div>
        <div>
          <p className="font-bold text-sky-300">{eyebrow}</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">{title}</h1>
          <p className="mt-4 max-w-3xl leading-8 text-slate-300">{description}</p>
        </div>
      </div>
    </section>
  );
}
