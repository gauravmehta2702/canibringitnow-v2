import { ExternalLink, ShieldCheck } from 'lucide-react';

type RuleSource = {
  label?: string;
  title?: string;
  description?: string;
  type?: string;
  url?: string;
};

export default function OfficialSources({ sources }: { sources: RuleSource[] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-brand-600" />
        <h2 className="text-2xl font-black text-slate-950">Official sources to check</h2>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {sources.map((source) => {
          const title = source.title || source.label || 'Official guidance';
          return (
            <div key={`${title}-${source.url || source.type || 'source'}`} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="font-bold text-slate-950">{title}</p>
              {source.description && <p className="mt-2 text-sm leading-6 text-slate-600">{source.description}</p>}
              {source.type && <p className="mt-1 text-sm text-slate-500">{source.type}</p>}
              {source.url ? (
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-600">
                  Open source <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <p className="mt-3 text-sm text-slate-500">Verify the latest official guidance before travelling.</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
