export const metadata = {
  title: 'About Can I Bring It Now | Can I Bring It Now',
  description: 'Learn what Can I Bring It Now does.',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to home</a>
          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">About Can I Bring It Now</h1>
          <p className="mt-4 leading-8 text-slate-600">Can I Bring It Now helps travellers quickly understand whether common items can be packed in cabin baggage, checked baggage, or may be restricted by airline, airport security or destination customs rules.</p>
          <p className="mt-4 leading-8 text-slate-600">Our goal is to make travel rules easier to understand in plain English. We focus on clear quick answers, practical warnings, related checks and reminders to verify important restrictions with official sources before travelling.</p>
          <p className="mt-4 leading-8 text-slate-600">The information on this website is for general guidance only and should not replace official airline, airport, government or customs advice.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
