import { Gauge, ShieldCheck } from 'lucide-react';
import { getQualityAuditItems } from '@/lib/v10TrustEngine';

export default function QualityAuditDashboard() {
  const items = getQualityAuditItems();

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <Gauge className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">Quality Audit</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">Keep the platform trustworthy</h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              This page helps guide what to improve before aggressive traffic growth, affiliate expansion or AdSense.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Audit areas</p>
            <h2 className="text-2xl font-black text-slate-950">Current quality priorities</h2>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.title} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-xs font-black uppercase tracking-wide text-brand-600">{item.status}</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <h3 className="font-black text-slate-950">{item.title}</h3>
                <p className="text-3xl font-black text-slate-950">{item.score}</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.recommendation}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
