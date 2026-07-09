import { Globe2, Search } from 'lucide-react';
import CountryHubGrid from '@/components/countries/CountryHubGrid';
import CountrySearchIntentBlock from '@/components/countries/CountrySearchIntentBlock';

export const metadata = {
  title: 'Country Customs Rule Hubs | Can I Bring It Now',
  description: 'Explore destination customs and travel rule hubs for Japan, USA, India, Australia, Canada, UAE, Singapore and more.',
  alternates: { canonical: '/country-hub/' },
};

export default function CountryHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <div className="flex items-center gap-3">
              <Globe2 className="h-8 w-8 text-brand-600" />
              <p className="font-bold text-brand-600">G7 Country ecosystem</p>
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Country customs and travel rule hubs</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Find destination-specific checks for medication, food, baby products, supplements, electronics and restricted items.</p>
            <a href="/search/?q=protein%20powder%20to%20Japan" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-black text-white hover:bg-brand-700">
              <Search className="h-5 w-5" /> Search destination rules
            </a>
            <CountryHubGrid />
            <CountrySearchIntentBlock country="Japan" />
            <CountrySearchIntentBlock country="USA" />
            <CountrySearchIntentBlock country="India" />
          </div>
        </div>
      </section>
    </main>
  );
}
