import GrowthGrid from '@/components/growth8/GrowthGrid';
import GrowthHero from '@/components/growth8/GrowthHero';
import { getBacklinkProspects } from '@/lib/growth8Engine';

export const metadata = {
  title: 'Backlink Outreach Hub | Can I Bring It Now',
  description: 'Backlinks should come from genuinely useful checklists, guides and reference pages, not spam.',
  alternates: { canonical: '/backlink-outreach-hub/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/launch-control/" className="text-sm font-semibold text-brand-600">← Launch control</a>
          <GrowthHero eyebrow="Backlink Outreach Hub" title="Earn links with useful travel resources" description="Backlinks should come from genuinely useful checklists, guides and reference pages, not spam." />
          <GrowthGrid title="Outreach prospects" eyebrow="Backlinks" cards={getBacklinkProspects()} />
        </div>
      </section>
    </main>
  );
}
