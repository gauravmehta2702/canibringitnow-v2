import AtlasAuditDashboard from '@/components/atlas/AtlasAuditDashboard';

export const metadata = {
  title: 'ATLAS SEO Audit | Can I Bring It Now',
  description: 'Project ATLAS audit for SEO, knowledge graph, internal linking and rule-page authority.',
  alternates: { canonical: '/atlas-audit/' },
};

export default function AtlasAuditPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <AtlasAuditDashboard />
        </div>
      </section>
    </main>
  );
}
