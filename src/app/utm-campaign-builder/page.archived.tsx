import GrowthHero from '@/components/growth8/GrowthHero';
import UtmBuilder from '@/components/growth8/UtmBuilder';

export const metadata = {
  title: 'UTM Campaign Builder | Can I Bring It Now',
  description: 'Build trackable UTM links for YouTube Shorts, TikTok, Pinterest, Reddit, Quora and newsletters.',
  alternates: { canonical: '/utm-campaign-builder/' },
};

export default function UtmCampaignBuilderPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/growth-command-centre/" className="text-sm font-semibold text-brand-600">← Growth command centre</a>
          <GrowthHero eyebrow="UTM Campaign Builder" title="Track every marketing link" description="Use UTM links so Cloudflare and GA4 can show which Shorts, Reels, Pins, posts and emails bring visitors." />
          <UtmBuilder />
        </div>
      </section>
    </main>
  );
}
