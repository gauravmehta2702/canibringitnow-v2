export const metadata = {
  title: 'Terms of Use | Can I Bring It Now',
  description: 'Terms of use for Can I Bring It Now.',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to home</a>
          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Terms of Use</h1>
          <p className="mt-4 leading-8 text-slate-600">By using Can I Bring It Now, you agree that the website provides general travel guidance only.</p>
          <p className="mt-4 leading-8 text-slate-600">Travel rules can change and may vary by airline, airport, route, country, item type and security decision. Always confirm important restrictions with official airline, airport, government or customs sources before travel.</p>
          <p className="mt-4 leading-8 text-slate-600">We do not accept responsibility for decisions made by airlines, airport security, customs authorities or other officials.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
