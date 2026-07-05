import { Plane, Search, Sparkles } from 'lucide-react';
import PublicToolGrid from '@/components/public-tools/PublicToolGrid';
import {
  getBeforeYouFlySearches,
  getFlightDashboardPlaceholderCards,
  getPopularTripCombos,
  getPublicTravelTools,
} from '@/lib/publicGrowthTools';

export default function BeforeYouFlyDashboard() {
  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <Plane className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">Before You Fly</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              Your pre-travel command centre
            </h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              Start with travel rules, then use the assistant, packing planner, airline hubs and destination hubs to prepare faster.
            </p>
            <a
              href="/search/"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-black text-white hover:bg-brand-700"
            >
              <Search className="h-5 w-5" />
              Search a travel item
            </a>
          </div>
        </div>
      </section>

      <PublicToolGrid title="Main travel tools" eyebrow="Public growth tools" cards={getPublicTravelTools()} />
      <PublicToolGrid title="Start with common travel checks" eyebrow="High-intent rules" cards={getBeforeYouFlySearches()} />
      <PublicToolGrid title="Popular trip combinations" eyebrow="SEO discovery" cards={getPopularTripCombos(24)} />

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Future flight dashboard</p>
            <h2 className="text-2xl font-black text-slate-950">Flight status can be added later here</h2>
          </div>
        </div>
        <p className="mt-3 leading-7 text-slate-600">
          This page is designed so a future flight status checker can be added without changing the product direction.
          Flight status should support the travel-rule journey, not replace it.
        </p>
      </section>

      <PublicToolGrid title="Future flight dashboard modules" eyebrow="Planned upgrade" cards={getFlightDashboardPlaceholderCards()} />
    </div>
  );
}
