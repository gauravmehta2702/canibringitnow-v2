import VisitorPathBlock from '@/components/public-tools/VisitorPathBlock';

export const metadata = {
  title: 'Start Here | Can I Bring It Now',
  description: 'Choose the fastest way to check travel rules by item, airline, destination, AI assistant or packing planner.',
  alternates: { canonical: '/start-here/' },
};

export default function StartHerePage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>

          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <p className="font-bold text-brand-600">Start here</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Find the right travel answer faster
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Use the best path depending on whether you know your item, airline, destination or full trip details.
            </p>
            <VisitorPathBlock />
          </div>
        </div>
      </section>
    </main>
  );
}
