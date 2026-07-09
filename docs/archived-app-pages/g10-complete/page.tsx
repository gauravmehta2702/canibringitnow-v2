import { Sparkles } from 'lucide-react';
import G10CompleteBlock from '@/components/growth/G10CompleteBlock';

export const metadata = {
  title: 'G10 Complete Growth Engine | Can I Bring It Now',
  description: 'Complete growth, monetisation, analytics and SEO automation layer for Can I Bring It Now.',
  alternates: { canonical: '/g10-complete/' },
};

export default function G10CompletePage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-brand-600" />
              <p className="font-bold text-brand-600">G10 Final module</p>
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Complete growth engine</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Combined traffic, revenue, SEO automation and analytics foundation for the site.</p>
            <G10CompleteBlock ruleSlug="power-bank-virgin-atlantic" category="Batteries" />
          </div>
        </div>
      </section>
    </main>
  );
}
