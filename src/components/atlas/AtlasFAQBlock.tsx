import { HelpCircle } from 'lucide-react';
import type { Rule } from '@/data/rules';
import { getAtlasFAQs, getAtlasPeopleAlsoAsk } from '@/lib/atlasSeoEngine';

export default function AtlasFAQBlock({ rule }: { rule: Rule }) {
  const faqs = getAtlasFAQs(rule);
  const questions = getAtlasPeopleAlsoAsk(rule);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <HelpCircle className="h-6 w-6 text-brand-600" />
        <div>
          <p className="font-bold text-brand-600">FAQ and People Also Ask</p>
          <h2 className="text-2xl font-black text-slate-950">Common questions about {rule.item}</h2>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {faqs.map((faq) => (
          <article key={faq.question} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <h3 className="font-black text-slate-950">{faq.question}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <p className="font-bold text-brand-600">People also ask</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {questions.map((question) => (
            <a key={question} href={`/search/?q=${encodeURIComponent(question)}`} className="rounded-full bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700">
              {question}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
