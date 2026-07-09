import PackingPlannerClient from '@/components/production/PackingPlannerClient';

export const metadata = {
  title: 'Smart Packing Planner | Can I Bring It Now',
  description: 'Generate a travel packing checklist based on destination, airline, trip length, medication, electronics and baby travel.',
  alternates: { canonical: '/packing-planner/' },
};

export default function PackingPlannerPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <PackingPlannerClient />
        </div>
      </section>
    </main>
  );
}
