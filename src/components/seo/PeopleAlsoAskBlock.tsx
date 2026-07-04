import { HelpCircle } from 'lucide-react';
import { getPeopleAlsoAsk } from '@/lib/g4SeoNetwork';

export default function PeopleAlsoAskBlock({ slug }: { slug?: string }) {
  const questions = getPeopleAlsoAsk(slug);

  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <HelpCircle className="h-6 w-6 text-brand-600" />
        <h2 className="text-2xl font-black text-slate-950">People also ask</h2>
      </div>

      <div className="mt-5 grid gap-3">
        {questions.map((item) => (
          <a
            key={item.question}
            href={item.href}
            className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-950 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700"
          >
            {item.question}
          </a>
        ))}
      </div>
    </section>
  );
}
