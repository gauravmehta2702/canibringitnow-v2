import Orbit4CardGrid from '@/components/orbit4/Orbit4CardGrid';
import Orbit4Hero from '@/components/orbit4/Orbit4Hero';
import { getNext30DayPlan } from '@/lib/orbit4Engine';

export const metadata = {
  title: 'Next 30 Days Growth Plan | Can I Bring It Now',
  description: 'Stop adding random features. Verify, index, improve, link, publish and monitor.',
  alternates: { canonical: '/next-30-days/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-3/" className="text-sm font-semibold text-brand-600">← ORBIT Release 3</a>
          <Orbit4Hero eyebrow="Next 30 Days Growth Plan" title="The fastest path to first 10,000 visitors/month" description="Stop adding random features. Verify, index, improve, link, publish and monitor." />
          <Orbit4CardGrid title="30-day execution plan" eyebrow="Weekly actions" cards={getNext30DayPlan()} />
        </div>
      </section>
    </main>
  );
}
