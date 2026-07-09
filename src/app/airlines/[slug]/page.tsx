import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Plane, ShieldCheck } from 'lucide-react';
import { getAirlineBySlug, getAirlines } from '@/lib/airlineUtils';
import { launchLimits } from '@/lib/launchLimits';

export function generateStaticParams() {
  return getAirlines().slice(0, launchLimits.airlines).map((airline) => ({
    slug: airline.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const airline = getAirlineBySlug(params.slug);

  if (!airline) {
    return {
      title: 'Airline not found | Can I Bring It Now',
    };
  }

  return {
    title: `${airline.name} Baggage Rules | Can I Bring It Now`,
    description: airline.description,
  };
}

export default function AirlinePage({ params }: { params: { slug: string } }) {
  const airline = getAirlineBySlug(params.slug);

  if (!airline) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <a href="/airlines/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            <ArrowLeft className="h-4 w-4" />
            All airlines
          </a>

          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <Plane className="h-7 w-7 text-brand-600" />
              <p className="font-semibold text-brand-600">Airline guide</p>
            </div>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {airline.name} baggage and travel rules
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {airline.description}
            </p>
          </div>

          <div className="mt-8 rounded-3xl bg-slate-950 p-8 text-white">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-green-300" />
              <h2 className="text-2xl font-bold">Before flying with {airline.name}</h2>
            </div>

            <ul className="mt-5 list-disc space-y-2 pl-5 leading-7 text-slate-300">
              <li>Check your airline baggage allowance before travelling.</li>
              <li>Confirm cabin and checked baggage rules for restricted items.</li>
              <li>Verify airport security and destination customs guidance where relevant.</li>
            </ul>
          </div>

          <div className="mt-8">
            <p className="font-semibold text-brand-600">Useful checks</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Popular rules for {airline.name} passengers
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {airline.rules.map((rule) => (
                <a
                  key={rule.slug}
                  href={`/rules/${rule.slug}/`}
                  className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft"
                >
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
