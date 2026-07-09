import { CheckCircle2, Rocket, SearchCheck, ShieldCheck, TrendingUp } from 'lucide-react';
import { getGrowthRelease9Metrics, growthRelease9, growthRelease9Checklist, nextGrowthActions } from '@/lib/growthRelease9';

export default function GrowthRelease9Dashboard() {
  const metrics = getGrowthRelease9Metrics();

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-soft md:p-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-sky-200">
          <Rocket className="h-4 w-4" /> {growthRelease9.name}
        </div>
        <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Production growth release: safer Google indexing and revenue readiness.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{growthRelease9.summary}</p>
        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <p className="text-3xl font-black">{metric.value}</p>
              <p className="mt-2 text-sm font-bold text-white">{metric.label}</p>
              <p className="mt-1 text-xs leading-5 text-slate-300">{metric.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {growthRelease9Checklist.map((item) => (
          <div key={item.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-green-600" />
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-green-700">{item.status}</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">{item.title}</h2>
                <p className="mt-2 leading-7 text-slate-600">{item.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
        <div className="flex items-center gap-3">
          <SearchCheck className="h-7 w-7 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Next actions after deployment</p>
            <h2 className="text-2xl font-black text-slate-950">Google and monetisation checklist</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-3">
          {nextGrowthActions.map((action) => (
            <div key={action} className="rounded-2xl bg-slate-50 p-4 font-semibold leading-7 text-slate-700 ring-1 ring-slate-200">
              {action}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100">
          <ShieldCheck className="h-8 w-8 text-brand-700" />
          <h2 className="mt-4 text-2xl font-black text-slate-950">Trust rule</h2>
          <p className="mt-2 leading-7 text-slate-700">Keep the user answer first, then add related checks, official source reminders, and revenue blocks. This protects user trust while still giving the site early monetisation paths.</p>
        </div>
        <div className="rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-100">
          <TrendingUp className="h-8 w-8 text-amber-700" />
          <h2 className="mt-4 text-2xl font-black text-slate-950">Scaling rule</h2>
          <p className="mt-2 leading-7 text-slate-700">Do not unlock every generated page at once. Expand only after build success, Google discovery, and page-quality checks show the first batch is working.</p>
        </div>
      </section>
    </div>
  );
}
