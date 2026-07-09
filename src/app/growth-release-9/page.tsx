import type { Metadata } from 'next';
import GrowthRelease9Dashboard from '@/components/growth9/GrowthRelease9Dashboard';

export const metadata: Metadata = {
  title: 'Growth Release 9 | Can I Bring It Now',
  description: 'Production growth checklist for focused indexing, Google readiness, trust signals and revenue-safe site expansion.',
  alternates: { canonical: '/growth-release-9/' },
};

export default function GrowthRelease9Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-bold text-brand-600">← Back to homepage</a>
          <div className="mt-6">
            <GrowthRelease9Dashboard />
          </div>
        </div>
      </section>
    </main>
  );
}
