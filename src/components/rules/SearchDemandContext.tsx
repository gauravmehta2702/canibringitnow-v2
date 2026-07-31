import type { Rule } from '@/data/rules';
import { getTrafficTargetForSlug } from '@/lib/trafficAccelerationEngine';

export default function SearchDemandContext({ rule }: { rule: Rule }) {
  const target = getTrafficTargetForSlug(rule.slug);
  if (!target || !target.matchingQueries.length) return null;

  return (
    <section className="mt-8 rounded-3xl bg-sky-50 p-6 ring-1 ring-sky-100">
      <p className="font-black text-sky-800">Questions this guide answers</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">Related wording travellers use when searching</h2>
      <div className="mt-5 flex flex-wrap gap-3">
        {target.matchingQueries.slice(0, 6).map((query) => (
          <span key={query.query} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-sky-100">{query.query}</span>
        ))}
      </div>
    </section>
  );
}
