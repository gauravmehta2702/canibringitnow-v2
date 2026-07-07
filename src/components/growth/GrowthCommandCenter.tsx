import { ArrowRight, Rocket } from 'lucide-react';

const modules = [
  { title: 'AI Content Factory', href: '/ai-content-factory/', label: 'V7', description: 'Weekly SEO, video, Pinterest and social content ideas.' },
  { title: 'Revenue Intelligence', href: '/revenue-intelligence/', label: 'V8', description: 'Affiliate opportunities, AdSense readiness and revenue placements.' },
  { title: 'Trip Planner', href: '/trip-planner/', label: 'Product', description: 'Interactive travel preparation planner.' },
  { title: 'Destination Guides', href: '/destination-guides/', label: 'Content', description: 'Top 5 hotel, restaurant and attraction guide ideas.' },
  { title: 'Travel Intelligence', href: '/travel-intelligence/', label: 'Engine', description: 'Connected answers for travel questions.' },
  { title: 'SEO Scale', href: '/seo-scale/', label: 'SEO', description: 'Programmatic SEO expansion and refresh planning.' },
];

export default function GrowthCommandCenter() {
  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <Rocket className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">Growth Command Center</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              Build traffic, revenue and product value together
            </h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              This connects the major growth tools so you can run the project with a few focused weekly actions instead of daily manual work.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <p className="font-bold text-brand-600">Control panel</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Main growth modules</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {modules.map((module) => (
            <a key={module.href} href={module.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
              <p className="text-xs font-black uppercase tracking-wide text-brand-600">{module.label}</p>
              <p className="mt-1 font-black text-slate-950">{module.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">Open <ArrowRight className="h-4 w-4" /></span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
