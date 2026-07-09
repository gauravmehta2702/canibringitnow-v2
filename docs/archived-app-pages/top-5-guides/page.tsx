import Top5GuideTemplate from '@/components/v3/Top5GuideTemplate';

export const metadata = {
  title: 'Top 5 Travel Guide Templates | Can I Bring It Now',
  description: 'Reusable templates for Top 5 hotels, restaurants, attractions and destination preparation guides.',
  alternates: { canonical: '/top-5-guides/' },
};

export default function Top5GuidesPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/v3-core/" className="text-sm font-semibold text-brand-600">← V3 Core</a>
          <Top5GuideTemplate destination="Tokyo" guideType="affordable hotels" />
          <Top5GuideTemplate destination="Dubai" guideType="airport hotels" />
        </div>
      </section>
    </main>
  );
}
