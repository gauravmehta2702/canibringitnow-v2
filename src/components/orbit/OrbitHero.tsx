import { Globe2, PlaneTakeoff, SearchCheck } from 'lucide-react';

export default function OrbitHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
      <div className="flex items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
          <Globe2 className="h-6 w-6 text-sky-300" />
        </div>
        <div>
          <p className="font-bold text-sky-300">{eyebrow}</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">{title}</h1>
          <p className="mt-4 max-w-3xl leading-8 text-slate-300">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/search/" className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-black text-white hover:bg-brand-700">
              <SearchCheck className="h-5 w-5" /> Search rules
            </a>
            <a href="/trip-planner/" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-black text-white ring-1 ring-white/10 hover:bg-white/15">
              <PlaneTakeoff className="h-5 w-5" /> Plan trip
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
