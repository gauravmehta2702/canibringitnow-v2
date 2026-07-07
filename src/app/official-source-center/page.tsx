import OfficialSourceCenter from '@/components/trust/OfficialSourceCenter';

export const metadata = {
  title: 'Official Source Center | Can I Bring It Now',
  description: 'Official source guidance for airline policies, airport security, customs, medication and travel advisories.',
  alternates: { canonical: '/official-source-center/' },
};

export default function OfficialSourceCenterPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <OfficialSourceCenter />
        </div>
      </section>
    </main>
  );
}
