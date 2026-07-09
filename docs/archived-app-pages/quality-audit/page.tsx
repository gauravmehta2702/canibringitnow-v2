import QualityAuditDashboard from '@/components/trust/QualityAuditDashboard';

export const metadata = {
  title: 'Quality Audit | Can I Bring It Now',
  description: 'Quality, trust, revenue safety and AdSense readiness audit for Can I Bring It Now.',
  alternates: { canonical: '/quality-audit/' },
};

export default function QualityAuditPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <QualityAuditDashboard />
        </div>
      </section>
    </main>
  );
}
