import { Brain, SearchCheck } from 'lucide-react';
import { analyseAtlasSearch, getAtlasSearchClusters } from '@/lib/atlasSearchEngine';

export default function AtlasSearchIntentPanel({ query }: { query: string }) {
  const intent = analyseAtlasSearch(query);
  const clusters = getAtlasSearchClusters(query);

  if (!query.trim()) return null;

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <Brain className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">ATLAS semantic search</p>
          <h2 className="text-2xl font-black text-slate-950">Search intent understood</h2>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <p className="text-xs font-black uppercase tracking-wide text-brand-600">Airlines</p>
          <p className="mt-2 font-bold text-slate-700">{intent.detectedAirlines.join(', ') || 'None detected'}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <p className="text-xs font-black uppercase tracking-wide text-brand-600">Countries</p>
          <p className="mt-2 font-bold text-slate-700">{intent.detectedCountries.join(', ') || 'None detected'}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <p className="text-xs font-black uppercase tracking-wide text-brand-600">Intent</p>
          <p className="mt-2 font-bold text-slate-700">{intent.detectedIntent.join(', ') || 'General travel rule'}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <p className="text-xs font-black uppercase tracking-wide text-brand-600">Expanded terms</p>
          <p className="mt-2 font-bold text-slate-700">{intent.expandedTerms.slice(0, 7).join(', ')}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center gap-2">
          <SearchCheck className="h-5 w-5 text-brand-600" />
          <p className="font-black text-slate-950">Try related searches</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {clusters.map((cluster) => (
            <a key={cluster.title} href={cluster.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
              <p className="text-xs font-black uppercase tracking-wide text-brand-600">{cluster.label}</p>
              <p className="mt-1 font-black text-slate-950">{cluster.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{cluster.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
