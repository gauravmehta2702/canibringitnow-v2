import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  HelpCircle,
  Info,
  Landmark,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  XCircle,
} from 'lucide-react';
import { rules, type RuleStatus } from '@/data/rules';
import {
  buildRuleJsonLd,
  getAiRelatedQuestions,
  getAirlineInsights,
  getConfidenceLabel,
  getCustomsDecision,
  getDecisionChecklist,
  getDecisionScore,
  getDestinationInsights,
  getExpandedFaqs,
  getMonthYear,
  getOverallDecision,
  getPeopleAlsoSearch,
  getProductRecommendations,
  getRelatedRules,
  getRiskLevel,
  getSecurityDecision,
  getSourceChecks,
  getWhyExplanation,
  slugify,
} from '@/lib/ruleInsights';

export function generateStaticParams() {
  return rules.map((rule) => ({ slug: rule.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const rule = rules.find((r) => r.slug === params.slug);

  if (!rule) return { title: 'Travel rule not found | Can I Bring It Now' };

  return {
    title: `${rule.item}: Cabin, Checked Baggage & Customs Rules | Can I Bring It Now`,
    description: `${rule.shortAnswer} Check cabin baggage, checked baggage, customs, restrictions, sources and travel tips before you fly.`,
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

function customsClass(tone: 'green' | 'amber') {
  return tone === 'green' ? 'bg-green-50 text-green-950 ring-green-100' : 'bg-amber-50 text-amber-950 ring-amber-100';
}

export default function RulePage({ params }: { params: { slug: string } }) {
  const rule = rules.find((r) => r.slug === params.slug);
  if (!rule) notFound();

  const score = getDecisionScore(rule);
  const risk = getRiskLevel(rule);
  const confidence = getConfidenceLabel(score);
  const relatedRules = getRelatedRules(rule, 6);
  const peopleAlsoSearch = getPeopleAlsoSearch(rule);
  const aiQuestions = getAiRelatedQuestions(rule);
  const sources = getSourceChecks(rule);
  const products = getProductRecommendations(rule);
  const jsonLd = buildRuleJsonLd(rule);
  const overallDecision = getOverallDecision(rule);
  const customs = getCustomsDecision(rule);
  const why = getWhyExplanation(rule);
  const checklist = getDecisionChecklist(rule);
  const destination = getDestinationInsights(rule);
  const airline = getAirlineInsights(rule);
  const faqs = getExpandedFaqs(rule);
  const securityDecision = getSecurityDecision(rule);

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

            <div className="mt-8 overflow-hidden rounded-[2rem] bg-slate-950 text-white">
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-sky-200">
                      <ShieldCheck className="h-4 w-4" /> Travel Decision Engine
                    </div>
                    <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-tight md:text-5xl">{overallDecision}</h2>
                    <p className="mt-3 max-w-3xl text-slate-300">Fast answer based on cabin baggage, checked baggage, customs risk and travel screening.</p>
                  </div>

                  <div className={`w-fit rounded-2xl px-5 py-3 text-sm font-black ring-1 ${riskClass(risk)}`}>
                    Risk level: {risk}
                  </div>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-4">
                  <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-400">Decision score</p>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-4xl font-black tracking-tight">{score}</span>
                      <span className="pb-1 text-lg font-bold text-slate-300">/100</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{confidence}</p>
                  </div>

                  <div className={`rounded-3xl p-5 ring-1 ${statusClass(rule.cabin)}`}>
                    <div className="flex items-center gap-3">
                      <StatusIcon status={rule.cabin} />
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide opacity-70">Cabin</p>
                        <p className="text-xl font-black">{rule.cabin}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`rounded-3xl p-5 ring-1 ${statusClass(rule.checked)}`}>
                    <div className="flex items-center gap-3">
                      <StatusIcon status={rule.checked} />
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide opacity-70">Checked bag</p>
                        <p className="text-xl font-black">{rule.checked}</p>
                      </div>
                    </div>
                  </div>

                  <div className={`rounded-3xl p-5 ring-1 ${customsClass(customs.tone)}`}>
                    <p className="text-xs font-black uppercase tracking-wide opacity-70">Customs</p>
                    <p className="mt-2 text-lg font-black">{customs.status}</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-400">Security</p>
                    <p className="mt-1 font-bold text-white">{securityDecision}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-400">Last reviewed</p>
                    <p className="mt-1 font-bold text-white">{getMonthYear(rule.updated)}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                    <p className="text-xs font-black uppercase tracking-wide text-slate-400">Official check</p>
                    <p className="mt-1 font-bold text-white">Recommended before flying</p>
                  </div>
                </div>

                <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-slate-300">
                  <Star className="mt-0.5 h-4 w-4 shrink-0 text-yellow-300" />
                  Use this as a fast travel decision summary, then verify important restrictions with your airline, airport or destination customs authority.
                </p>
              </div>
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
              <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">Why this is the decision</h2>
                </div>
                <ul className="mt-4 space-y-3 leading-7 text-slate-600">
                  {why.map((point) => (
                    <li key={point} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brand-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <ClipboardCheck className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">What you should do</h2>
                </div>
                <ul className="mt-4 space-y-3 leading-7 text-slate-600">
                  {checklist.map((tip) => (
                    <li key={tip} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <Plane className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">{airline.label} baggage view</h2>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className={`rounded-2xl p-4 ring-1 ${statusClass(airline.cabin)}`}>
                    <p className="text-xs font-black uppercase opacity-70">Cabin</p>
                    <p className="mt-1 text-lg font-black">{airline.cabin}</p>
                  </div>
                  <div className={`rounded-2xl p-4 ring-1 ${statusClass(airline.checked)}`}>
                    <p className="text-xs font-black uppercase opacity-70">Checked</p>
                    <p className="mt-1 text-lg font-black">{airline.checked}</p>
                  </div>
                </div>
                <p className="mt-4 leading-7 text-slate-600">{airline.note}</p>
                <p className="mt-2 text-sm font-semibold text-slate-500">Airline approval: {airline.approval}</p>
              </div>

              <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <Landmark className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">{destination.label} customs view</h2>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                    <p className="text-xs font-black uppercase text-slate-500">Declaration</p>
                    <p className="mt-1 font-bold text-slate-950">{destination.declaration}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                    <p className="text-xs font-black uppercase text-slate-500">Inspection</p>
                    <p className="mt-1 font-bold text-slate-950">{destination.inspection}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                    <p className="text-xs font-black uppercase text-slate-500">Permit</p>
                    <p className="mt-1 font-bold text-slate-950">{destination.permit}</p>
                  </div>
                </div>
                <p className="mt-4 leading-7 text-slate-600">{destination.note}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <Info className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">Restrictions to check</h2>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
                  {rule.restrictions.map((restriction) => <li key={restriction}>{restriction}</li>)}
                </ul>
              </div>

              <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">Official sources to check</h2>
                </div>
                <p className="mt-3 leading-7 text-slate-600">Travel rules can change. Before you fly, confirm important restrictions with official sources.</p>
                <div className="mt-5 grid gap-3">
                  {sources.map((source) => (
                    <div key={source.title} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                      <p className="font-bold text-slate-950">{source.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{source.description}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-500">{rule.sourceNote}</p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-brand-600" />
                <h2 className="text-xl font-bold text-slate-950">Frequently asked questions</h2>
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                    <h3 className="font-bold text-slate-950">{faq.question}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-gradient-to-br from-white to-brand-50 p-6 ring-1 ring-slate-200">
              <p className="font-semibold text-brand-600">Travel essentials</p>
              <h2 className="mt-2 text-xl font-bold text-slate-950">Useful products to consider later</h2>
              <p className="mt-2 leading-7 text-slate-600">These are placeholder recommendation slots for future affiliate revenue. Add products only when they genuinely help travellers.</p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {products.map((product) => (
                  <div key={product} className="rounded-2xl bg-white p-4 font-semibold text-slate-800 ring-1 ring-slate-200">{product}</div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <Search className="h-6 w-6 text-brand-600" />
                <h2 className="text-xl font-bold text-slate-950">AI-ready related questions</h2>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {aiQuestions.map((term) => (
                  <a key={term} href={`/search/?q=${encodeURIComponent(term)}`} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700">{term}</a>
                ))}
              </div>
            </div>

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
          <a href="/ask/" className="flex-1 rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-bold text-slate-800">Ask AI-ready</a>
        </div>
      </div>
    </main>
  );
}
