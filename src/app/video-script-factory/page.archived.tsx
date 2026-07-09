import Orbit6Grid from '@/components/orbit6/Orbit6Grid';
import Orbit6Hero from '@/components/orbit6/Orbit6Hero';
import { getVideoScripts } from '@/lib/orbit6Engine';

export const metadata = {
  title: 'Video Script Factory | Can I Bring It Now',
  description: 'Use these scripts for YouTube Shorts, Instagram Reels and TikTok without paid marketing.',
  alternates: { canonical: '/video-script-factory/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-5/" className="text-sm font-semibold text-brand-600">← ORBIT Release 5</a>
          <Orbit6Hero eyebrow="Video Script Factory" title="Turn travel questions into short videos" description="Use these scripts for YouTube Shorts, Instagram Reels and TikTok without paid marketing." />
          <Orbit6Grid title="Short video scripts" eyebrow="Organic social" cards={getVideoScripts()} />
        </div>
      </section>
    </main>
  );
}
