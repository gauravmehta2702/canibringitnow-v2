'use client';

import { ExternalLink, ShieldCheck, ShoppingBag } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getAffiliateProducts, getAffiliateUrl } from '@/lib/affiliateRevenue';
import { trackRevenueClick } from '@/lib/revenueTracking';

export default function AffiliateProductBlock({
  rule,
  source = 'content',
}: {
  rule?: Rule;
  source?: string;
}) {
  const products = getAffiliateProducts(rule);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-600 text-white">
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div>
          <p className="font-bold text-brand-600">Travel essentials</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">
            Useful products for this check
          </h2>
          <p className="mt-2 leading-7 text-slate-600">
            The travel answer comes first. These suggestions are optional and based on the type of item being checked.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {products.map((product) => (
          <a
            key={product.id}
            href={getAffiliateUrl(product)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={() => trackRevenueClick(product.id, source)}
            className="group rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-brand-50 hover:ring-brand-200"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-black text-slate-950">{product.title}</p>
              <ExternalLink className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-brand-600" />
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
            <p className="mt-3 text-xs font-black uppercase tracking-wide text-brand-600">{product.category}</p>
          </a>
        ))}
      </div>

      <div className="mt-5 flex gap-2 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600 ring-1 ring-slate-200">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
        <p>
          Some outbound links may become affiliate links. Keep recommendations relevant and helpful to protect user trust.
        </p>
      </div>
    </section>
  );
}
