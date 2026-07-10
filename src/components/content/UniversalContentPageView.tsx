import { ArrowLeft, ArrowRight, CalendarCheck, CheckCircle2, ExternalLink, Info, Link2, PackageCheck, ShieldCheck } from 'lucide-react';
import { buildBreadcrumbJsonLd, buildCollectionJsonLd, getRelatedContent, type UniversalContentPage } from '@/lib/contentEngine';
import type { RuleStatus } from '@/data/rules';
import SmartInternalLinks from '@/components/seo/SmartInternalLinks';
import { getRelatedHubLinks } from '@/lib/relatedContentEngine';

function statusClass(status: RuleStatus) {
  if (status === 'Allowed') return 'bg-green-50 text-green-900 ring-green-100';
  if (status === 'Restricted') return 'bg-amber-50 text-amber-900 ring-amber-100';
  return 'bg-red-50 text-red-900 ring-red-100';
}

function readableDate(value: string) {
  return new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(new Date(value));
}

export default function UniversalContentPageView({ page }: { page: UniversalContentPage }) {
  const featuredRule = page.rules[0];
  const relatedRules = getRelatedContent(page, 6);
  const relatedHubs = getRelatedHubLinks(page, 9);
  const jsonLd = [buildBreadcrumbJsonLd(page), buildCollectionJsonLd(page)];

  return (
    <main className="min-h-screen bg-slate-50">
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600" aria-label="Breadcrumb">
            {page.breadcrumbs.map((breadcrumb, index) => (
              <span key={breadcrumb.href} className="inline-flex items-center gap-2">
                {index > 0 && <span className="text-slate-300">/</span>}
                {index === page.breadcrumbs.length - 1 ? (
                  <span className="text-slate-800">{breadcrumb.label}</span>
                ) : (
                  <a href={breadcrumb.href} className="text-brand-600 hover:text-brand-700">
                    {index === 0 ? 'Home' : breadcrumb.label}
                  </a>
                )}
              </span>
            ))}
          </nav>

          <a href={page.parentHref} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            <ArrowLeft className="h-4 w-4" /> Back to {page.parentLabel.toLowerCase()}
          </a>

          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <p className="font-semibold text-brand-600">{page.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{page.title}</h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">{page.description}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {page.quickPoints.map((point) => (
                <div key={point.title} className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
                  <CheckCircle2 className="h-6 w-6 text-brand-600" />
                  <h2 className="mt-3 text-lg font-black text-slate-950">{point.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{point.body}</p>
                </div>
              ))}
            </div>
          </div>

          {featuredRule && (
            <div className="mt-8 rounded-3xl bg-slate-950 p-8 text-white">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-sky-200">
                    <ShieldCheck className="h-4 w-4" /> Fast travel decision
                  </div>
                  <h2 className="mt-5 text-2xl font-black md:text-3xl">{featuredRule.item}</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-slate-300">{featuredRule.shortAnswer}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 text-sm font-bold text-slate-200 ring-1 ring-white/10">
                  {page.rules.length} linked rule{page.rules.length === 1 ? '' : 's'}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                  <p className="text-sm font-bold uppercase text-slate-300">Cabin baggage</p>
                  <p className="mt-1 text-2xl font-black">{featuredRule.cabin}</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                  <p className="text-sm font-bold uppercase text-slate-300">Checked baggage</p>
                  <p className="mt-1 text-2xl font-black">{featuredRule.checked}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 md:col-span-2">
              <div className="flex items-center gap-3">
                <PackageCheck className="h-6 w-6 text-brand-600" />
                <h2 className="text-2xl font-black text-slate-950">Useful checks</h2>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {page.rules.slice(0, 12).map((rule) => (
                  <a key={rule.slug} href={`/rules/${rule.slug}/`} className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:bg-white hover:shadow-soft">
                    <p className="text-sm font-semibold text-brand-600">{rule.category}</p>
                    <h3 className="mt-2 text-xl font-black text-slate-950">{rule.item}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className={`rounded-2xl p-3 ring-1 ${statusClass(rule.cabin)}`}>
                        <p className="text-xs font-bold uppercase opacity-70">Cabin</p>
                        <p className="font-black">{rule.cabin}</p>
                      </div>
                      <div className={`rounded-2xl p-3 ring-1 ${statusClass(rule.checked)}`}>
                        <p className="text-xs font-bold uppercase opacity-70">Checked</p>
                        <p className="font-black">{rule.checked}</p>
                      </div>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                      Read rule <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <CalendarCheck className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-black text-slate-950">Trust note</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Last reviewed {readableDate(page.updated)}. Travel rules can change, so confirm important items with your airline, departure airport and destination authority.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <Info className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-black text-slate-950">Topics covered</h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {page.tags.slice(0, 12).map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100">
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-6 w-6 text-brand-700" />
                  <h2 className="text-xl font-black text-slate-950">Before you fly</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Use this guide for planning, then check official airline, airport security and customs guidance before travel.
                </p>
              </div>
            </aside>
          </div>

          <SmartInternalLinks
            title="Continue exploring this topic"
            eyebrow="Connected travel hubs"
            links={relatedHubs}
          />

          {relatedRules.length > 0 && (
            <div className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200 md:p-8">
              <div className="flex items-center gap-3">
                <Link2 className="h-6 w-6 text-brand-600" />
                <h2 className="text-2xl font-black text-slate-950">Related travel checks</h2>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {relatedRules.map((rule) => (
                  <a key={rule.slug} href={`/rules/${rule.slug}/`} className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200 transition hover:bg-white hover:shadow-soft">
                    <p className="text-sm font-semibold text-brand-600">{rule.category}</p>
                    <h3 className="mt-2 font-black text-slate-950">{rule.item}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
