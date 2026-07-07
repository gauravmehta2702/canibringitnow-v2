import { ArrowRight, HelpCircle, SearchCheck, ShieldCheck } from 'lucide-react';
import type { AtlasQuestionPage } from '@/lib/atlasQuestionEngine';
import { getQuestionFAQs, getQuestionRelatedLinks } from '@/lib/atlasQuestionEngine';
import AtlasDecisionBlock from '@/components/atlas/AtlasDecisionBlock';
import AtlasTravelTimeline from '@/components/atlas/AtlasTravelTimeline';

export default function AtlasQuestionPageView({ page }: { page: AtlasQuestionPage }) {
  const faqs = getQuestionFAQs(page);
  const related = getQuestionRelatedLinks(page);

  return (
    <div className="mt-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
        <div className="flex items-center gap-3">
          <SearchCheck className="h-8 w-8 text-brand-600" />
          <p className="font-bold text-brand-600">{page.context}</p>
        </div>

        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{page.question}</h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">{page.answer}</p>

        <div className="mt-6 rounded-3xl bg-slate-950 p-6 text-white">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-sky-300" />
            <p className="font-bold text-sky-300">Fast decision</p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
              <p className="text-sm text-slate-300">Cabin baggage</p>
              <p className="text-3xl font-black">{page.rule.cabin}</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
              <p className="text-sm text-slate-300">Checked baggage</p>
              <p className="text-3xl font-black">{page.rule.checked}</p>
            </div>
          </div>
        </div>

        <a href={`/rules/${page.rule.slug}/`} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-black text-white hover:bg-brand-700">
          Open full rule <ArrowRight className="h-4 w-4" />
        </a>
      </section>

      <AtlasDecisionBlock rule={page.rule} />
      <AtlasTravelTimeline rule={page.rule} />

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-brand-600" />
          <div>
            <p className="font-bold text-brand-600">FAQs</p>
            <h2 className="text-2xl font-black text-slate-950">Common related questions</h2>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <h3 className="font-black text-slate-950">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <p className="font-bold text-brand-600">Continue checking</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Related travel decisions</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {related.map((link) => (
            <a key={`${link.href}-${link.title}`} href={link.href} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200 hover:bg-brand-50">
              <p className="text-xs font-black uppercase tracking-wide text-brand-600">{link.label}</p>
              <p className="mt-1 font-black text-slate-950">{link.title}</p>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{link.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
