import GrowthCommandCenter from '@/components/growth/GrowthCommandCenter';

export const metadata = {
  title: 'Growth Command Center | Can I Bring It Now',
  description: 'Central dashboard for AI content, revenue intelligence, SEO scale and product growth modules.',
  alternates: { canonical: '/growth-command-center/' },
};

export default function GrowthCommandCenterPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <GrowthCommandCenter />
        </div>
      </section>
    </main>
  );
}
