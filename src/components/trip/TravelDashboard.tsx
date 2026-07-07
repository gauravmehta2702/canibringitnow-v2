import { ArrowRight, PlaneTakeoff, Sparkles } from 'lucide-react';
import { getTravelDashboardModules } from '@/lib/v4TripPlatform';

export default function TravelDashboard() {
  const modules = getTravelDashboardModules();

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <PlaneTakeoff className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">V5 Travel Dashboard</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              One place before every trip
            </h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              This combines trip planning, travel rules, AI guidance, packing and future flight status into one public dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <p className="font-bold text-brand-600">Dashboard modules</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Use the right tool for your trip</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {modules.map((module) => (
            <a key={module.href + module.title} href={module.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
              <p className="text-xs font-black uppercase tracking-wide text-brand-600">{module.label}</p>
              <p className="mt-1 font-black text-slate-950">{module.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">Open <ArrowRight className="h-4 w-4" /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Flight status strategy</p>
            <h2 className="text-2xl font-black text-slate-950">Flight status will be added as a support feature later</h2>
          </div>
        </div>
        <p className="mt-4 leading-7 text-slate-600">
          The dashboard is now ready for a future flight status module, but the main product remains travel preparation: rules, packing, destination guidance and useful next actions.
        </p>
      </section>
    </div>
  );
}
