import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { analyticsConfig } from '@/lib/analyticsConfig';

const checks = [
  {
    title: 'Google Analytics 4',
    active: Boolean(analyticsConfig.ga4MeasurementId),
    description: 'Tracks users, page views, countries, engagement and events.',
    env: 'NEXT_PUBLIC_GA4_MEASUREMENT_ID',
  },
  {
    title: 'Google Search Console',
    active: Boolean(analyticsConfig.googleSiteVerification),
    description: 'Verifies ownership so you can submit sitemaps and monitor indexing.',
    env: 'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION',
  },
  {
    title: 'Microsoft Clarity',
    active: Boolean(analyticsConfig.clarityProjectId),
    description: 'Free heatmaps and session recordings to understand how visitors use pages.',
    env: 'NEXT_PUBLIC_CLARITY_PROJECT_ID',
  },
  {
    title: 'Analytics enabled',
    active: analyticsConfig.enableAnalytics,
    description: 'Controls whether analytics scripts should load.',
    env: 'NEXT_PUBLIC_ENABLE_ANALYTICS=true',
  },
];

export default function AnalyticsStatusPanel() {
  return (
    <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
      <p className="font-bold text-brand-600">Analytics status</p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">Tracking setup checklist</h2>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {checks.map((check) => (
          <article key={check.title} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <div className="flex items-start gap-3">
              {check.active ? (
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
              ) : (
                <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber-600" />
              )}
              <div>
                <p className="font-black text-slate-950">{check.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{check.description}</p>
                <p className="mt-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-slate-500 ring-1 ring-slate-200">
                  {check.active ? 'Configured' : `Add ${check.env}`}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
