import TravelIntelligenceClient from '@/components/intelligence/TravelIntelligenceClient';

export const metadata = {
  title: 'Travel Intelligence Engine | Can I Bring It Now',
  description:
    'Ask one item, airline or destination question and get connected travel rules, related questions, packing timeline and next actions.',
  alternates: { canonical: '/travel-intelligence/' },
};

export default function TravelIntelligencePage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <TravelIntelligenceClient />
        </div>
      </section>
    </main>
  );
}
