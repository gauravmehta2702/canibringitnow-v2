import { ArrowRight } from 'lucide-react';
import type { Rule } from '@/data/rules';

export default function RelatedRules({ rules }: { rules: Rule[] }) {
  if (rules.length === 0) return null;

  return (
    <section>
      <p className="font-semibold text-brand-600">Related checks</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">You may also need to know</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {rules.map((rule) => (
          <a
            key={rule.slug}
            href={`/rules/${rule.slug}/`}
            className="rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand-500 hover:bg-brand-50"
          >
            <p className="text-sm font-semibold text-brand-600">{rule.category}</p>
            <h3 className="mt-1 font-bold text-slate-950">{rule.item}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
              View related rule <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
