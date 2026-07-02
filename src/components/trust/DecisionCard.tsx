import { AlertTriangle, CheckCircle2, ShieldCheck, Star, XCircle } from 'lucide-react';
import type { RuleStatus } from '@/data/rules';

type DecisionCardProps = {
  cabin: RuleStatus;
  checked: RuleStatus;
  score: number;
  confidenceLabel: string;
  risk: 'Low' | 'Medium' | 'High';
  updated: string;
};

function StatusIcon({ status }: { status: RuleStatus }) {
  if (status === 'Allowed') return <CheckCircle2 className="h-6 w-6 text-green-700" />;
  if (status === 'Not allowed') return <XCircle className="h-6 w-6 text-red-700" />;
  return <AlertTriangle className="h-6 w-6 text-amber-700" />;
}

function statusClass(status: RuleStatus) {
  if (status === 'Allowed') return 'bg-green-50 text-green-950 ring-green-100';
  if (status === 'Not allowed') return 'bg-red-50 text-red-950 ring-red-100';
  return 'bg-amber-50 text-amber-950 ring-amber-100';
}

function riskClass(risk: string) {
  if (risk === 'Low') return 'bg-green-50 text-green-950 ring-green-100';
  if (risk === 'High') return 'bg-red-50 text-red-950 ring-red-100';
  return 'bg-amber-50 text-amber-950 ring-amber-100';
}

export default function DecisionCard({ cabin, checked, score, confidenceLabel, risk, updated }: DecisionCardProps) {
  return (
    <div className="mt-7 rounded-[2rem] bg-slate-950 p-5 text-white shadow-soft md:p-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-sky-200">
            <ShieldCheck className="h-4 w-4" />
            Travel Decision Score
          </div>
          <p className="mt-3 text-5xl font-black tracking-tight">{score}<span className="text-2xl text-slate-400">/100</span></p>
          <p className="mt-1 text-sm text-slate-300">{confidenceLabel} · Last reviewed {updated}</p>
        </div>

        <div className={`w-fit rounded-2xl px-4 py-3 text-sm font-bold ring-1 ${riskClass(risk)}`}>
          Risk level: {risk}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className={`rounded-3xl p-5 ring-1 ${statusClass(cabin)}`}>
          <div className="flex items-center gap-3">
            <StatusIcon status={cabin} />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide opacity-70">Cabin baggage</p>
              <p className="text-2xl font-black">{cabin}</p>
            </div>
          </div>
        </div>

        <div className={`rounded-3xl p-5 ring-1 ${statusClass(checked)}`}>
          <div className="flex items-center gap-3">
            <StatusIcon status={checked} />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide opacity-70">Checked baggage</p>
              <p className="text-2xl font-black">{checked}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
        <Star className="h-4 w-4 text-yellow-300" />
        Use this as a fast travel decision summary, then verify important restrictions before flying.
      </div>
    </div>
  );
}
