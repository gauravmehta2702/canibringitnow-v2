import { Rocket, SearchCheck } from 'lucide-react';
import { getAtlasAuditSummary } from '@/lib/atlasSeoEngine';

const nextSteps = [
  'Use ATLAS decision blocks on high-value rule pages.',
  'Keep concise answers near the top for featured snippets.',
  'Strengthen internal links from rules to airlines, countries and trip tools.',
  'Use official-source reminders on any page involving customs, medication or batteries.',
  'Monitor Search Console after deployment and improve pages with impressions but low CTR.',
  'Avoid thin programmatic pages until the core rule pages are strong.',
];

export default function AtlasAuditDashboard() {
  const metrics = getAtlasAuditSummary();

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <Rocket className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">Project ATLAS · Package 1A</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">SEO and knowledge engine</h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              This package improves rule pages with snippet-ready answers, schema, authority scoring, travel timelines and automatic internal linking.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <SearchCheck className="h-6 w-6 text-sky-300" />
              <p className="mt-3 text-3xl font-black">{metric.value}</p>
              <p className="text-sm text-slate-300">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <p className="font-bold text-brand-600">Next SEO actions</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">What this unlocks</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {nextSteps.map((step) => (
            <li key={step} className="rounded-2xl bg-slate-50 p-4 font-bold leading-6 text-slate-700 ring-1 ring-slate-200">
              {step}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
