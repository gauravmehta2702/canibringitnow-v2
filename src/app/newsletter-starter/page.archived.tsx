import Orbit6Grid from '@/components/orbit6/Orbit6Grid';
import Orbit6Hero from '@/components/orbit6/Orbit6Hero';
import { getNewsletterIdeas } from '@/lib/orbit6Engine';

export const metadata = {
  title: 'Newsletter Starter | Can I Bring It Now',
  description: 'Simple email ideas for future weekly travel tips, top checks and destination reminders.',
  alternates: { canonical: '/newsletter-starter/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-5/" className="text-sm font-semibold text-brand-600">← ORBIT Release 5</a>
          <Orbit6Hero eyebrow="Newsletter Starter" title="Start building return visitors" description="Simple email ideas for future weekly travel tips, top checks and destination reminders." />
          <Orbit6Grid title="Newsletter ideas" eyebrow="Retention" cards={getNewsletterIdeas()} />
        </div>
      </section>
    </main>
  );
}
