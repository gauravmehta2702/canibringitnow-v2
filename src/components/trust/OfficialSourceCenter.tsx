import { BookOpenCheck, ShieldCheck } from 'lucide-react';
import { getOfficialSourceGroups, getTrustCopyBlocks } from '@/lib/v10TrustEngine';

export default function OfficialSourceCenter() {
  const groups = getOfficialSourceGroups();
  const copyBlocks = getTrustCopyBlocks();

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
            <BookOpenCheck className="h-6 w-6 text-sky-300" />
          </div>
          <div>
            <p className="font-bold text-sky-300">V10 Trust Engine</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">Official source center</h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              Can I Bring It Now should be fast and useful, but important travel decisions should still be verified with official sources.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <p className="font-bold text-brand-600">Source types</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">What travellers should verify</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {groups.map((group) => (
            <article key={group.title} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <p className="text-xs font-black uppercase tracking-wide text-brand-600">{group.label}</p>
              <h3 className="mt-1 font-black text-slate-950">{group.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{group.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.examples.map((example) => (
                  <span key={example} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
                    {example}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">Reusable trust copy</p>
            <h2 className="text-2xl font-black text-slate-950">Standard messages for future pages</h2>
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          {copyBlocks.map((block) => (
            <article key={block.title} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <h3 className="font-black text-slate-950">{block.title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{block.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
