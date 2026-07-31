import { AlertTriangle, CheckCircle2, ShieldCheck, XCircle } from 'lucide-react';
import type { Rule, RuleStatus } from '@/data/rules';
import { buildRuleSeoProfile } from '@/lib/ruleSeoEngine';

function Icon({ status }: { status: RuleStatus }) {
  if (status === 'Allowed') return <CheckCircle2 className="h-6 w-6 text-green-700" />;
  if (status === 'Not allowed') return <XCircle className="h-6 w-6 text-red-700" />;
  return <AlertTriangle className="h-6 w-6 text-amber-700" />;
}

function tone(status: RuleStatus) {
  if (status === 'Allowed') return 'bg-green-50 text-green-950 ring-green-200';
  if (status === 'Not allowed') return 'bg-red-50 text-red-950 ring-red-200';
  return 'bg-amber-50 text-amber-950 ring-amber-200';
}

export default function AuthorityDecisionCard({ rule }: { rule: Rule }) {
  const profile = buildRuleSeoProfile(rule);
  return (
    <section aria-labelledby="authority-answer" className="mt-7 overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-soft">
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-sky-200">
            <ShieldCheck className="h-4 w-4" /> 30-second verified travel answer
          </p>
          <p className="text-sm font-semibold text-slate-300">{profile.confidenceLabel} · Reviewed {rule.updated}</p>
        </div>
        <h2 id="authority-answer" className="mt-5 text-2xl font-black tracking-tight md:text-4xl">
          {rule.shortAnswer}
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <div className={`rounded-2xl p-5 ring-1 ${tone(rule.cabin)}`}>
            <div className="flex items-center gap-3"><Icon status={rule.cabin} /><div><p className="text-xs font-black uppercase tracking-wider opacity-70">Cabin baggage</p><p className="text-xl font-black">{rule.cabin}</p></div></div>
          </div>
          <div className={`rounded-2xl p-5 ring-1 ${tone(rule.checked)}`}>
            <div className="flex items-center gap-3"><Icon status={rule.checked} /><div><p className="text-xs font-black uppercase tracking-wider opacity-70">Checked baggage</p><p className="text-xl font-black">{rule.checked}</p></div></div>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-300">{profile.confidenceReason}</p>
      </div>
    </section>
  );
}
