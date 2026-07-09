import GrowthGrid from '@/components/growth8/GrowthGrid';
import GrowthHero from '@/components/growth8/GrowthHero';
import { getSocialPosts } from '@/lib/growth8Engine';

export const metadata = {
  title: 'Social Distribution Plan | Can I Bring It Now',
  description: 'Use Shorts, Reels, TikTok, Pinterest, Reddit and Quora carefully to send visitors to useful pages.',
  alternates: { canonical: '/social-distribution-plan/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/launch-control/" className="text-sm font-semibold text-brand-600">← Launch control</a>
          <GrowthHero eyebrow="Social Distribution Plan" title="Turn rules into traffic from social channels" description="Use Shorts, Reels, TikTok, Pinterest, Reddit and Quora carefully to send visitors to useful pages." />
          <GrowthGrid title="Social post ideas" eyebrow="Distribution" cards={getSocialPosts()} />
        </div>
      </section>
    </main>
  );
}
