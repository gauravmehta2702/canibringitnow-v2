import Orbit6Grid from '@/components/orbit6/Orbit6Grid';
import Orbit6Hero from '@/components/orbit6/Orbit6Hero';
import { getManualWorkReducerPlan } from '@/lib/orbit6Engine';

export const metadata = {
  title: 'Manual Work Reducer | Can I Bring It Now',
  description: 'A realistic workflow to reduce daily manual work while keeping human review for trust and quality.',
  alternates: { canonical: '/manual-work-reducer/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-5/" className="text-sm font-semibold text-brand-600">← ORBIT Release 5</a>
          <Orbit6Hero eyebrow="Manual Work Reducer" title="Run the site in a few focused weekly sessions" description="A realistic workflow to reduce daily manual work while keeping human review for trust and quality." />
          <Orbit6Grid title="Weekly workflow" eyebrow="Automation" cards={getManualWorkReducerPlan()} />
        </div>
      </section>
    </main>
  );
}
