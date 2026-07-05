import { ExternalLink, ShoppingBag } from 'lucide-react';
import { getGrowthProducts } from '@/lib/growthMonetisation';

export default function GrowthProductBlock({ category }: { category?: string }) {
  const products = getGrowthProducts(category);
  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <ShoppingBag className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">G10A Monetisation engine</p>
          <h2 className="text-2xl font-black text-slate-950">Useful travel products for this check</h2>
        </div>
      </div>
      <p className="mt-3 leading-7 text-slate-600">These suggestions are optional and should stay relevant to the travel rule. Replace links with affiliate links later.</p>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {products.map((product) => (
          <a key={product.title} href={product.searchUrl} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
            <div className="flex items-start justify-between gap-2">
              <p className="font-black text-slate-950">{product.title}</p>
              <ExternalLink className="h-4 w-4 text-slate-400" />
            </div>
            <p className="mt-2 text-xs font-black uppercase tracking-wide text-brand-600">{product.category}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
