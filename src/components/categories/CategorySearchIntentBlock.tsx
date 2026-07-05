import { Search } from 'lucide-react';
import { getCategories, getCategorySearches } from '@/lib/categoryEcosystem';

export default function CategorySearchIntentBlock({ category }: { category?: string }) {
  const selected = category || getCategories()[0] || 'Travel items';
  const searches = getCategorySearches(selected);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <Search className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">Category search intent</p>
          <h2 className="text-2xl font-black text-slate-950">Common {selected} travel questions</h2>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {searches.map((search) => (
          <a key={search} href={`/search/?q=${encodeURIComponent(search)}`} className="rounded-full bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700">
            {search}
          </a>
        ))}
      </div>
    </section>
  );
}
