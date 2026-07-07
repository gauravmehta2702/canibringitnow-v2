import TripPlannerClient from '@/components/trip/TripPlannerClient';

export const metadata = {
  title: 'AI Trip Planner | Can I Bring It Now',
  description: 'Build a travel preparation plan from your airline, destination, travellers and packed items.',
  alternates: { canonical: '/trip-planner/' },
};

export default function TripPlannerPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <TripPlannerClient />
        </div>
      </section>
    </main>
  );
}
