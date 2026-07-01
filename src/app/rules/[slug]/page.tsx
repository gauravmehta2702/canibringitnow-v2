import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  HelpCircle,
  Info,
  ShieldCheck,
  XCircle
} from 'lucide-react';
import { rules } from '@/data/rules';

export function generateStaticParams() {
  return rules.map((rule) => ({
    slug: rule.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const rule = rules.find((r) => r.slug === params.slug);

  if (!rule) {
    return {
      title: 'Travel rule not found | Can I Bring It Now',
    };
  }

  return {
    title: `${rule.item} | Can I Bring It Now`,
    description: rule.shortAnswer,
  };
}

function getRelatedRules(currentSlug: string) {
  const current = rules.find((rule) => rule.slug === currentSlug);
  if (!current) return [];

  return rules
    .filter((rule) => rule.slug !== current.slug)
    .map((rule) => {
      let score = 0;
      if (rule.category === current.category) score += 3;
      score += rule.tags.filter((tag) => current.tags.includes(tag)).length;
      return { rule, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((item) => item.rule);
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'Allowed') return <CheckCircle2 className="h-7 w-7 text-green-700" />;
  if (status === 'Not allowed') return <XCircle className="h-7 w-7 text-red-700" />;
  return <AlertTriangle className="h-7 w-7 text-orange-700" />;
}

function statusClass(status: string) {
  if (status === 'Allowed') return 'bg-green-50 ring-green-100 text-green-950';
  if (status === 'Not allowed') return 'bg-red-50 ring-red-100 text-red-950';
  return 'bg-orange-50 ring-orange-100 text-orange-950';
}
function buildFaqSchema(rule: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Can I bring ${rule.item}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: rule.shortAnswer,
        },
      },
      {
        '@type': 'Question',
        name: 'Can airport security still refuse this item?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Airport security officers and airline staff can make the final decision at the airport.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I check official travel rules before flying?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Always confirm important restrictions with your airline, airport, or destination customs authority before travel.',
        },
      },
    ],
  };
}
export default function RulePage({ params }: { params: { slug: string } }) {
  const rule = rules.find((r) => r.slug === params.slug);

  if (!rule) {
    notFound();
  }

  const relatedRules = getRelatedRules(rule.slug);
const faqSchema = buildFaqSchema(rule);
  return (
    <main className="min-h-screen bg-slate-50">
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            <ArrowLeft className="h-4 w-4" />
            Back to search
          </a>

          <div className="mt-8 rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-slate-200">
            <p className="font-semibold text-brand-600">{rule.category}</p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              {rule.item}
            </h1>

            <div className="mt-6 rounded-3xl bg-slate-950 p-6 text-white">
              <p className="text-sm font-semibold text-sky-300">Quick answer</p>
              <p className="mt-3 text-xl font-bold leading-8 md:text-2xl">
                {rule.shortAnswer}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className={`rounded-3xl p-6 ring-1 ${statusClass(rule.cabin)}`}>
                <div className="flex items-center gap-3">
                  <StatusIcon status={rule.cabin} />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide opacity-80">Cabin baggage</p>
                    <h2 className="text-2xl font-black">{rule.cabin}</h2>
                  </div>
                </div>
                <p className="mt-4 opacity-80">
                  Guidance for taking this item into the aircraft cabin or hand luggage.
                </p>
              </div>

              <div className={`rounded-3xl p-6 ring-1 ${statusClass(rule.checked)}`}>
                <div className="flex items-center gap-3">
                  <StatusIcon status={rule.checked} />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide opacity-80">Checked baggage</p>
                    <h2 className="text-2xl font-black">{rule.checked}</h2>
                  </div>
                </div>
                <p className="mt-4 opacity-80">
                  Guidance for packing this item in hold luggage checked in with the airline.
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

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <Info className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">Why this matters</h2>
                </div>
                <p className="mt-4 leading-7 text-slate-600">
                  Travel rules depend on airport security, airline baggage policies and destination customs rules.
                  Some items are safe in cabin baggage but restricted in checked baggage.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-brand-600" />
                  <h2 className="text-xl font-bold text-slate-950">Before you travel</h2>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
                  <li>Check the latest airline and airport security rules before departure.</li>
                  <li>Keep restricted items easy to access during security screening.</li>
                  <li>For customs-controlled items, check destination country rules before packing.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-6 w-6 text-brand-600" />
                <h2 className="text-xl font-bold text-slate-950">Common questions</h2>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <h3 className="font-bold text-slate-950">Can security still stop this item?</h3>
                  <p className="mt-1 text-slate-600">
                    Yes. Security officers and airline staff can make the final decision at the airport.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-950">Should I check official sources?</h3>
                  <p className="mt-1 text-slate-600">
                    Yes. This site simplifies guidance, but you should confirm important restrictions with official airline, airport or customs sources.
                  </p>
                </div>
              </div>
            </div>
<div className="mt-8 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
  <div className="flex items-center gap-3">
    <ShieldCheck className="h-6 w-6 text-brand-600" />
    <h2 className="text-xl font-bold text-slate-950">Official sources to check</h2>
  </div>

  <p className="mt-3 leading-7 text-slate-600">
    Travel rules can change. Before you fly, confirm important restrictions with official sources.
  </p>

  <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
    <li>Your airline&apos;s official baggage rules</li>
    <li>Your departure airport&apos;s security guidance</li>
    <li>Your destination country&apos;s customs authority</li>
  </ul>
</div>
            <div className="mt-8 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200">
  <div className="flex items-center gap-3">
    <ShieldCheck className="h-6 w-6 text-brand-600" />
    <h2 className="text-xl font-bold text-slate-950">Official sources to check</h2>
  </div>

  <p className="mt-3 leading-7 text-slate-600">
    Travel rules can change. Before you fly, confirm important restrictions with official sources.
  </p>

  <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
    <li>Your airline&apos;s official baggage rules</li>
    <li>Your departure airport&apos;s security guidance</li>
    <li>Your destination country&apos;s customs authority</li>
  </ul>
</div>
            {rule.affiliateType && (
              <div className="mt-8 rounded-3xl bg-gradient-to-br from-white to-brand-50 p-6 ring-1 ring-slate-200">
                <p className="font-semibold text-brand-600">Travel essentials</p>
                <h2 className="mt-2 text-xl font-bold text-slate-950">
                  Useful for this trip: {rule.affiliateType}
                </h2>
                <p className="mt-2 text-slate-600">
                  Carefully selected recommendations can be added here later when they genuinely help travellers.
                </p>
              </div>
            )}

            {relatedRules.length > 0 && (
              <div className="mt-8">
                <p className="font-semibold text-brand-600">Related checks</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  You may also need to know
                </h2>

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
              </div>
            )}

            <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              Last reviewed: {rule.updated}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
