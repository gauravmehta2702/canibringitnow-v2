import { ArrowRight, PlaneTakeoff } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getSameItemAirlineRules, splitRuleSubject } from '@/lib/ruleSeoEngine';

export default function SameItemAirlines({ rule }: { rule: Rule }) {
  const alternatives = getSameItemAirlineRules(rule);
  if (!alternatives.length) return null;
  const { baseItem } = splitRuleSubject(rule);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><PlaneTakeoff className="h-5 w-5" /></div>
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-brand-700">Same item, other airlines</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">Compare {baseItem.toLowerCase()} rules before booking</h2>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {alternatives.map((candidate) => {
          const airline = splitRuleSubject(candidate).airline || candidate.item;
          return (
            <a key={candidate.slug} href={`/rules/${candidate.slug}/`} className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:ring-brand-200">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-black text-slate-950">{airline}</p>
                  <p className="mt-1 text-sm text-slate-600">Cabin: {candidate.cabin} · Checked: {candidate.checked}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-brand-600 transition group-hover:translate-x-1" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
