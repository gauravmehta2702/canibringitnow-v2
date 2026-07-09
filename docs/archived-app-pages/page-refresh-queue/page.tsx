import Orbit6Grid from '@/components/orbit6/Orbit6Grid';
import Orbit6Hero from '@/components/orbit6/Orbit6Hero';
import { getPageRefreshQueue } from '@/lib/orbit6Engine';

export const metadata = {
  title: 'Page Refresh Queue | Can I Bring It Now',
  description: 'Refresh high-value rule pages with better answers, FAQs, official-source reminders and internal links.',
  alternates: { canonical: '/page-refresh-queue/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-5/" className="text-sm font-semibold text-brand-600">← ORBIT Release 5</a>
          <Orbit6Hero eyebrow="Page Refresh Queue" title="Improve existing pages before creating too many new ones" description="Refresh high-value rule pages with better answers, FAQs, official-source reminders and internal links." />
          <Orbit6Grid title="Refresh priorities" eyebrow="SEO updates" cards={getPageRefreshQueue()} />
        </div>
      </section>
    </main>
  );
}
