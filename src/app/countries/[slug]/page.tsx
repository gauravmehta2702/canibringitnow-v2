import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Globe2, ShieldCheck } from 'lucide-react';
import { getCountries, getCountryBySlug } from '@/lib/countryUtils';

export function generateStaticParams() {
  return getCountries().map((country) => ({ slug: country.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const country = getCountryBySlug(params.slug);
  if (!country) return { title: 'Destination not found | Can I Bring It Now' };
  return {
    title: `${country.name} Travel Rules | Can I Bring It Now`,
    description: country.description,
  };
}

export default function CountryPage({ params }: { params: { slug: string } }) {
  const country = getCountryBySlug(params.slug);
  if (!country) notFound();

  return (
    <main className="min-h-screen bg-slate-50">
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
          <div className="mt-8">
            <p className="font-semibold text-brand-600">Useful checks</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Popular rules for {country.name} travellers</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {country.rules.map((rule) => (
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
