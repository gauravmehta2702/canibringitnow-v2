import GrowthHero from '@/components/growth8/GrowthHero';
import RevenueScoreGrid from '@/components/growth8/RevenueScoreGrid';

export const metadata = {
  title: 'Revenue Readiness Score | Can I Bring It Now',
  description: 'Check whether the site is ready for AdSense and affiliate monetisation.',
  alternates: { canonical: '/revenue-readiness-score/' },
};

export default function RevenueReadinessScorePage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/growth-command-centre/" className="text-sm font-semibold text-brand-600">← Growth command centre</a>
          <GrowthHero eyebrow="Revenue Readiness Score" title="Do not monetise too early" description="Traffic and trust come first. Use this score to decide when AdSense and affiliate links should be pushed harder." />
          <RevenueScoreGrid />
        </div>
      </section>
    </main>
  );
}
