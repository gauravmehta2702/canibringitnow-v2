import type { Metadata } from 'next';
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
  Link2,
  ShieldCheck,
  Sparkles,
  Star,
  XCircle,
} from 'lucide-react';
import { rules, type Rule } from '@/data/rules';

const siteUrl = 'https://canibringitnow.com';

export function generateStaticParams() {
  return rules.map((rule) => ({
    slug: rule.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const rule = rules.find((r) => r.slug === params.slug);

  if (!rule) {
    return {
      title: 'Travel rule not found | Can I Bring It Now',
    };
  }

  return {
    title: `${rule.item}: Cabin & Checked Baggage Rules | Can I Bring It Now`,
    description: rule.shortAnswer,
    alternates: {
      canonical: `${siteUrl}/rules/${rule.slug}/`,
    },
    openGraph: {
      title: `${rule.item}: Can I Bring It?`,
      description: rule.shortAnswer,
      url: `${siteUrl}/rules/${rule.slug}/`,
      siteName: 'Can I Bring It Now',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${rule.item}: Can I Bring It?`,
      description: rule.shortAnswer,
    },
  };
}

function getRelatedRules(current: Rule) {
  return rules
    .filter((rule) => rule.slug !== current.slug)
    .map((rule) => {
      let score = 0;
      if (rule.category === current.category) score += 4;
      score += rule.tags.filter((tag) => current.tags.includes(tag)).length * 2;
      if (rule.cabin === current.cabin) score += 1;
      if (rule.checked === current.checked) score += 1;
      return { rule, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((item) => item.rule);
}

function statusClass(status: string) {
  if (status === 'Allowed') return 'bg-green-50 text-green-950 ring-green-100';
  if (status === 'Not allowed') return 'bg-red-50 text-red-950 ring-red-100';
  return 'bg-orange-50 text-orange-950 ring-orange-100';
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'Allowed') return <CheckCircle2 className="h-7 w-7 text-green-700" />;
  if (status === 'Not allowed') return <XCircle className="h-7 w-7 text-red-700" />;
  return <AlertTriangle className="h-7 w-7 text-orange-700" />;
}

function getRiskLevel(rule: Rule) {
  if (rule.checked === 'Not allowed' || rule.warning?.toLowerCase().includes('customs')) return 'Medium';
  if (rule.cabin === 'Restricted' || rule.checked === 'Restricted') return 'Medium';
  if (rule.category.toLowerCase().includes('food')) return 'High';
  return 'Low';
}

function getConfidence(rule: Rule) {
  let score = 92;
  if (rule.cabin === 'Restricted') score -= 4;
  if (rule.checked === 'Restricted') score -= 4;
  if (rule.checked === 'Not allowed') score -= 3;
  if (rule.category.toLowerCase().includes('food')) score -= 8;
  if (rule.warning) score -= 2;
  return Math.max(72, Math.min(97, score));
}

function getDecisionScore(rule: Rule) {
  let score = getConfidence(rule);
  if (getRiskLevel(rule) === 'Medium') score -= 3;
  if (getRiskLevel(rule) === 'High') score -= 8;
  return Math.max(60, Math.min(98, score));
}

function getRiskClass(risk: string) {
  if (risk === 'Low') return 'bg-green-50 text-green-950 ring-green-100';
  if (risk === 'High') return 'bg-red-50 text-red-950 ring-red-100';
  return 'bg-orange-50 text-orange-950 ring-orange-100';
}

function getSourceChecklist(rule: Rule) {
  const sources = [
    "Your airline's official baggage rules",
    "Your departure airport's security guidance",
    "Your destination country's customs authority",
  ];

  if (rule.category === 'Medication') {
    sources.unshift('Destination medication or controlled-drug guidance');
  }

  if (rule.category === 'Food & customs') {
    sources.unshift('Destination agriculture, biosecurity or quarantine guidance');
  }

  return sources;
}

function buildFaqs(rule: Rule) {
  return [
    {
      question: `Can I bring ${rule.item}?`,
      answer: rule.shortAnswer,
    },
    {
      question: `Can ${rule.item} go in cabin baggage?`,
      answer: `Cabin baggage status: ${rule.cabin}. Check airport security and airline guidance before travelling.`,
    },
    {
      question: `Can ${rule.item} go in checked baggage?`,
      answer: `Checked baggage status: ${rule.checked}. Some items are treated differently in cabin and checked baggage.`,
    },
    {
      question: 'Should I check official rules before flying?',
      answer:
        'Yes. This site simplifies travel guidance, but official airline, airport security and customs rules should be checked before travel.',
    },
  ];
}

function buildJsonLd(rule: Rule, faqs: ReturnType<typeof buildFaqs>) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Travel rules', item: `${siteUrl}/search/` },
        { '@type': 'ListItem', position: 3, name: rule.item, item: `${siteUrl}/rules/${rule.slug}/` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: `${rule.item}: Can I Bring It?`,
      description: rule.shortAnswer,
      url: `${siteUrl}/rules/${rule.slug}/`,
      dateModified: rule.updated,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Can I Bring It Now',
        url: siteUrl,
      },
    },
  ];
}

function DecisionMetric({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{helper}</p>
    </div>
  );
}

export default function RulePage({ params }: { params: { slug: string } }) {
  const rule = rules.find((r) => r.slug === params.slug);

  if (!rule) {
    notFound();
  }

  const relatedRules = getRelatedRules(rule);
  const risk = getRiskLevel(rule);
  const confidence = getConfidence(rule);
  const decisionScore = getDecisionScore(rule);
  const faqs = buildFaqs(rule);
  const jsonLd = buildJsonLd(rule, faqs);

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
            <a href="/" className="inline-flex items-center gap-2 text-brand-600">
              <ArrowLeft className="h-4 w-4" />
              Home
            </a>
            <span>/</span>
            <a href="/categories/" className="text-brand-600">Categories</a>
            <span>/</span>
            <span>{rule.category}</span>
          </nav>

          <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-soft ring-1 ring-slate-200">
            <div className="bg-slate-950 p-8 text-white">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-sky-200">
                <Sparkles className="h-4 w-4" />
                Travel decision guide
              </p>

              <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
                {rule.item}
              </h1>

              <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-200">
                {rule.shortAnswer}
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <DecisionMetric
                  label="Decision score"
                  value={`${decisionScore}/100`}
                  helper="A quick confidence-style score based on current structured guidance."
                />
                <DecisionMetric
                  label="Confidence"
                  value={`${confidence}%`}
                  helper="Higher means the answer is clearer; still confirm official rules."
                />
                <DecisionMetric
                  label="Risk level"
                  value={risk}
                  helper="Risk increases when customs, airline approval or restrictions may apply."
                />
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                <div className={`rounded-3xl p-6 ring-1 ${statusClass(rule.cabin)}`}>
                  <div className="flex items-center gap-3">
                    <StatusIcon status={rule.cabin} />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide opacity-80">Cabin baggage</p>
                      <h2 className="text-3xl font-black">{rule.cabin}</h2>
                    </div>
                  </div>
                  <p className="mt-4 leading-7 opacity-80">
                    Guidance for hand luggage or items carried into the aircraft cabin.
                  </p>
                </div>

                <div className={`rounded-3xl p-6 ring-1 ${statusClass(rule.checked)}`}>
                  <div className="flex items-center gap-3">
                    <StatusIcon status={rule.checked} />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide opacity-80">Checked baggage</p>
                      <h2 className="text-3xl font-black">{rule.checked}</h2>
                    </div>
                  </div>
                  <p className="mt-4 leading-7 opacity-80">
                    Guidance for hold luggage checked in with the airline.
                  </p>
                </div>
              </div>

              {rule.warning && (
                <div className="mt-6 rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-100">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-1 h-6 w-6 text-amber-700" />
                    <div>
                      <h2 className="text-xl font-bold text-amber-950">Important warning</h2>
                      <p className="mt-2 leading-7 text-amber-800">{rule.warning}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className={`rounded-3xl p-6 ring-1 ${getRiskClass(risk)}`}>
                  <ShieldCheck className="h-7 w-7" />
                  <p className="mt-4 text-sm font-semibold uppercase tracking-wide opacity-70">Risk</p>
                  <h2 className="mt-1 text-2xl font-black">{risk}</h2>
                </div>

                <div className="rounded-3xl bg-brand-50 p-6 text-brand-950 ring-1 ring-brand-100">
                  <Star className="h-7 w-7" />
                  <p className="mt-4 text-sm font-semibold uppercase tracking-wide opacity-70">Confidence</p>
                  <h2 className="mt-1 text-2xl font-black">{confidence}%</h2>
                </div>

                <div className="rounded-3xl bg-slate-50 p-6 text-slate-950 ring-1 ring-slate-200">
                  <Calendar className="h-7 w-7 text-brand-600" />
                  <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Last reviewed</p>
                  <h2 className="mt-1 text-2xl font-black">{rule.updated}</h2>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <section className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                  <div className="flex items-center gap-3">
                    <Info className="h-6 w-6 text-brand-600" />
                    <h2 className="text-xl font-bold text-slate-950">Restrictions to know</h2>
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
                    {rule.restrictions.map((restriction) => (
                      <li key={restriction}>{restriction}</li>
                    ))}
                  </ul>
                </section>

                <section className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-brand-600" />
                    <h2 className="text-xl font-bold text-slate-950">Packing tips</h2>
                  </div>
                  <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
                    {rule.tips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">Official sources to check</h2>
                </div>
                <p className="mt-3 leading-7 text-slate-600">
                  Travel rules can change. Before you fly, confirm important restrictions with these official sources.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
                  {getSourceChecklist(rule).map((source) => (
                    <li key={source}>{source}</li>
                  ))}
                </ul>
                <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-500">
                  {rule.sourceNote}
                </p>
              </section>

              <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">Frequently asked questions</h2>
                </div>
                <div className="mt-5 space-y-5">
                  {faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="font-bold text-slate-950">{faq.question}</h3>
                      <p className="mt-1 leading-7 text-slate-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              {relatedRules.length > 0 && (
                <section className="mt-8">
                  <p className="font-semibold text-brand-600">Related checks</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-950">You may also need to know</h2>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {relatedRules.map((related) => (
                      <a
                        key={related.slug}
                        href={`/rules/${related.slug}/`}
                        className="rounded-3xl border border-slate-200 bg-white p-4 transition hover:border-brand-500 hover:bg-brand-50"
                      >
                        <p className="font-bold text-slate-950">{related.item}</p>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                          {related.shortAnswer}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                          View related rule <ArrowRight className="h-4 w-4" />
                        </span>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {rule.affiliateType && (
                <section className="mt-8 rounded-3xl bg-gradient-to-br from-white to-brand-50 p-6 ring-1 ring-slate-200">
                  <p className="font-semibold text-brand-600">Travel essentials</p>
                  <h2 className="mt-2 text-xl font-bold text-slate-950">Useful for this trip: {rule.affiliateType}</h2>
                  <p className="mt-2 leading-7 text-slate-600">
                    This section is ready for carefully selected travel product recommendations once monetisation is enabled.
                  </p>
                </section>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/check/"
                  className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700"
                >
                  Check another item <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={`/categories/${rule.category.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-')}/`}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 font-bold text-slate-700 hover:bg-slate-200"
                >
                  <Link2 className="h-4 w-4" /> Browse {rule.category}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
