import { TrendingUp } from 'lucide-react';
import GrowthProductBlock from '@/components/growth/GrowthProductBlock';
import GrowthActionBlock from '@/components/growth/GrowthActionBlock';
import AdReadyBlock from '@/components/growth/AdReadyBlock';

export const metadata = {
  title: 'Growth & Monetisation Engine | Can I Bring It Now',
  description: 'G10A growth, affiliate and ad-ready monetisation system for travel rule pages.',
  alternates: { canonical: '/growth-engine/' },
};

export default function GrowthEnginePage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>
          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-brand-600" />
              <p className="font-bold text-brand-600">G10A Growth system</p>
            </div>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Growth and monetisation engine</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">This module adds low-distraction product recommendations, growth CTAs and ad-ready placements designed for trust and future revenue.</p>
            <AdReadyBlock slot="top" />
            <GrowthProductBlock category="Batteries" />
            <GrowthActionBlock slug="power-bank-virgin-atlantic" />
            <AdReadyBlock slot="bottom" />
          </div>
        </div>
      </section>
    </main>
  );
}
