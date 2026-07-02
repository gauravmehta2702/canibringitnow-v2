import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowLeft, Calendar, Info, ShieldCheck } from 'lucide-react';
import { rules } from '@/data/rules';
import DecisionCard from '@/components/trust/DecisionCard';
import OfficialSources from '@/components/trust/OfficialSources';
import FAQSection from '@/components/trust/FAQSection';
import RelatedRules from '@/components/trust/RelatedRules';
import AffiliateReadyBlock from '@/components/trust/AffiliateReadyBlock';
import {
  buildRuleJsonLd,
  getAffiliateIdeas,
  getConfidenceLabel,
  getDecisionScore,
  getOfficialSources,
  getRelatedRules,
  getRiskLevel,
  getRuleBySlug,
  getRuleFaqs,
} from '@/lib/ruleInsights';

const siteUrl = 'https://canibringitnow.com';

export function generateStaticParams() {
  return rules.map((rule) => ({ slug: rule.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const rule = getRuleBySlug(params.slug);

  if (!rule) {
    return { title: 'Travel rule not found | Can I Bring It Now' };
  }

  const title = `${rule.item}: Cabin & Checked Baggage Rules | Can I Bring It Now`;
  const description = `${rule.shortAnswer} Check cabin baggage, checked baggage, risk level and travel guidance before you fly.`;
  const url = `${siteUrl}/rules/${rule.slug}/`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Can I Bring It Now',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function RulePage({ params }: { params: { slug: string } }) {
  const rule = getRuleBySlug(params.slug);

  if (!rule) notFound();

  const relatedRules = getRelatedRules(rule);
  const risk = getRiskLevel(rule);
  const decisionScore = getDecisionScore(rule);
  const confidenceLabel = getConfidenceLabel(decisionScore);
  const officialSources = getOfficialSources(rule);
  const faqs = getRuleFaqs(rule);
  const affiliateIdeas = getAffiliateIdeas(rule);
  const jsonLd = buildRuleJsonLd(rule, `${siteUrl}/rules/${rule.slug}/`);

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
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
            <a href="/" className="inline-flex items-center gap-2 text-brand-600">
              <ArrowLeft className="h-4 w-4" />
              Home
            </a>
            <span>/</span>
            <a href={`/categories/${rule.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/`} className="text-brand-600">
              {rule.category}
            </a>
            <span>/</span>
            <span>{rule.item}</span>
          </nav>

          <article className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
            <p className="font-semibold text-brand-600">{rule.category}</p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {rule.item}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {rule.shortAnswer}
            </p>

            <DecisionCard
              cabin={rule.cabin}
              checked={rule.checked}
              score={decisionScore}
              confidenceLabel={confidenceLabel}
              risk={risk}
              updated={rule.updated}
            />

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

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <section className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <Info className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">Restrictions to check</h2>
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
                  <h2 className="text-xl font-bold text-slate-950">Before you travel</h2>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
                  {rule.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="mt-8 grid gap-6">
              <OfficialSources sources={officialSources} />
              <FAQSection faqs={faqs} />
              <AffiliateReadyBlock ideas={affiliateIdeas} />
              <RelatedRules rules={relatedRules} />
            </div>

            <div className="mt-8 rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <Calendar className="h-4 w-4" />
                Last reviewed: {rule.updated}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {rule.sourceNote} This page is informational guidance only and does not replace official airline, airport, or customs rules.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
