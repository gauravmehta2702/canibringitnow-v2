import V2TravelBrainClient from '@/components/v2/V2TravelBrainClient';

export const metadata = {
  title: 'V2 AI Travel Brain | Can I Bring It Now',
  description: 'Ask one complete travel question and get connected airline, destination and item guidance before flying.',
  alternates: { canonical: '/v2-travel-brain/' },
};

export default function V2TravelBrainPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <V2TravelBrainClient />
        </div>
      </section>
    </main>
  );
}
