export const metadata = {
  title: 'Privacy Policy | Can I Bring It Now',
  description: 'Privacy policy for Can I Bring It Now.',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-4xl px-5 py-12 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to home</a>
          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 leading-8 text-slate-600">Can I Bring It Now aims to keep privacy practices simple and transparent.</p>
          <p className="mt-4 leading-8 text-slate-600">We may use analytics tools to understand how visitors use the website, which pages are popular, and where improvements are needed. These tools may collect basic usage data such as page views, device type, approximate location and referring websites.</p>
          <p className="mt-4 leading-8 text-slate-600">We do not sell personal information. If we add email sign-up or account features in the future, this policy will be updated to explain how that information is used.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
