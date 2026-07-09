import SeoScaleDashboard from '@/components/seo-scale/SeoScaleDashboard';

export const metadata = {
  title: 'SEO Scale Dashboard | Can I Bring It Now',
  description: 'Programmatic SEO expansion dashboard for airline, country and travel-rule opportunities.',
  alternates: { canonical: '/seo-scale/' },
};

export default function SeoScalePage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <SeoScaleDashboard />
        </div>
      </section>
    </main>
  );
}
