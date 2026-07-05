import { ArrowRight, BarChart3, BadgePoundSterling, TrendingUp } from 'lucide-react';
import { getAnalyticsEvents, getGrowthActions, getGrowthProducts, getProgrammaticSeoLinks, getTrendingSearches } from '@/lib/g10CompleteEngine';

function LinkGrid({ title, eyebrow, links }: { title: string; eyebrow: string; links: { title: string; href: string; label: string; description?: string }[] }) {
  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <p className="font-bold text-brand-600">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {links.map((link) => (
          <a key={link.href + link.title} href={link.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{link.label}</p>
            <p className="mt-1 font-black text-slate-950">{link.title}</p>
            {link.description && <p className="mt-2 text-sm leading-6 text-slate-600">{link.description}</p>}
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">Open <ArrowRight className="h-4 w-4" /></span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function G10CompleteBlock({ ruleSlug, category }: { ruleSlug?: string; category?: string }) {
  const products = getGrowthProducts(category);
  const actions = getGrowthActions(ruleSlug);
  const trending = getTrendingSearches();
  const seoLinks = getProgrammaticSeoLinks(18);
  const events = getAnalyticsEvents();

  return (
    <div className="mt-8">
      <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-soft">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-7 w-7 text-sky-300" />
          <div>
            <p className="font-bold text-sky-300">G10 Complete growth engine</p>
            <h2 className="text-3xl font-black">Traffic, revenue and analytics system</h2>
          </div>
        </div>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">This section connects monetisation, trending searches, programmatic SEO links and analytics planning in one growth layer.</p>
      </section>

      <LinkGrid title="Relevant product opportunities" eyebrow="Revenue engine" links={products} />
      <LinkGrid title="High-value user actions" eyebrow="Growth navigation" links={actions} />
      <LinkGrid title="Trending searches to push visitors deeper" eyebrow="Traffic engine" links={trending} />
      <LinkGrid title="Programmatic SEO opportunities" eyebrow="SEO automation" links={seoLinks} />

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Analytics plan</p>
            <h2 className="text-2xl font-black text-slate-950">Events to track next</h2>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {events.map((event) => (
            <div key={event.name} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="font-black text-slate-950">{event.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{event.purpose}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 ring-1 ring-slate-200">
          <BadgePoundSterling className="h-4 w-4 text-brand-600" /> Ad-ready placement
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-500">Reserved ad/affiliate block. Add Google AdSense or affiliate links later without redesigning the page.</p>
      </section>
    </div>
  );
}
