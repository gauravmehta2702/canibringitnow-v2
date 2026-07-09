import V3CoreDashboard from '@/components/v3/V3CoreDashboard';

export const metadata = {
  title: 'V3 Core Platform | Can I Bring It Now',
  description: 'Unified Travel Rule Search Engine architecture with destination intelligence, Top 5 guides, SEO seeds and platform roadmap.',
  alternates: { canonical: '/v3-core/' },
};

export default function V3CorePage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <V3CoreDashboard />
        </div>
      </section>
    </main>
  );
}
