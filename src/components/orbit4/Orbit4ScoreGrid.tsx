import type { Orbit4Score } from '@/lib/orbit4Engine';

export default function Orbit4ScoreGrid({ scores }: { scores: Orbit4Score[] }) {
  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <p className="font-bold text-brand-600">SEO health</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">Current focus areas</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {scores.map((score) => (
          <article key={score.title} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{score.label}</p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <p className="font-black text-slate-950">{score.title}</p>
              <p className="text-3xl font-black text-slate-950">{score.score}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{score.recommendation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
