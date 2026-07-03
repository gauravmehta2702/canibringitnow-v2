import { ExternalLink, ShieldCheck } from 'lucide-react';
import type { RuleSource } from '@/lib/ruleInsights';

export default function OfficialSources({ sources }: { sources: RuleSource[] }) {
  return (
    <section className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-brand-600" />
        <h2 className="text-xl font-bold text-slate-950">Official sources to check</h2>
      </div>
      <p className="mt-3 leading-7 text-slate-600">
        Travel rules can change. Confirm important restrictions with official sources before you fly.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {sources.map((source) => (
          <div key={`${source.type}-${source.label}`} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-600">{source.type}</p>
            <h3 className="mt-1 font-bold text-slate-950">{source.label}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{source.note}</p>
            <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
              Verify before travel <ExternalLink className="h-3 w-3" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
