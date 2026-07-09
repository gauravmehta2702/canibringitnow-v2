import { getRevenueScores } from '@/lib/growth8Engine';

export default function RevenueScoreGrid() {
  const scores = getRevenueScores();
  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <p className="font-bold text-brand-600">Revenue readiness</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">Score before monetisation</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {scores.map((item) => (
          <article key={item.title} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="font-black text-slate-950">{item.title}</p>
            <p className="mt-2 text-4xl font-black text-brand-600">{item.score}/100</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
