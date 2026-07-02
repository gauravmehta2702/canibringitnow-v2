import { HelpCircle } from 'lucide-react';

export default function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
      <div className="flex items-center gap-3">
        <HelpCircle className="h-6 w-6 text-brand-600" />
        <h2 className="text-xl font-bold text-slate-950">Frequently asked questions</h2>
      </div>
      <div className="mt-5 divide-y divide-slate-200">
        {faqs.map((faq) => (
          <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
            <h3 className="font-bold text-slate-950">{faq.question}</h3>
            <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
