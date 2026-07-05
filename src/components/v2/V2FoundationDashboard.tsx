import { Brain, Database, Network, Rocket } from 'lucide-react';
import V2NodeGrid from '@/components/v2/V2NodeGrid';
import { getV2KnowledgeGraph, getV2ProgrammaticSeeds, getV2RoadmapCards } from '@/lib/v2Core';

export default function V2FoundationDashboard() {
  const graph = getV2KnowledgeGraph(48);
  const seeds = getV2ProgrammaticSeeds(36);
  const roadmap = getV2RoadmapCards();

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <Rocket className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">Version 2 foundation</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">
              Scalable travel knowledge platform
            </h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              This foundation prepares the site for AI answers, large-scale SEO pages, richer airline/country hubs and monetisation without rebuilding the project later.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
            <Database className="h-6 w-6 text-sky-300" />
            <p className="mt-3 text-3xl font-black">{graph.length}+</p>
            <p className="text-sm text-slate-300">Knowledge nodes</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
            <Network className="h-6 w-6 text-sky-300" />
            <p className="mt-3 text-3xl font-black">{seeds.length}+</p>
            <p className="text-sm text-slate-300">SEO seed pages</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
            <Brain className="h-6 w-6 text-sky-300" />
            <p className="mt-3 text-3xl font-black">AI</p>
            <p className="text-sm text-slate-300">Ready structure</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
            <Rocket className="h-6 w-6 text-sky-300" />
            <p className="mt-3 text-3xl font-black">V2</p>
            <p className="text-sm text-slate-300">Platform phase</p>
          </div>
        </div>
      </section>

      <V2NodeGrid title="V2 systems to build next" eyebrow="Platform roadmap" nodes={roadmap} />
      <V2NodeGrid title="Unified knowledge graph" eyebrow="Structured data layer" nodes={graph} />
      <V2NodeGrid title="Programmatic SEO seeds" eyebrow="Large-scale traffic engine" nodes={seeds} />
    </div>
  );
}
