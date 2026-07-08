import AnalyticsStatusPanel from '@/components/analytics/AnalyticsStatusPanel';

export const metadata = {
  title: 'Analytics Setup | Can I Bring It Now',
  description: 'Analytics setup for Google Analytics 4, Google Search Console, Microsoft Clarity and site event tracking.',
  alternates: { canonical: '/analytics-setup/' },
};

const events = [
  'site_search',
  'tool_used',
  'trip_planner_used',
  'outbound_click',
  'affiliate_click',
  'rule_view',
  'country_hub_view',
  'airline_hub_view',
  'airport_hub_view',
  'knowledge_page_view',
];

export default function AnalyticsSetupPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/launch-control/" className="text-sm font-semibold text-brand-600">← Launch control</a>

          <section className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
            <p className="font-bold text-sky-300">Analytics Release 1</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">Measure before scaling further</h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              This release adds GA4, Search Console verification, Microsoft Clarity and a reusable event tracking framework.
            </p>
          </section>

          <AnalyticsStatusPanel />

          <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
            <p className="font-bold text-brand-600">Events prepared</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">What we can track next</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {events.map((event) => (
                <div key={event} className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-700 ring-1 ring-slate-200">
                  {event}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
            <p className="font-bold text-brand-600">Environment variables</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Add these in Cloudflare Pages</h2>
            <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">{`NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-code
NEXT_PUBLIC_CLARITY_PROJECT_ID=your-clarity-project-id
NEXT_PUBLIC_ENABLE_ANALYTICS=true`}</pre>
          </section>
        </div>
      </section>
    </main>
  );
}
