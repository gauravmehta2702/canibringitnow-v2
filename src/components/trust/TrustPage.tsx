import type { ReactNode } from 'react';

type Section = { title: string; body: ReactNode };

type Props = {
  eyebrow?: string;
  title: string;
  description: string;
  updated?: string;
  sections: Section[];
};

export default function TrustPage({ eyebrow = 'Trust Centre', title, description, updated = '10 July 2026', sections }: Props) {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
          <a href="/" className="text-sm font-bold text-brand-600">← Back to home</a>
          <div className="mt-8 rounded-[2rem] bg-white p-7 shadow-soft ring-1 ring-slate-200 md:p-10">
            <p className="text-sm font-black uppercase tracking-wide text-brand-600">{eyebrow}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">{title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
            <p className="mt-4 text-sm font-semibold text-slate-500">Last updated: {updated}</p>
            <div className="mt-10 space-y-9">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-black text-slate-950">{section.title}</h2>
                  <div className="mt-3 space-y-3 leading-8 text-slate-600">{section.body}</div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
