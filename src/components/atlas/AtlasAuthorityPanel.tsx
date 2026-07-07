import { Gauge, ShieldCheck } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getAtlasAuthorityLabel, getAtlasAuthorityScore, getAtlasReadingTime, getAtlasRiskReason } from '@/lib/atlasSeoEngine';

export default function AtlasAuthorityPanel({ rule }: { rule: Rule }) {
  const score = getAtlasAuthorityScore(rule);
  const label = getAtlasAuthorityLabel(score);
  const readingTime = getAtlasReadingTime(rule);

  return (
    <section className="mt-8 rounded-3xl bg-slate-950 p-6 text-white shadow-soft">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-sky-200">
            <ShieldCheck className="h-4 w-4" />
            ATLAS authority layer
          </div>
          <h2 className="mt-5 text-3xl font-black">Authority score {score}/100</h2>
          <p className="mt-2 max-w-3xl leading-7 text-slate-300">
            {label} · Estimated reading time {readingTime} min · Last reviewed {rule.updated}
          </p>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">{getAtlasRiskReason(rule)}</p>
        </div>

        <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
          <Gauge className="h-7 w-7 text-sky-300" />
          <p className="mt-3 text-5xl font-black">{score}</p>
          <p className="text-sm font-bold text-slate-300">{label}</p>
        </div>
      </div>
    </section>
  );
}
