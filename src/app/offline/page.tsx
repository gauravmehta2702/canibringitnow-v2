import { Luggage } from 'lucide-react';

export const metadata = {
  title: 'Offline | Can I Bring It Now',
  description: 'Offline fallback page for Can I Bring It Now.',
};

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-brand-600 text-white">
            <Luggage className="h-8 w-8" />
          </div>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            You appear to be offline
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-600">
            Reconnect to search the latest travel rules. Some previously opened pages may still be available from your browser cache.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex rounded-2xl bg-brand-600 px-6 py-4 font-bold text-white hover:bg-brand-700"
          >
            Try homepage
          </a>
        </div>
      </section>
    </main>
  );
}
