import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Layers3 } from 'lucide-react';
import { getCategories, getCategoryBySlug } from '@/lib/categoryUtils';

export function generateStaticParams() {
  return getCategories().map((category) => ({
    slug: category.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category not found | Can I Bring It Now',
    };
  }

  return {
    title: `${category.name} Travel Rules | Can I Bring It Now`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <a href="/categories/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            <ArrowLeft className="h-4 w-4" />
            All categories
          </a>

          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <Layers3 className="h-7 w-7 text-brand-600" />
              <p className="font-semibold text-brand-600">Travel category</p>
            </div>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {category.name} travel rules
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {category.description}
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {category.rules.map((rule) => (
              <a
                key={rule.slug}
                href={`/rules/${rule.slug}/`}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <p className="text-sm font-semibold text-brand-600">{rule.category}</p>
                <h2 className="mt-2 text-xl font-bold text-slate-950">{rule.item}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-500">Cabin</p>
                    <p className="font-bold text-slate-950">{rule.cabin}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-500">Checked</p>
                    <p className="font-bold text-slate-950">{rule.checked}</p>
                  </div>
                </div>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  Read rule <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
