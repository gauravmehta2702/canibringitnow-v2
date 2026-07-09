import RevenueIntelligenceDashboard from '@/components/revenue/RevenueIntelligenceDashboard';

export const metadata = {
  title: 'Revenue Intelligence | Can I Bring It Now',
  description: 'AdSense readiness, affiliate opportunities and contextual revenue placements.',
  alternates: { canonical: '/revenue-intelligence/' },
};

export default function RevenueIntelligencePage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <RevenueIntelligenceDashboard />
        </div>
      </section>
    </main>
  );
}
