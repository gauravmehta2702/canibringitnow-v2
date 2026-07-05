import BeforeYouFlyDashboard from '@/components/public-tools/BeforeYouFlyDashboard';

export const metadata = {
  title: 'Before You Fly Travel Tools | Can I Bring It Now',
  description: 'Search travel rules, use the AI travel brain, build a packing list, and prepare before you fly.',
  alternates: { canonical: '/before-you-fly/' },
};

export default function BeforeYouFlyPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <BeforeYouFlyDashboard />
        </div>
      </section>
    </main>
  );
}
