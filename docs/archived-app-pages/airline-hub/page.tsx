import { Plane, Search } from 'lucide-react';
import AirlineHubGrid from '@/components/airlines/AirlineHubGrid';
import AirlineSearchIntentBlock from '@/components/airlines/AirlineSearchIntentBlock';

export const metadata = {
  title: 'Airline Baggage Rule Hubs | Can I Bring It Now',
  description: 'Explore baggage and travel rule hubs for Ryanair, Emirates, British Airways, Qatar Airways, Virgin Atlantic, easyJet and more.',
  alternates: { canonical: '/airline-hub/' },
};

export default function AirlineHubPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <div className="flex items-center gap-3">
              <Plane className="h-8 w-8 text-brand-600" />
              <p className="font-bold text-brand-600">G6 Airline ecosystem</p>
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Airline baggage and travel rule hubs</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Find airline-specific checks for power banks, liquids, medication, baby travel, electronics and restricted items.</p>
            <a href="/search/?q=power%20bank%20on%20Emirates" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-black text-white hover:bg-brand-700">
              <Search className="h-5 w-5" /> Search airline rules
            </a>
            <AirlineHubGrid />
            <AirlineSearchIntentBlock airline="Emirates" />
            <AirlineSearchIntentBlock airline="Ryanair" />
          </div>
        </div>
      </section>
    </main>
  );
}
