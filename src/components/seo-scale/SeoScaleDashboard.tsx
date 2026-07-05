import { RefreshCcw, Search, TrendingUp } from 'lucide-react';
import SeoScaleGrid from '@/components/seo-scale/SeoScaleGrid';
import {
  getAirlineSeoOpportunities,
  getContentRefreshQueue,
  getCountrySeoOpportunities,
  getSeoScaleStats,
  getSitemapPriorityGroups,
} from '@/lib/v2SeoScaleEngine';

export default function SeoScaleDashboard() {
  const stats = getSeoScaleStats();

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <TrendingUp className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">SEO Scale Pack</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              Programmatic SEO expansion dashboard
            </h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              Use this to identify high-intent airline, country and content refresh opportunities before creating thousands of new pages.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <Search className="h-6 w-6 text-sky-300" />
              <p className="mt-3 text-3xl font-black">{stat.value}</p>
              <p className="text-sm text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <SeoScaleGrid title="Airline SEO opportunities" eyebrow="Programmatic airline pages" links={getAirlineSeoOpportunities(36)} />
      <SeoScaleGrid title="Country SEO opportunities" eyebrow="Programmatic destination pages" links={getCountrySeoOpportunities(36)} />
      <SeoScaleGrid title="Content refresh queue" eyebrow="Maintenance system" links={getContentRefreshQueue(24)} />
      <SeoScaleGrid title="Sitemap priority groups" eyebrow="Indexing strategy" links={getSitemapPriorityGroups()} />

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <RefreshCcw className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Important scaling rule</p>
            <h2 className="text-2xl font-black text-slate-950">Do not create thin pages</h2>
          </div>
        </div>
        <p className="mt-4 leading-7 text-slate-600">
          Scale pages only when each page gives a useful answer, clear next action, source guidance, internal links and a unique search intent. This protects the site from low-quality programmatic SEO.
        </p>
      </section>
    </div>
  );
}
