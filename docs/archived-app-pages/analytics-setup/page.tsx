import { analyticsConfig, analyticsEvents } from '@/lib/analyticsConfig';

export const metadata = {
  title: 'Analytics Setup | Can I Bring It Now',
  description: 'Analytics setup for Google Analytics 4, Google Search Console, Microsoft Clarity and site events.',
  alternates: { canonical: '/analytics-setup/' },
};

const envVars = [
  {
    name: 'NEXT_PUBLIC_GA4_MEASUREMENT_ID',
    example: 'G-XXXXXXXXXX',
    status: analyticsConfig.ga4MeasurementId ? 'Configured' : 'Missing',
    purpose: 'Google Analytics 4 measurement ID',
  },
  {
    name: 'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION',
    example: 'google-site-verification-code',
    status: analyticsConfig.googleSiteVerification ? 'Configured' : 'Missing',
    purpose: 'Google Search Console verification code',
  },
  {
    name: 'NEXT_PUBLIC_CLARITY_PROJECT_ID',
    example: 'clarity-project-id',
    status: analyticsConfig.clarityProjectId ? 'Configured' : 'Missing',
    purpose: 'Microsoft Clarity heatmaps and recordings',
  },
  {
    name: 'NEXT_PUBLIC_ENABLE_ANALYTICS',
    example: 'true',
    status: analyticsConfig.enableAnalytics ? 'Enabled' : 'Disabled',
    purpose: 'Controls analytics script loading',
  },
];

export default function AnalyticsSetupPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>

          <section className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
            <p className="font-bold text-sky-300">Analytics Fix Release</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight md:text-6xl">Analytics setup</h1>
            <p className="mt-4 max-w-3xl leading-8 text-slate-300">
              Use this page to confirm GA4, Google Search Console, Microsoft Clarity and event tracking variables are ready.
            </p>
          </section>

          <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
            <p className="font-bold text-brand-600">Cloudflare environment variables</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Tracking status</h2>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {envVars.map((item) => (
                <article key={item.name} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                  <p className="text-xs font-black uppercase tracking-wide text-brand-600">{item.status}</p>
                  <p className="mt-1 font-black text-slate-950">{item.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.purpose}</p>
                  <code className="mt-3 block rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-500 ring-1 ring-slate-200">
                    {item.example}
                  </code>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
            <p className="font-bold text-brand-600">Events prepared</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Track these actions next</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {analyticsEvents.map((event) => (
                <div key={event} className="rounded-2xl bg-slate-50 p-4 font-bold text-slate-700 ring-1 ring-slate-200">
                  {event}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
            <p className="font-bold text-brand-600">Next manual step</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Add AnalyticsProvider to layout</h2>
            <p className="mt-3 leading-7 text-slate-600">
              To load analytics scripts site-wide, add the provider to your root layout.
            </p>
            <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">{`import AnalyticsProvider from '@/components/analytics/AnalyticsProvider';

<body>
  <AnalyticsProvider />
  {children}
</body>`}</pre>
          </section>
        </div>
      </section>
    </main>
  );
}
