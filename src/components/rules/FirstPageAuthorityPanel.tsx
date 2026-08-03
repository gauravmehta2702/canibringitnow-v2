import { ArrowRight, CheckCircle2, Network, SearchCheck } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getAuthorityProfile } from '@/lib/build26Authority';

export default function FirstPageAuthorityPanel({ rule }: { rule: Rule }) {
  const profile = getAuthorityProfile(rule);
  return (
    <section className="mt-8 rounded-3xl bg-sky-50 p-6 ring-1 ring-sky-100 md:p-8">
      <div className="flex items-center gap-3"><SearchCheck className="h-7 w-7 text-brand-600" /><div><p className="text-sm font-black uppercase tracking-wide text-brand-700">Complete search-intent coverage</p><h2 className="text-2xl font-black text-slate-950">What travellers need to verify</h2></div></div>
      <p className="mt-3 leading-7 text-slate-700">This guide is part of our <strong>{profile.pillar}</strong> cluster. Use the quick decision above, then verify the details that can change by airline, airport and destination.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 ring-1 ring-sky-100"><p className="font-black text-slate-950">Three checks before travel</p><ul className="mt-3 space-y-3 text-sm leading-6 text-slate-700">{profile.checks.map((check) => <li key={check} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-700" />{check}</li>)}</ul></div>
        <div className="rounded-2xl bg-white p-5 ring-1 ring-sky-100"><p className="flex items-center gap-2 font-black text-slate-950"><Network className="h-4 w-4 text-brand-600" />Related concepts</p><div className="mt-3 flex flex-wrap gap-2">{profile.entities.map((entity) => <a key={entity} href={`/search/?q=${encodeURIComponent(entity)}`} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-brand-50 hover:text-brand-700">{entity}</a>)}</div></div>
      </div>
      <div className="mt-6"><p className="font-black text-slate-950">Questions this page answers</p><div className="mt-3 grid gap-2 md:grid-cols-2">{profile.questions.map((question) => <a key={question} href={`/search/?q=${encodeURIComponent(question)}`} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 ring-1 ring-sky-100 hover:text-brand-700">{question}<ArrowRight className="h-4 w-4" /></a>)}</div></div>
    </section>
  );
}
