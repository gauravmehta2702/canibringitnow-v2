import { BadgePoundSterling, CheckCircle2, ShieldCheck } from 'lucide-react';
import { getAdSenseReadinessChecklist, getRevenueOpportunities, getRuleRevenueMatches } from '@/lib/v8RevenueIntelligence';

export default function RevenueIntelligenceDashboard() {
  const opportunities = getRevenueOpportunities();
  const checklist = getAdSenseReadinessChecklist();
  const ruleMatches = getRuleRevenueMatches(16);

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <BadgePoundSterling className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">V8 Revenue Intelligence</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              Monetise without damaging trust
            </h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              This dashboard plans AdSense readiness, affiliate opportunities and contextual placements that support the travel decision journey.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">AdSense readiness</p>
            <h2 className="text-2xl font-black text-slate-950">Apply only when the site is polished</h2>
          </div>
        </div>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {checklist.map((item) => (
            <li key={item} className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-700 ring-1 ring-slate-200">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <p className="font-bold text-brand-600">Affiliate opportunities</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Best contextual revenue categories</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {opportunities.map((item) => (
            <a key={item.title} href={item.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
              <p className="text-xs font-black uppercase tracking-wide text-brand-600">{item.intent} intent · {item.category}</p>
              <p className="mt-1 font-black text-slate-950">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.reason}</p>
              <p className="mt-2 text-xs font-bold text-slate-500">Placement: {item.placement}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Rule-page revenue matching</p>
            <h2 className="text-2xl font-black text-slate-950">Where products may fit naturally</h2>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {ruleMatches.map((item) => (
            <a key={item.title} href={item.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
              <p className="text-xs font-black uppercase tracking-wide text-brand-600">{item.intent} intent · {item.category}</p>
              <p className="mt-1 font-black text-slate-950">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.reason}</p>
              <p className="mt-2 text-xs font-bold text-slate-500">Placement: {item.placement}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
