import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Globe2, Layers3, Search, ShieldCheck } from 'lucide-react';
import { getCountries, getCountryBySlug } from '@/lib/countryUtils';

export function generateStaticParams() {
  return getCountries().map((country) => ({ slug: country.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const country = getCountryBySlug(params.slug);
  if (!country) return { title: 'Destination not found | Can I Bring It Now' };
  return {
    title: `${country.name} Customs & Travel Rules | Can I Bring It Now`,
    description: `${country.description} Check food, medication, customs, electronics and baggage guidance for ${country.name}.`,
    alternates: { canonical: `/countries/${country.slug}/` },
    openGraph: {
      title: `${country.name} travel rules | Can I Bring It Now`,
      description: country.description,
      url: `https://canibringitnow.com/countries/${country.slug}/`,
      type: 'website',
    },
  };
}

export default function CountryPage({ params }: { params: { slug: string } }) {
  const country = getCountryBySlug(params.slug);
  if (!country) notFound();

  const featuredRules = country.rules.slice(0, 18);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${country.name} customs and travel rules`,
      description: country.description,
      url: `https://canibringitnow.com/countries/${country.slug}/`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://canibringitnow.com/' },
        { '@type': 'ListItem', position: 2, name: 'Countries', item: 'https://canibringitnow.com/countries/' },
        { '@type': 'ListItem', position: 3, name: country.name, item: `https://canibringitnow.com/countries/${country.slug}/` },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {jsonLd.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <a href="/countries/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            <ArrowLeft className="h-4 w-4" /> All destinations
          </a>

          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <Globe2 className="h-7 w-7 text-brand-600" />
              <p className="font-semibold text-brand-600">Destination guide</p>
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{country.name} travel rules</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{country.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {country.categories.map((category) => (
                <a key={category.slug} href={`/categories/${category.slug}/`} className="rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 ring-1 ring-brand-100 hover:bg-brand-100">
                  {category.name} ({category.count})
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-950 p-8 text-white">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-green-300" />
              <h2 className="text-2xl font-bold">Before travelling to {country.name}</h2>
            </div>
            <ul className="mt-5 list-disc space-y-2 pl-5 leading-7 text-slate-300">
              <li>Check destination customs and declaration rules before packing food or restricted items.</li>
              <li>Confirm medication rules before travelling internationally.</li>
              <li>Check airport security guidance for liquids, batteries and electronics.</li>
            </ul>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[2fr_1fr]">
            <section>
              <p className="font-semibold text-brand-600">Useful checks</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">Popular rules for {country.name} travellers</h2>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {featuredRules.map((rule) => (
                  <a key={rule.slug} href={`/rules/${rule.slug}/`} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft">
                    <p className="text-sm font-semibold text-brand-600">{rule.category}</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-950">{rule.item}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="rounded-2xl bg-slate-50 p-3"><span className="block text-xs text-slate-500">Cabin</span><strong>{rule.cabin}</strong></div>
                      <div className="rounded-2xl bg-slate-50 p-3"><span className="block text-xs text-slate-500">Checked</span><strong>{rule.checked}</strong></div>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">Read rule <ArrowRight className="h-4 w-4" /></span>
                  </a>
                ))}
              </div>
            </section>

            <aside className="space-y-5">
              <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-brand-600" />
                  <h2 className="font-black text-slate-950">Popular {country.name} searches</h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {country.popularSearches.map((term) => (
                    <a key={term} href={`/search/?q=${encodeURIComponent(term)}`} className="rounded-full bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700">{term}</a>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-2">
                  <Layers3 className="h-5 w-5 text-brand-600" />
                  <h2 className="font-black text-slate-950">Related destinations</h2>
                </div>
                <div className="mt-4 grid gap-2">
                  {country.relatedCountries.map((related) => (
                    <a key={related.slug} href={`/countries/${related.slug}/`} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700">
                      {related.name}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
