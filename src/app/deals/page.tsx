import { ArrowRight, Luggage, ShieldCheck, ShoppingBag } from 'lucide-react';
import RevenueRecommendationBlock from '@/components/growth/RevenueRecommendationBlock';

export const metadata = {
  title: 'Travel Essentials | Can I Bring It Now',
  description:
    'Useful travel essentials for airport security, cabin baggage, medication, baby travel, electronics and packing.',
  alternates: {
    canonical: '/deals/',
  },
};

const collections = [
  {
    title: 'Power & electronics',
    description: 'Power banks, travel adapters, cable organisers and electronics pouches.',
    href: '/search/?q=power%20bank',
  },
  {
    title: 'Airport security',
    description: 'Clear liquids bags, travel-size bottles and toiletry organisers.',
    href: '/search/?q=liquids',
  },
  {
    title: 'Medication travel',
    description: 'Medicine organisers, document wallets and insulated pouches.',
    href: '/search/?q=medication',
  },
  {
    title: 'Baby travel',
    description: 'Bottle bags, formula dispensers and baby travel organisers.',
    href: '/search/?q=baby%20formula',
  },
];

export default function DealsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>

          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-8 w-8 text-brand-600" />
              <p className="font-bold text-brand-600">Travel essentials</p>
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Useful travel products to check before you fly
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              These product categories support travellers after they get an answer — not before it.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {collections.map((collection) => (
                <a
                  key={collection.title}
                  href={collection.href}
                  className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:bg-brand-50 hover:ring-brand-100"
                >
                  <div className="flex items-center gap-3">
                    <Luggage className="h-6 w-6 text-brand-600" />
                    <h2 className="text-xl font-black text-slate-950">{collection.title}</h2>
                  </div>
                  <p className="mt-3 leading-7 text-slate-600">{collection.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-600">
                    Explore related checks <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 h-6 w-6 text-green-300" />
                <div>
                  <h2 className="text-2xl font-black">Revenue principle</h2>
                  <p className="mt-3 leading-7 text-slate-300">
                    The answer comes first. Product recommendations should only appear after users get useful travel guidance.
                  </p>
                </div>
              </div>
            </div>

            <RevenueRecommendationBlock source="deals-page" />
          </div>
        </div>
      </section>
    </main>
  );
}
