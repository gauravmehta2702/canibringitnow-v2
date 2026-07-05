import { Boxes, Search } from 'lucide-react';
import CategoryHubGrid from '@/components/categories/CategoryHubGrid';
import CategorySearchIntentBlock from '@/components/categories/CategorySearchIntentBlock';

export const metadata = {
  title: 'Travel Item Category Hubs | Can I Bring It Now',
  description: 'Explore travel rule categories for batteries, electronics, medication, baby travel, liquids, food, cosmetics and more.',
  alternates: { canonical: '/category-hub/' },
};

export default function CategoryHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <div className="flex items-center gap-3">
              <Boxes className="h-8 w-8 text-brand-600" />
              <p className="font-bold text-brand-600">G8 Category ecosystem</p>
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Travel item category hubs</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Browse travel rules by item category, including batteries, electronics, medication, liquids, baby travel, food, cosmetics and more.
            </p>

            <a href="/search/?q=power%20bank%20cabin%20baggage" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-black text-white hover:bg-brand-700">
              <Search className="h-5 w-5" /> Search category rules
            </a>

            <CategoryHubGrid />
            <CategorySearchIntentBlock category="Batteries" />
            <CategorySearchIntentBlock category="Medication" />
            <CategorySearchIntentBlock category="Liquids" />
          </div>
        </div>
      </section>
    </main>
  );
}
