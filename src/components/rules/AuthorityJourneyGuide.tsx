import { AlertOctagon, ArrowRight, CheckSquare, HelpCircle, SearchCheck } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { buildAuthorityInsight } from '@/lib/authorityEngine';

export default function AuthorityJourneyGuide({ rule }: { rule: Rule }) {
  const insight = buildAuthorityInsight(rule);
  return (
    <section className="mt-8 space-y-6" aria-label="Travel authority guidance">
      <div className="rounded-3xl bg-sky-50 p-6 ring-1 ring-sky-100 md:p-7">
        <div className="flex items-start gap-3"><HelpCircle className="mt-1 h-6 w-6 shrink-0 text-sky-700" /><div><h2 className="text-2xl font-black text-slate-950">Why this travel rule exists</h2><p className="mt-3 leading-7 text-slate-700">{insight.whyItExists}</p></div></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-red-50 p-6 ring-1 ring-red-100">
          <div className="flex items-center gap-3"><AlertOctagon className="h-6 w-6 text-red-700" /><h2 className="text-xl font-black text-slate-950">Common traveller mistakes</h2></div>
          <ul className="mt-4 space-y-3 text-slate-700">{insight.mistakes.map((item) => <li key={item} className="flex gap-3"><span className="font-black text-red-700">×</span><span>{item}</span></li>)}</ul>
        </div>
        <div className="rounded-3xl bg-green-50 p-6 ring-1 ring-green-100">
          <div className="flex items-center gap-3"><CheckSquare className="h-6 w-6 text-green-700" /><h2 className="text-xl font-black text-slate-950">Traveller checklist</h2></div>
          <ul className="mt-4 space-y-3 text-slate-700">{insight.checklist.map((item) => <li key={item} className="flex gap-3"><span className="font-black text-green-700">✓</span><span>{item}</span></li>)}</ul>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
        <div className="flex items-center gap-3"><SearchCheck className="h-6 w-6 text-brand-600" /><h2 className="text-xl font-black text-slate-950">Verify in this order</h2></div>
        <ol className="mt-5 grid gap-3 md:grid-cols-3">{insight.verificationSteps.map((step, index) => <li key={step} className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700 ring-1 ring-slate-200"><span className="mr-2 text-brand-700">{index + 1}.</span>{step}</li>)}</ol>
      </div>

      <div>
        <p className="font-bold text-brand-600">Continue the journey</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Connect this rule to the rest of your trip</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">{insight.journeyLinks.map((link) => <a key={link.href} href={link.href} className="rounded-3xl bg-white p-5 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:ring-brand-200"><p className="font-black text-slate-950">{link.title}</p><p className="mt-2 text-sm leading-6 text-slate-600">{link.description}</p><span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-700">Continue <ArrowRight className="h-4 w-4" /></span></a>)}</div>
      </div>
    </section>
  );
}
