import { ArrowRight, Plane } from 'lucide-react';
import { getAirlines } from '@/lib/airlineUtils';

export const metadata = {
  title: 'Airline Baggage Rules | Can I Bring It Now',
  description: 'Browse airline baggage and travel item guidance for Ryanair, easyJet, British Airways, Emirates, Qatar Airways and more.',
};

export default function AirlinesPage() {
  const airlines = getAirlines();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to home</a>

          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <Plane className="h-7 w-7 text-brand-600" />
              <p className="font-semibold text-brand-600">Browse by airline</p>
            </div>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Airline baggage and travel rules
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Choose an airline to explore useful baggage, airport security and packing guidance before you travel.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {airlines.map((airline) => (
              <a
                key={airline.slug}
                href={`/airlines/${airline.slug}/`}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <p className="text-sm font-semibold text-brand-600">Airline guide</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">{airline.name}</h2>
                <p className="mt-3 leading-7 text-slate-600">{airline.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  Open airline guide <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
