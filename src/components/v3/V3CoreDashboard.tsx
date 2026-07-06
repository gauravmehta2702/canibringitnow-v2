import { Database, Globe2, Hotel, Rocket } from 'lucide-react';
import V3CardGrid from '@/components/v3/V3CardGrid';
import { getTop5GuideIdeas, getV3CoreRoutes, getV3DestinationSeeds, getV3NextBuildQueue, getV3PlatformStats, getV3RuleExpansionSeeds } from '@/lib/v3CorePlatform';

export default function V3CoreDashboard() {
  const stats = getV3PlatformStats();

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <Rocket className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">V3 Core Platform</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">Travel Rule Search Engine architecture</h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">This brings rules, airlines, countries, destination intelligence, Top 5 guide ideas, packing tools and future flight dashboard planning into one platform direction.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <Database className="h-6 w-6 text-sky-300" />
              <p className="mt-3 text-3xl font-black">{stat.value}</p>
              <p className="text-sm text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <V3CardGrid title="Core public platform routes" eyebrow="Unified product structure" cards={getV3CoreRoutes()} />
      <V3CardGrid title="Top 5 destination guide template examples" eyebrow="Hotels, restaurants and attractions" cards={getTop5GuideIdeas('Tokyo')} />
      <V3CardGrid title="Destination content seeds" eyebrow="Destination intelligence expansion" cards={getV3DestinationSeeds(24)} />
      <V3CardGrid title="Travel rule expansion seeds" eyebrow="High-intent SEO expansion" cards={getV3RuleExpansionSeeds(24)} />
      <V3CardGrid title="Next build queue" eyebrow="Implementation priorities" cards={getV3NextBuildQueue()} />

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <Hotel className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Hotel strategy</p>
            <h2 className="text-2xl font-black text-slate-950">Add hotels as editorial Top 5 guides, not as a booking engine</h2>
          </div>
        </div>
        <p className="mt-4 leading-7 text-slate-600">The right model is destination content such as Top 5 affordable hotels, Top 5 family hotels, Top 5 airport hotels and Top 5 areas to stay. This supports the travel preparation journey and can later connect to affiliate partners.</p>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <Globe2 className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Brand positioning</p>
            <h2 className="text-2xl font-black text-slate-950">Search travel rules for any item, airline or country</h2>
          </div>
        </div>
        <p className="mt-4 leading-7 text-slate-600">Tagline: Know before you go. The site should stay focused on travel decisions first, then expand into trip preparation and destination intelligence.</p>
      </section>
    </div>
  );
}
