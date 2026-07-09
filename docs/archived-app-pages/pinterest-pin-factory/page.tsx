import Orbit6Grid from '@/components/orbit6/Orbit6Grid';
import Orbit6Hero from '@/components/orbit6/Orbit6Hero';
import { getPinterestPins } from '@/lib/orbit6Engine';

export const metadata = {
  title: 'Pinterest Pin Factory | Can I Bring It Now',
  description: 'Pinterest can work well for packing, checklists, family travel and airport security visuals.',
  alternates: { canonical: '/pinterest-pin-factory/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-5/" className="text-sm font-semibold text-brand-600">← ORBIT Release 5</a>
          <Orbit6Hero eyebrow="Pinterest Pin Factory" title="Create evergreen travel pins" description="Pinterest can work well for packing, checklists, family travel and airport security visuals." />
          <Orbit6Grid title="Pinterest pin ideas" eyebrow="Visual traffic" cards={getPinterestPins()} />
        </div>
      </section>
    </main>
  );
}
