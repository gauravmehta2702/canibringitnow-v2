import { ArrowRight, ShoppingBag } from 'lucide-react';
import AffiliateProductBlock from '@/components/revenue/AffiliateProductBlock';

export const metadata = {
  title: 'Travel Essentials for Airport Security | Can I Bring It Now',
  description:
    'Useful travel essentials for power banks, baby travel, medication, liquids, packing and airport security.',
  alternates: {
    canonical: '/travel-essentials/',
  },
};

const searches = [
  'power bank',
  'liquids',
  'medication',
  'baby formula',
  'protein powder',
  'laptop',
];

export default function TravelEssentialsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>

          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-8 w-8 text-brand-600" />
              <p className="font-bold text-brand-600">Revenue engine</p>
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Travel essentials that help before you fly
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Start with the travel rule, then choose products only when they genuinely help with packing, airport security or baggage preparation.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {searches.map((search) => (
                <a
                  key={search}
                  href={`/search/?q=${encodeURIComponent(search)}`}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 font-black text-slate-950 ring-1 ring-slate-200 hover:bg-brand-50"
                >
                  Check {search}
                  <ArrowRight className="h-4 w-4 text-brand-600" />
                </a>
              ))}
            </div>

            <AffiliateProductBlock source="travel-essentials-page" />
          </div>
        </div>
      </section>
    </main>
  );
}
