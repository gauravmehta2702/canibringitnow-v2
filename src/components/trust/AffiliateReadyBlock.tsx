import { ShoppingBag } from 'lucide-react';

export default function AffiliateReadyBlock({ ideas }: { ideas: string[] }) {
  if (ideas.length === 0) return null;

  return (
    <section className="rounded-3xl bg-gradient-to-br from-white to-brand-50 p-6 ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <ShoppingBag className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-semibold text-brand-600">Travel essentials</p>
          <h2 className="text-xl font-bold text-slate-950">Useful products for this rule</h2>
        </div>
      </div>
      <p className="mt-3 text-slate-600">
        Revenue-ready placement for relevant recommendations. Add affiliate links only when they genuinely help travellers.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {ideas.map((idea) => (
          <span key={idea} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
            {idea}
          </span>
        ))}
      </div>
    </section>
  );
}
