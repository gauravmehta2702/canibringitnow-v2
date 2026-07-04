import { ArrowRight, Flame, Search, ShoppingBag, TrendingUp } from 'lucide-react';
import { airlines, countries, rules } from '@/data/rules';

export const metadata = {
  title: 'Trending Travel Checks | Can I Bring It Now',
  description:
    'Popular travel rule searches for power banks, medication, baby formula, liquids, protein powder, airlines and destinations.',
  alternates: {
    canonical: '/trending/',
  },
};

const prioritySearches = [
  'Can I take a power bank on Emirates?',
  'Baby formula to USA on British Airways',
  'Flying to Japan with protein powder',
  'CPAP machine on Qatar Airways',
  'Medication on a plane',
  'Liquids in hand luggage',
  'Perfume in cabin baggage',
  'Drone batteries on a plane',
];

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function TrendingPage() {
  const popularRules = rules.slice(0, 18);
  const popularAirlines = airlines.slice(0, 12);
  const popularCountries = countries.slice(0, 12);

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>

          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-brand-600" />
              <p className="font-bold text-brand-600">Visitor growth hub</p>
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Trending travel rule checks
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Start with the most common questions travellers ask before flying. These links help visitors find useful answers quickly and improve internal SEO linking.
            </p>

            <div className="mt-8 rounded-3xl bg-slate-950 p-5 text-white">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-300" />
                <h2 className="text-xl font-black">Popular searches</h2>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {prioritySearches.map((search) => (
                  <a
                    key={search}
                    href={`/search/?q=${encodeURIComponent(search)}`}
                    className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 font-bold text-white hover:bg-white/15"
                  >
                    {search}
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <section className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-brand-600" />
                  <h2 className="text-xl font-black text-slate-950">Popular rule pages</h2>
                </div>
                <div className="mt-4 grid gap-2">
                  {popularRules.map((rule) => (
                    <a key={rule.slug} href={`/rules/${rule.slug}/`} className="rounded-2xl bg-white p-3 ring-1 ring-slate-200 hover:bg-brand-50">
                      <p className="text-xs font-black uppercase tracking-wide text-brand-600">{rule.category}</p>
                      <p className="font-black text-slate-950">{rule.item}</p>
                    </a>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-brand-600" />
                  <h2 className="text-xl font-black text-slate-950">Popular airlines</h2>
                </div>
                <div className="mt-4 grid gap-2">
                  {popularAirlines.map((airline) => (
                    <a key={airline} href={`/airlines/${slugify(airline)}/`} className="rounded-2xl bg-white p-3 font-black text-slate-950 ring-1 ring-slate-200 hover:bg-brand-50">
                      {airline}
                    </a>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-brand-600" />
                  <h2 className="text-xl font-black text-slate-950">Popular destinations</h2>
                </div>
                <div className="mt-4 grid gap-2">
                  {popularCountries.map((country) => (
                    <a key={country} href={`/countries/${slugify(country)}/`} className="rounded-2xl bg-white p-3 font-black text-slate-950 ring-1 ring-slate-200 hover:bg-brand-50">
                      {country}
                    </a>
                  ))}
                </div>
              </section>
            </div>

            <a
              href="/deals/"
              className="mt-8 flex items-center justify-between rounded-3xl bg-brand-600 p-5 font-black text-white hover:bg-brand-700"
            >
              <span className="flex items-center gap-3">
                <ShoppingBag className="h-6 w-6" />
                Browse useful travel essentials
              </span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
