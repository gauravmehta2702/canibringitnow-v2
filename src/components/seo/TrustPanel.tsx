import { Calendar, ShieldCheck } from 'lucide-react';

export default function TrustPanel({ updated, sourceNote }: { updated: string; sourceNote: string }) {
  return (
    <section className="mt-8 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200" aria-labelledby="trust-heading">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-brand-600" aria-hidden="true" />
        <div>
          <h2 id="trust-heading" className="text-xl font-bold text-slate-950">How we keep this guidance useful</h2>
          <p className="mt-2 leading-7 text-slate-600">
            We simplify public travel guidance into a quick decision page. Rules can change by airline, airport and destination, so always confirm critical items with official sources before flying.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-slate-200">
              <Calendar className="h-4 w-4 text-brand-600" aria-hidden="true" /> Last updated: {updated}
            </span>
            <span className="rounded-full bg-white px-4 py-2 ring-1 ring-slate-200">Review before travel</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-500">{sourceNote}</p>
        </div>
      </div>
    </section>
  );
}
