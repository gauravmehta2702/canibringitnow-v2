import V2FoundationDashboard from '@/components/v2/V2FoundationDashboard';

export const metadata = {
  title: 'V2 Foundation | Can I Bring It Now',
  description: 'Scalable foundation for AI travel answers, programmatic SEO, airline intelligence, country intelligence and growth automation.',
  alternates: { canonical: '/v2-foundation/' },
};

export default function V2FoundationPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <V2FoundationDashboard />
        </div>
      </section>
    </main>
  );
}
