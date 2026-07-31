import { Search, TrendingUp } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getRelatedSearches } from '@/lib/keywordOpportunityEngine';

export default function RelatedSearchOpportunities({ rule }: { rule: Rule }) {
  const searches = getRelatedSearches(rule);
  if (!searches.length) return null;

  return (
    <section className="mt-8 rounded-[2rem] bg-white p-6 ring-1 ring-slate-200 md:p-8">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-brand-50 p-3 text-brand-700"><TrendingUp className="h-6 w-6" /></div>
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-brand-600">Explore the topic cluster</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">Related questions travellers ask</h2>
          <p className="mt-2 leading-7 text-slate-600">Continue with a closely related airline, baggage, airport-security or destination question.</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {searches.map((search) => (
          <a key={`${search.label}-${search.href}`} href={search.href} className="group flex items-center gap-3 rounded-2xl bg-slate-50 p-4 font-bold text-slate-800 ring-1 ring-slate-200 transition hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-200">
            <Search className="h-5 w-5 shrink-0 text-brand-600" />
            <span>{search.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
