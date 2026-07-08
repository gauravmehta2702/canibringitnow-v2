import Orbit6Grid from '@/components/orbit6/Orbit6Grid';
import Orbit6Hero from '@/components/orbit6/Orbit6Hero';
import { getContentQAChecklist } from '@/lib/orbit6Engine';

export const metadata = {
  title: 'Content QA Checklist | Can I Bring It Now',
  description: 'Every travel page should be clear, helpful, easy to scan and honest about official-source verification.',
  alternates: { canonical: '/content-qa-checklist/' },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/orbit-release-5/" className="text-sm font-semibold text-brand-600">← ORBIT Release 5</a>
          <Orbit6Hero eyebrow="Content QA Checklist" title="Keep AI-assisted content useful and trustworthy" description="Every travel page should be clear, helpful, easy to scan and honest about official-source verification." />
          <Orbit6Grid title="Quality checks" eyebrow="Quality" cards={getContentQAChecklist()} />
        </div>
      </section>
    </main>
  );
}
