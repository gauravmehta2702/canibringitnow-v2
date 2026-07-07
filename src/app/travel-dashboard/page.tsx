import TravelDashboard from '@/components/trip/TravelDashboard';

export const metadata = {
  title: 'Travel Dashboard | Can I Bring It Now',
  description: 'A pre-travel dashboard connecting trip planning, travel rules, AI guidance, packing and future flight status.',
  alternates: { canonical: '/travel-dashboard/' },
};

export default function TravelDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <TravelDashboard />
        </div>
      </section>
    </main>
  );
}
