import { ArrowRight, BarChart3 } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getComparisonForRule } from '@/lib/travelKnowledgeGraph';

export default function AirlineComparisonCta({ rule }: { rule: Rule }) {
  const topic = getComparisonForRule(rule);
  if (!topic) return null;

  return (
    <section className="mt-8 rounded-3xl bg-gradient-to-br from-sky-50 to-white p-6 ring-1 ring-sky-100">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-sky-100 p-3 text-sky-700"><BarChart3 className="h-6 w-6" /></div>
        <div className="flex-1">
          <p className="text-sm font-black uppercase tracking-wide text-sky-700">Compare airline rules</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">How do {topic.entries.length} airlines handle {topic.name.toLowerCase()}?</h2>
          <p className="mt-3 leading-7 text-slate-600">See cabin and checked-baggage decisions side by side before choosing or confirming your airline.</p>
          <a href={`/compare-airlines/${topic.slug}/`} className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-slate-800">
            Compare airlines <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
