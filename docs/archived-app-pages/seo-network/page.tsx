import { Network, Search } from 'lucide-react';
import PeopleAlsoAskBlock from '@/components/seo/PeopleAlsoAskBlock';
import RelatedRulesBlock from '@/components/seo/RelatedRulesBlock';
import SeoNetworkBlock from '@/components/seo/SeoNetworkBlock';

export const metadata = {
  title: 'Travel Rules SEO Network | Can I Bring It Now',
  description:
    'Explore related travel checks, popular questions, airline guides and destination rules before you fly.',
  alternates: {
    canonical: '/seo-network/',
  },
};

export default function SeoNetworkPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>

          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <div className="flex items-center gap-3">
              <Network className="h-8 w-8 text-brand-600" />
              <p className="font-bold text-brand-600">G4 SEO Network</p>
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Find related travel rules faster
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              This page connects common travel questions, rule pages, airline guides and destination guides to improve navigation and search visibility.
            </p>

            <a
              href="/search/?q=power%20bank%20on%20Emirates"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-black text-white hover:bg-brand-700"
            >
              <Search className="h-5 w-5" />
              Try a smart travel search
            </a>

            <PeopleAlsoAskBlock />
            <RelatedRulesBlock />
            <SeoNetworkBlock />
          </div>
        </div>
      </section>
    </main>
  );
}
