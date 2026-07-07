import { BadgePoundSterling, CheckCircle2, Rocket, ShieldCheck } from 'lucide-react';
import LaunchCardGrid from '@/components/launch/LaunchCardGrid';
import { getAdSenseDoNotDoList, getLaunchMetrics, getLaunchReadinessChecks, getThirtyDayLaunchPlan } from '@/lib/v9LaunchReadiness';

export default function LaunchReadinessDashboard() {
  const metrics = getLaunchMetrics();
  const checks = getLaunchReadinessChecks();
  const plan = getThirtyDayLaunchPlan();
  const avoid = getAdSenseDoNotDoList();

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <Rocket className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">V9 Launch Readiness</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">Prepare the site for traffic and AdSense</h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              This dashboard focuses the next 30 days on quality, indexing, trust, light marketing and safe monetisation.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <CheckCircle2 className="h-6 w-6 text-green-300" />
              <p className="mt-3 text-3xl font-black">{metric.value}</p>
              <p className="text-sm text-slate-300">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <LaunchCardGrid title="Launch readiness checks" eyebrow="Quality control" cards={checks} />
      <LaunchCardGrid title="30-day launch plan" eyebrow="Plan of action" cards={plan} />

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <BadgePoundSterling className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">AdSense safety</p>
            <h2 className="text-2xl font-black text-slate-950">Do not rush monetisation</h2>
          </div>
        </div>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {avoid.map((item) => (
            <li key={item} className="rounded-2xl bg-slate-50 p-4 font-bold leading-6 text-slate-700 ring-1 ring-slate-200">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Recommendation</p>
            <h2 className="text-2xl font-black text-slate-950">Apply for AdSense after quality and indexing checks</h2>
          </div>
        </div>
        <p className="mt-4 leading-7 text-slate-600">
          The best route is to launch the useful product first, connect Search Console, check indexing, improve core pages, then apply for AdSense once the site looks polished and trustworthy.
        </p>
      </section>
    </div>
  );
}
