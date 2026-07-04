'use client';

import { ExternalLink, ShieldCheck, ShoppingBag, Sparkles } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getAffiliateSearchUrl, getRevenueDisclosure, getRevenueProducts } from '@/lib/revenueEngine';
import { trackAffiliateClick } from '@/lib/track';

export default function RevenueRecommendationBlock({
  rule,
  source = 'rule-page',
}: {
  rule?: Rule;
  source?: string;
}) {
  const products = getRevenueProducts(rule);

  return (
    <section className="mt-8 rounded-3xl bg-gradient-to-br from-white to-brand-50 p-6 ring-1 ring-slate-200">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-600 text-white">
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-brand-600">Travel essentials</p>
          <h2 className="mt-1 text-xl font-black text-slate-950">
            Helpful products for this travel check
          </h2>
          <p className="mt-2 leading-7 text-slate-600">
            These suggestions are based on the type of item you are checking. Always choose products that fit airline and airport rules.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {products.map((product) => {
          const url = getAffiliateSearchUrl(product.searchTerm);

          return (
            <a
              key={product.title}
              href={url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={() => trackAffiliateClick(product.title, product.category, source)}
              className="group rounded-2xl bg-white p-4 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:ring-brand-200"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-black text-slate-950">{product.title}</p>
                <ExternalLink className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-brand-600" />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                <Sparkles className="h-3 w-3" />
                {product.category}
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-2xl bg-white/70 p-4 text-sm leading-6 text-slate-600 ring-1 ring-slate-200">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
        <p>{getRevenueDisclosure()}</p>
      </div>
    </section>
  );
}
