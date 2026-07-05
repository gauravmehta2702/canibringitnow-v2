import TravelAssistantClient from '@/components/ai/TravelAssistantClient';

export const metadata = {
  title: 'AI Travel Rules Assistant | Can I Bring It Now',
  description:
    'Ask a full travel rules question and get matching baggage, airline and destination guidance before you fly.',
  alternates: {
    canonical: '/travel-assistant/',
  },
};

export default function TravelAssistantPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <TravelAssistantClient />
        </div>
      </section>
    </main>
  );
}
