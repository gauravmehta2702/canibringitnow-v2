import { CalendarDays, CheckCircle2, Luggage, Plane, ShieldCheck } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { buildRuleSeoProfile } from '@/lib/ruleSeoEngine';

export default function RuleSeoSnapshot({ rule }: { rule: Rule }) {
  const profile = buildRuleSeoProfile(rule);
  const facts = [
    { label: 'Cabin baggage', value: rule.cabin, icon: Plane },
    { label: 'Checked baggage', value: rule.checked, icon: Luggage },
    { label: 'Last reviewed', value: new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' }).format(new Date(`${rule.updated}T00:00:00Z`)), icon: CalendarDays },
    { label: 'Page status', value: profile.confidenceLabel, icon: profile.confidenceLabel === 'High confidence' ? CheckCircle2 : ShieldCheck },
  ];

  return (
    <section className="mt-7 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:p-6" aria-label="Rule at a glance">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-brand-700">Rule at a glance</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">The details travellers check first</h2>
        </div>
        <span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 ring-1 ring-slate-200">{rule.category}</span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <Icon className="h-5 w-5 text-brand-600" />
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-1 font-black text-slate-950">{value}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{profile.confidenceReason}</p>
    </section>
  );
}
