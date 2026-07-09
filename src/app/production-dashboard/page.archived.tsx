import ProductionDashboard from '@/components/production/ProductionDashboard';

export const metadata = {
  title: 'Production Dashboard | Can I Bring It Now',
  description: 'Launch readiness, SEO validation, revenue next actions and consolidation dashboard.',
  alternates: { canonical: '/production-dashboard/' },
};

export default function ProductionDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <ProductionDashboard />
        </div>
      </section>
    </main>
  );
}
