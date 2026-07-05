import { CheckCircle2, ClipboardCheck, Rocket, ShieldCheck } from 'lucide-react';
import ProductionLinkGrid from '@/components/production/ProductionLinkGrid';
import {
  getConsolidationTargets,
  getLaunchChecklist,
  getNextRevenueActions,
  getProductionHealth,
  getSeoValidationLinks,
} from '@/lib/v2ProductionEngine';

export default function ProductionDashboard() {
  const health = getProductionHealth();
  const checklist = getLaunchChecklist();
  const revenue = getNextRevenueActions();
  const validation = getSeoValidationLinks(24);
  const consolidation = getConsolidationTargets();

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <Rocket className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">Production Pack</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              Launch readiness dashboard
            </h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              This combines launch checks, SEO validation, revenue next steps and cleanup targets so the site can move from feature-building to performance testing.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {health.map((item) => (
            <div key={item.label} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <CheckCircle2 className="h-6 w-6 text-green-300" />
              <p className="mt-3 text-3xl font-black">{item.value}</p>
              <p className="text-sm text-slate-300">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Launch checklist</p>
            <h2 className="text-2xl font-black text-slate-950">Do this before watching traffic</h2>
          </div>
        </div>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {checklist.map((item) => (
            <li key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700 ring-1 ring-slate-200">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <ProductionLinkGrid title="SEO validation links" eyebrow="Quality assurance" links={validation} />
      <ProductionLinkGrid title="Revenue actions after launch" eyebrow="Monetisation" links={revenue} />

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Code consolidation</p>
            <h2 className="text-2xl font-black text-slate-950">Clean-up targets before scaling further</h2>
          </div>
        </div>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {consolidation.map((item) => (
            <li key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-700 ring-1 ring-slate-200">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
