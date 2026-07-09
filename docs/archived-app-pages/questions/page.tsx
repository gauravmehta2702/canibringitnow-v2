import { getAtlasQuestionPages } from '@/lib/atlasQuestionEngine';

export const metadata = {
  title: 'Travel Rule Questions | Can I Bring It Now',
  description: 'Browse common travel rule questions about cabin baggage, checked baggage, airlines and destinations.',
  alternates: { canonical: '/questions/' },
};

export default function QuestionsIndexPage() {
  const pages = getAtlasQuestionPages().slice(0, 120);

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>

          <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <p className="font-bold text-brand-600">ATLAS question pages</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Common travel rule questions</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Browse question-led pages designed to answer travel searches quickly and connect travellers to deeper rule pages.
            </p>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {pages.map((page) => (
                <a key={page.slug} href={`/questions/${page.slug}/`} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
                  <p className="text-xs font-black uppercase tracking-wide text-brand-600">{page.context}</p>
                  <p className="mt-1 font-black text-slate-950">{page.question}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{page.answer}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
