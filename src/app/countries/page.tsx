import { ArrowRight, Globe2 } from 'lucide-react';
import { getCountries } from '@/lib/countryUtils';

export const metadata = {
  title: 'Destination Travel Rules | Can I Bring It Now',
  description: 'Browse destination travel guidance for customs, food, medication, electronics, airport security and baggage rules.',
};

export default function CountriesPage() {
  const countries = getCountries();
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to home</a>
          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <Globe2 className="h-7 w-7 text-brand-600" />
              <p className="font-semibold text-brand-600">Browse by destination</p>
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Destination travel rules</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Choose a destination to explore customs, airport security, medication, food and baggage guidance before you travel.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <a key={country.slug} href={`/countries/${country.slug}/`} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft">
                <p className="text-sm font-semibold text-brand-600">Destination guide</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">{country.name}</h2>
                <p className="mt-3 leading-7 text-slate-600">{country.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  Open destination guide <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
