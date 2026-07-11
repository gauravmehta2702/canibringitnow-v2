import type { Metadata } from 'next';
import { ClipboardCheck, ShieldCheck, Sparkles } from 'lucide-react';
import TripRuleCheckerClient, { type TripRuleOption } from '@/components/trip/TripRuleCheckerClient';
import { airlines, countries, rules } from '@/data/rules';

export const metadata: Metadata = {
  title: 'Trip Packing & Baggage Rule Checker',
  description: 'Add the items you are packing and instantly compare cabin or checked baggage guidance for your trip.',
  alternates: { canonical: '/trip-checker/' },
  openGraph: {
    title: 'Trip Packing & Baggage Rule Checker',
    description: 'Build a personalised packing decision summary before you fly.',
    url: 'https://canibringitnow.com/trip-checker/',
    type: 'website',
  },
};

export default function TripCheckerPage() {
  const compactRules: TripRuleOption[] = rules.map((rule) => ({
    slug: rule.slug,
    item: rule.item,
    category: rule.category,
    shortAnswer: rule.shortAnswer,
    cabin: rule.cabin,
    checked: rule.checked,
    warning: rule.warning,
    tags: rule.tags,
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Trip Packing & Baggage Rule Checker',
    url: 'https://canibringitnow.com/trip-checker/',
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Web',
    description: 'A free tool for checking multiple travel items against cabin and checked baggage guidance.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
          <a href="/" className="text-sm font-bold text-brand-600">← Back to homepage</a>
          <div className="mt-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-brand-700 shadow-sm ring-1 ring-brand-100">
              <Sparkles className="h-4 w-4" /> Free personalised travel tool
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-7xl">Check your whole packing list in one place.</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">Choose your bag, add multiple items and get an instant decision summary with links to the detailed rules.</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-slate-700">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-slate-200"><ClipboardCheck className="h-4 w-4 text-brand-600" /> Multi-item check</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 ring-1 ring-slate-200"><ShieldCheck className="h-4 w-4 text-brand-600" /> Cabin vs checked</span>
            </div>
          </div>

          <TripRuleCheckerClient rules={compactRules} airlines={airlines} countries={countries} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ['Start with the exact item', 'Select the closest matching rule. Airline-specific entries are prioritised when you choose an airline.'],
            ['Read every warning', 'Restricted does not always mean prohibited. It usually means limits, packaging, documents or approval may apply.'],
            ['Verify before departure', 'Use the linked full rule, then confirm important restrictions with official sources before travel.'],
          ].map(([title, body]) => (
            <article key={title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
