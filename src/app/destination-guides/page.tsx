import DestinationGuidesHub from '@/components/destination-guides/DestinationGuidesHub';

export const metadata = {
  title: 'Destination Guides | Can I Bring It Now',
  description: 'Top 5 hotel, restaurant and attraction guide ideas connected to travel preparation.',
  alternates: { canonical: '/destination-guides/' },
};

export default function DestinationGuidesPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <DestinationGuidesHub />
        </div>
      </section>
    </main>
  );
}
