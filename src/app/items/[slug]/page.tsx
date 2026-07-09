import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, PackageSearch, ShieldCheck } from 'lucide-react';
import { getItemBySlug, getItems } from '@/lib/itemUtils';
import { launchLimits } from '@/lib/launchLimits';

export function generateStaticParams() {
  return getItems().slice(0, launchLimits.items).map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getItemBySlug(params.slug);
  if (!item) return { title: 'Item not found | Can I Bring It Now' };
  return {
    title: `${item.name} Travel Rules | Can I Bring It Now`,
    description: item.description,
    alternates: { canonical: `/items/${item.slug}/` },
    openGraph: {
      title: `${item.name} Travel Rules | Can I Bring It Now`,
      description: item.description,
      url: `https://canibringitnow.com/items/${item.slug}/`,
      type: 'website',
    },
  };
}

export default function ItemPage({ params }: { params: { slug: string } }) {
  const item = getItemBySlug(params.slug);
  if (!item) notFound();

  const topRule = item.rules[0];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <a href="/items/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            <ArrowLeft className="h-4 w-4" /> All items
          </a>

          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <PackageSearch className="h-7 w-7 text-brand-600" />
              <p className="font-semibold text-brand-600">Item guide</p>
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {item.name} travel rules
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{item.description}</p>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-950 p-8 text-white">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-green-300" />
              <h2 className="text-2xl font-bold">Quick decision</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                <p className="text-sm font-bold uppercase text-slate-300">Cabin baggage</p>
                <p className="mt-1 text-2xl font-black">{topRule.cabin}</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                <p className="text-sm font-bold uppercase text-slate-300">Checked baggage</p>
                <p className="mt-1 text-2xl font-black">{topRule.checked}</p>
              </div>
            </div>
            <p className="mt-5 leading-7 text-slate-300">{topRule.shortAnswer}</p>
          </div>

          <div className="mt-8">
            <p className="font-semibold text-brand-600">Related rules</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">All {item.name.toLowerCase()} checks</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {item.rules.map((rule) => (
                <a key={rule.slug} href={`/rules/${rule.slug}/`} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft">
                  <p className="text-sm font-semibold text-brand-600">{rule.category}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">{rule.item}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                    Read rule <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
