import InternalLinkBlock from '@/components/seo/InternalLinkBlock';
import TopicClusterBlock from '@/components/seo/TopicClusterBlock';
import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Info,
  PackageCheck,
  Search,
  ShieldCheck,
  Star,
  XCircle,
} from 'lucide-react';
import { rules, type RuleStatus } from '@/data/rules';
import RevenueRecommendationBlock from '@/components/growth/RevenueRecommendationBlock';
import SeoAuthorityLayer from '@/components/seo/SeoAuthorityLayer';
import {
  buildRuleJsonLd,
  getConfidenceLabel,
  getDecisionScore,
  getMonthYear,
  getPeopleAlsoSearch,
  getRelatedRules,
  getRiskLevel,
  getSourceChecks,
  slugify,
} from '@/lib/ruleInsights';

export function generateStaticParams() {
  return rules.map((rule) => ({ slug: rule.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const rule = rules.find((r) => r.slug === params.slug);

  if (!rule) return { title: 'Travel rule not found | Can I Bring It Now' };

  return {
    title: `${rule.item}: Cabin & Checked Baggage Rules | Can I Bring It Now`,
    description: `${rule.shortAnswer} Check cabin baggage, checked baggage, restrictions and tips before you fly.`,
    alternates: {
      canonical: `/rules/${rule.slug}/`,
    },
    openGraph: {
      title: `${rule.item} | Can I Bring It Now`,
      description: rule.shortAnswer,
      url: `https://canibringitnow.com/rules/${rule.slug}/`,
      type: 'article',
    },
  };
}

function StatusIcon({ status }: { status: RuleStatus }) {
  if (status === 'Allowed') return <CheckCircle2 className="h-7 w-7 text-green-700" />;
  if (status === 'Not allowed') return <XCircle className="h-7 w-7 text-red-700" />;
  return <AlertTriangle className="h-7 w-7 text-amber-700" />;
}

function statusClass(status: RuleStatus) {
  if (status === 'Allowed') return 'bg-green-50 ring-green-100 text-green-950';
  if (status === 'Not allowed') return 'bg-red-50 ring-red-100 text-red-950';
  return 'bg-amber-50 ring-amber-100 text-amber-950';
}

function riskClass(risk: string) {
  if (risk === 'High') return 'bg-red-50 text-red-900 ring-red-100';
  if (risk === 'Medium') return 'bg-amber-50 text-amber-900 ring-amber-100';
  return 'bg-green-50 text-green-900 ring-green-100';
}

export default function RulePage({ params }: { params: { slug: string } }) {
  const rule = rules.find((r) => r.slug === params.slug);
  if (!rule) notFound();

  const score = getDecisionScore(rule);
  const risk = getRiskLevel(rule);
  const confidence = getConfidenceLabel(score);
  const relatedRules = getRelatedRules(rule, 6);
  const peopleAlsoSearch = getPeopleAlsoSearch(rule);
  const sources = getSourceChecks(rule);
  const jsonLd = buildRuleJsonLd(rule);

  return (
    <main className="min-h-screen bg-slate-50 pb-24 md:pb-0">
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600" aria-label="Breadcrumb">
            <a href="/" className="inline-flex items-center gap-1 text-brand-600">
              <ArrowLeft className="h-4 w-4" /> Home
            </a>
            <span>/</span>
            <a href={`/categories/${slugify(rule.category)}/`} className="text-brand-600">{rule.category}</a>
            <span>/</span>
            <span>{rule.item}</span>
          </nav>

          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <p className="font-semibold text-brand-600">{rule.category}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{rule.item}</h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">{rule.shortAnswer}</p>

            <div className="mt-8 rounded-[2rem] bg-slate-950 p-6 text-white md:p-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-sky-200">
                    <ShieldCheck className="h-4 w-4" /> Travel Decision Summary
                  </div>
                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-5xl font-black tracking-tight md:text-6xl">{score}</span>
                    <span className="pb-2 text-xl font-bold text-slate-300">/100</span>
                  </div>
                  <p className="mt-2 text-slate-300">{confidence} · Last reviewed {getMonthYear(rule.updated)}</p>
                </div>

                <div className={`w-fit rounded-2xl px-5 py-3 text-sm font-black ring-1 ${riskClass(risk)}`}>
                  Risk level: {risk}
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className={`rounded-3xl p-6 ring-1 ${statusClass(rule.cabin)}`}>
                  <div className="flex items-center gap-4">
                    <StatusIcon status={rule.cabin} />
                    <div>
                      <p className="text-sm font-black uppercase tracking-wide opacity-70">Cabin baggage</p>
                      <h2 className="text-2xl font-black">{rule.cabin}</h2>
                    </div>
                  </div>
                </div>

                <div className={`rounded-3xl p-6 ring-1 ${statusClass(rule.checked)}`}>
                  <div className="flex items-center gap-4">
                    <StatusIcon status={rule.checked} />
                    <div>
                      <p className="text-sm font-black uppercase tracking-wide opacity-70">Checked baggage</p>
                      <h2 className="text-2xl font-black">{rule.checked}</h2>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-slate-300">
                <Star className="mt-0.5 h-4 w-4 shrink-0 text-yellow-300" />
                Use this as a fast travel decision summary, then verify important restrictions with your airline, airport or destination customs authority.
              </p>
            </div>

            {rule.warning && (
              <div className="mt-6 rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-100">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-6 w-6 shrink-0 text-amber-700" />
                  <div>
                    <h2 className="text-xl font-bold text-amber-950">Important warning</h2>
                    <p className="mt-2 leading-7 text-amber-800">{rule.warning}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <Info className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">Restrictions to check</h2>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
                  {rule.restrictions.map((restriction) => <li key={restriction}>{restriction}</li>)}
                </ul>
              </div>

              <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <PackageCheck className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">Before you travel</h2>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
                  {rule.tips.map((tip) => <li key={tip}>{tip}</li>)}
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <ExternalLink className="h-6 w-6 text-brand-600" />
                <h2 className="text-xl font-bold text-slate-950">Official sources to check</h2>
              </div>
              <p className="mt-3 leading-7 text-slate-600">Travel rules can change. Before you fly, confirm important restrictions with official sources.</p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {sources.map((source) => (
                  <div key={source.title} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="font-bold text-slate-950">{source.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{source.description}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-500">{rule.sourceNote}</p>
            </div>

            <div className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-brand-600" />
                <h2 className="text-xl font-bold text-slate-950">Frequently asked questions</h2>
              </div>
              <div className="mt-5 space-y-5">
                <div>
                  <h3 className="font-bold text-slate-950">Can I bring {rule.item}?</h3>
                  <p className="mt-1 leading-7 text-slate-600">{rule.shortAnswer}</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">Can airport security still stop this item?</h3>
                  <p className="mt-1 leading-7 text-slate-600">Yes. Security officers and airline staff can make the final decision at the airport.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">Should I check official sources before flying?</h3>
                  <p className="mt-1 leading-7 text-slate-600">Yes. This site simplifies guidance, but you should confirm important restrictions with official airline, airport or customs sources.</p>
                </div>
              </div>
            </div>

            <RevenueRecommendationBlock rule={rule} source="rule-page" />

            <SeoAuthorityLayer slug={rule.slug} item={rule.item} />
<TopicClusterBlock slug={rule.slug} item={rule.item} />
            {peopleAlsoSearch.length > 0 && (
              <div className="mt-8 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <Search className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">People also search</h2>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {peopleAlsoSearch.map((term) => (
                    <a key={term} href={`/search/?q=${encodeURIComponent(term)}`} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700">{term}</a>
                  ))}
                </div>
              </div>
            )}

            {relatedRules.length > 0 && (
              <div className="mt-8">
                <p className="font-semibold text-brand-600">Related checks</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">You may also need to know</h2>
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {relatedRules.map((related) => (
                    <a key={related.slug} href={`/rules/${related.slug}/`} className="rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand-500 hover:bg-brand-50">
                      <p className="font-bold text-slate-950">{related.item}</p>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{related.shortAnswer}</p>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">View related rule <ArrowRight className="h-4 w-4" /></span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              Last reviewed: {getMonthYear(rule.updated)}
            </div>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-2xl backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <a href="/" className="flex-1 rounded-2xl bg-brand-600 px-4 py-3 text-center text-sm font-bold text-white">Search another item</a>
          <a href="/check/" className="flex-1 rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-bold text-slate-800">Open Matrix</a>
        </div>
      </div>
    <InternalLinkBlock slug={rule.slug} />
    </main>
  );
}