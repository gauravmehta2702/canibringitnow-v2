import Orbit4CardGrid from '@/components/orbit4/Orbit4CardGrid';
import Orbit4Hero from '@/components/orbit4/Orbit4Hero';
import { getInternalLinkPlan } from '@/lib/orbit4Engine';

export const metadata = {
  title: 'Internal Link Optimizer | Can I Bring It Now',
  description: 'Strong internal links turn isolated rule pages into a travel knowledge network.',
  alternates: { canonical: '/internal-link-optimizer/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-3/" className="text-sm font-semibold text-brand-600">← ORBIT Release 3</a>
          <Orbit4Hero eyebrow="Internal Link Optimizer" title="Make Google understand the whole site" description="Strong internal links turn isolated rule pages into a travel knowledge network." />
          <Orbit4CardGrid title="Internal link plan" eyebrow="Crawl and authority" cards={getInternalLinkPlan()} />
        </div>
      </section>
    </main>
  );
}
