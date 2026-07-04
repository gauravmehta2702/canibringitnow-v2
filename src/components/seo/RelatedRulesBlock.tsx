import { ArrowRight, Link2 } from 'lucide-react';
import { getRelatedRules } from '@/lib/g4SeoNetwork';

export default function RelatedRulesBlock({ slug }: { slug?: string }) {
  const relatedRules = getRelatedRules(slug, 9);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <Link2 className="h-6 w-6 text-brand-600" />
        <h2 className="text-2xl font-black text-slate-950">Related travel checks</h2>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {relatedRules.map((rule) => (
          <a
            key={rule.slug}
            href={`/rules/${rule.slug}/`}
            className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50"
          >
            <p className="text-xs font-black uppercase tracking-wide text-brand-600">{rule.category}</p>
            <p className="mt-1 font-black text-slate-950">{rule.item}</p>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-brand-600">
              Open rule <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
