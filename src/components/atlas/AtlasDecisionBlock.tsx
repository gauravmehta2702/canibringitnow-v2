import { CheckCircle2, ShieldCheck, XCircle, AlertTriangle } from 'lucide-react';
import type { RuleStatus, Rule } from '@/data/rules';
import { atlasStatusLabel, getAtlasFeaturedAnswer } from '@/lib/atlasSeoEngine';

function iconFor(status: RuleStatus) {
  if (status === 'Allowed') return <CheckCircle2 className="h-7 w-7 text-green-700" />;
  if (status === 'Not allowed') return <XCircle className="h-7 w-7 text-red-700" />;
  return <AlertTriangle className="h-7 w-7 text-amber-700" />;
}

function classFor(status: RuleStatus) {
  if (status === 'Allowed') return 'bg-green-50 text-green-950 ring-green-100';
  if (status === 'Not allowed') return 'bg-red-50 text-red-950 ring-red-100';
  return 'bg-amber-50 text-amber-950 ring-amber-100';
}

export default function AtlasDecisionBlock({ rule }: { rule: Rule }) {
  const featured = getAtlasFeaturedAnswer(rule);

  return (
    <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">Fast answer</p>
          <h2 className="text-2xl font-black text-slate-950">{featured.title}</h2>
        </div>
      </div>

      <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">{featured.answer}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className={`rounded-3xl p-5 ring-1 ${classFor(rule.cabin)}`}>
          <div className="flex items-center gap-4">
            {iconFor(rule.cabin)}
            <div>
              <p className="text-xs font-black uppercase tracking-wide opacity-70">Cabin baggage</p>
              <p className="text-2xl font-black">{atlasStatusLabel(rule.cabin)}</p>
            </div>
          </div>
        </div>

        <div className={`rounded-3xl p-5 ring-1 ${classFor(rule.checked)}`}>
          <div className="flex items-center gap-4">
            {iconFor(rule.checked)}
            <div>
              <p className="text-xs font-black uppercase tracking-wide opacity-70">Checked baggage</p>
              <p className="text-2xl font-black">{atlasStatusLabel(rule.checked)}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600 ring-1 ring-slate-200">
        <strong>Snippet-ready summary:</strong> {featured.snippet}
      </p>
    </section>
  );
}
