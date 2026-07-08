import Orbit6Grid from '@/components/orbit6/Orbit6Grid';
import Orbit6Hero from '@/components/orbit6/Orbit6Hero';
import { getOrbit6Modules } from '@/lib/orbit6Engine';

export const metadata = {
  title: 'ORBIT Release 6 | Can I Bring It Now',
  description: 'A combined release for editorial calendar, page refresh queue, short videos, Pinterest pins, newsletter ideas, QA and manual-work reduction.',
  alternates: { canonical: '/orbit-release-6/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-5/" className="text-sm font-semibold text-brand-600">← ORBIT Release 5</a>
          <Orbit6Hero eyebrow="ORBIT Release 6" title="Content automation and publishing workflow" description="A combined release for editorial calendar, page refresh queue, short videos, Pinterest pins, newsletter ideas, QA and manual-work reduction." />
          <Orbit6Grid title="Release 6 modules" eyebrow="Automation" cards={getOrbit6Modules()} />
        </div>
      </section>
    </main>
  );
}
