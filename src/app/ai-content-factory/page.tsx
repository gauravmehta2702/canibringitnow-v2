import AiContentFactoryDashboard from '@/components/growth/AiContentFactoryDashboard';

export const metadata = {
  title: 'AI Content Factory | Can I Bring It Now',
  description: 'Internal weekly content ideas for SEO pages, short videos, Pinterest and social answers.',
  alternates: { canonical: '/ai-content-factory/' },
};

export default function AiContentFactoryPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <AiContentFactoryDashboard />
        </div>
      </section>
    </main>
  );
}
