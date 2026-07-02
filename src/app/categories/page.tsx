import { ArrowRight, Layers3 } from 'lucide-react';
import { getCategories } from '@/lib/categoryUtils';

export const metadata = {
  title: 'Travel Rule Categories | Can I Bring It Now',
  description: 'Browse travel rules by category, including batteries, liquids, medication, baby travel, cosmetics and food customs.',
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to home</a>

          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <Layers3 className="h-7 w-7 text-brand-600" />
              <p className="font-semibold text-brand-600">Browse by category</p>
            </div>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Travel rule categories
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Explore travel rules by topic. Each category links to useful checks for cabin baggage,
              checked baggage, airport security and customs guidance.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`/categories/${category.slug}/`}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <p className="text-sm font-semibold text-brand-600">
                  {category.count} rule{category.count === 1 ? '' : 's'}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">{category.name}</h2>
                <p className="mt-3 leading-7 text-slate-600">{category.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  Open category <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
