import { ArrowRight, GitBranch, Network, ShieldAlert } from 'lucide-react';
import {
  getGraphEntityLinksForRule,
  getGraphRecommendationsForRule,
  getRuleGraphContext,
} from '@/lib/travelIntelligenceGraph';

export default function TravelGraphConnections({ slug }: { slug: string }) {
  const context = getRuleGraphContext(slug);
  if (!context) return null;

  const entityLinks = getGraphEntityLinksForRule(slug);
  const recommendations = getGraphRecommendationsForRule(slug, 6);
  const connectedEntities = entityLinks.length + recommendations.length;

  return (
    <section className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-sky-200">
            <Network className="h-4 w-4" /> Travel Intelligence Graph
          </div>
          <h2 className="mt-4 text-3xl font-black">How this rule connects to your journey</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            This page is connected to real item, category, airline and destination entities. The links below are selected from those relationships rather than from rewritten keyword templates.
          </p>
        </div>
        <div className="rounded-2xl bg-white/10 px-5 py-4 text-center ring-1 ring-white/10">
          <p className="text-3xl font-black">{connectedEntities}</p>
          <p className="text-xs font-black uppercase tracking-wide text-slate-300">Useful connections</p>
        </div>
      </div>

      {entityLinks.length > 0 && (
        <div className="mt-7">
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-sky-300" />
            <h3 className="text-xl font-black">Core journey entities</h3>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {entityLinks.map((link) => (
              <a key={link.href} href={link.href} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 transition hover:bg-white/15">
                <p className="text-xs font-black uppercase tracking-wide text-sky-300">{link.eyebrow}</p>
                <p className="mt-2 font-black">{link.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-black">Graph-ranked next checks</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((link) => (
              <a key={link.href} href={link.href} className="group rounded-2xl bg-white p-5 text-slate-950 transition hover:-translate-y-0.5 hover:shadow-xl">
                <p className="text-xs font-black uppercase tracking-wide text-brand-600">{link.eyebrow}</p>
                <h4 className="mt-2 text-lg font-black">{link.title}</h4>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{link.description}</p>
                <p className="mt-3 text-xs font-bold text-slate-500">Why linked: {link.reasons.slice(0, 2).join(' • ')}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-600">
                  Open connected rule <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {context.missingSourceTypes.length > 0 && (
        <div className="mt-7 flex items-start gap-3 rounded-2xl bg-amber-400/10 p-4 text-amber-100 ring-1 ring-amber-300/20">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm leading-6">
            Source-quality safeguard: this rule still needs {context.missingSourceTypes.join(', ')} verification. The site keeps that gap visible instead of presenting editorial guidance as confirmed official policy.
          </p>
        </div>
      )}
    </section>
  );
}
