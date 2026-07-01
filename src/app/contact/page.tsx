export const metadata = {
  title: 'Contact Can I Bring It Now | Can I Bring It Now',
  description: 'Contact Can I Bring It Now.',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to home</a>
          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Contact</h1>
          <p className="mt-4 leading-8 text-slate-600">If you notice a travel rule that needs updating, want to suggest a topic, or have a partnership enquiry, you can contact the Can I Bring It Now team.</p>
          <p className="mt-4 leading-8 text-slate-600">For now, please use this page as our contact placeholder. Before launch, we will add a dedicated contact email address.</p>
          <p className="mt-4 leading-8 text-slate-600">We welcome corrections and source suggestions because travel rules can change and accuracy matters.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
