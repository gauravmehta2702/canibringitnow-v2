export const metadata = {
  title: 'Travel Rules Disclaimer | Can I Bring It Now',
  description: 'Travel rules disclaimer for Can I Bring It Now.',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to home</a>
          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Travel Rules Disclaimer</h1>
          <p className="mt-4 leading-8 text-slate-600">Can I Bring It Now simplifies travel rules to help users prepare for trips, but it is not an official airline, airport, government or customs authority.</p>
          <p className="mt-4 leading-8 text-slate-600">The information on this site may not always reflect the latest rule changes. Always verify important restrictions with official sources before packing or travelling.</p>
          <p className="mt-4 leading-8 text-slate-600">Final decisions at the airport may be made by security officers, airline staff, customs officers or other authorities.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
