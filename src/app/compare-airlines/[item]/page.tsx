import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowRight, CheckCircle2, Plane, XCircle } from 'lucide-react';
import { getComparisonTopic, getComparisonTopics } from '@/lib/travelKnowledgeGraph';
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildSeoMetadata } from '@/lib/siteSeo';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import type { RuleStatus } from '@/data/rules';

export function generateStaticParams() {
  return getComparisonTopics().map((topic) => ({ item: topic.slug }));
}

export function generateMetadata({ params }: { params: { item: string } }) {
  const topic = getComparisonTopic(params.item);
  if (!topic) return { title: 'Airline comparison not found' };
  return buildSeoMetadata({
    title: `${topic.name} Airline Rules Compared`,
    description: `Compare ${topic.name.toLowerCase()} cabin and checked baggage rules across ${topic.entries.length} airlines, with warnings and links to detailed guidance.`,
    path: `/compare-airlines/${topic.slug}/`,
    type: 'article',
  });
}

function icon(status: RuleStatus) {
  if (status === 'Allowed') return <CheckCircle2 className="h-5 w-5 text-green-700" />;
  if (status === 'Not allowed') return <XCircle className="h-5 w-5 text-red-700" />;
  return <AlertTriangle className="h-5 w-5 text-amber-700" />;
}

function badge(status: RuleStatus) {
  const style = status === 'Allowed' ? 'bg-green-50 text-green-900 ring-green-100' : status === 'Not allowed' ? 'bg-red-50 text-red-900 ring-red-100' : 'bg-amber-50 text-amber-900 ring-amber-100';
  return <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-black ring-1 ${style}`}>{icon(status)}{status}</span>;
}

export default function AirlineComparisonPage({ params }: { params: { item: string } }) {
  const topic = getComparisonTopic(params.item);
  if (!topic) notFound();

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Compare airlines', href: '/compare-airlines/' },
    { name: topic.name, href: `/compare-airlines/${topic.slug}/` },
  ];
  const faq = [
    { question: `Can I take ${topic.name.toLowerCase()} in cabin baggage?`, answer: `The answer can vary by airline. Use the table on this page to compare the current guidance in our database, then confirm with your airline.` },
    { question: `Can I put ${topic.name.toLowerCase()} in checked baggage?`, answer: `Checked-baggage treatment may differ from cabin baggage. Review each airline row and pay close attention to items marked restricted or not allowed.` },
    { question: 'Are airline baggage rules guaranteed to stay the same?', answer: 'No. Airline, airport and destination rules can change, so always verify important restrictions with official sources before travelling.' },
  ];
  const jsonLd = [buildBreadcrumbJsonLd(breadcrumbItems), buildFaqJsonLd(faq), {
    '@context': 'https://schema.org', '@type': 'ItemList', name: `${topic.name} airline comparison`,
    itemListElement: topic.entries.map((entry, index) => ({ '@type': 'ListItem', position: index + 1, url: `https://canibringitnow.com/rules/${entry.rule.slug}/`, name: `${entry.airline}: ${entry.rule.cabin} in cabin, ${entry.rule.checked} in checked baggage` })),
  }];

  return (
    <main className="min-h-screen bg-slate-50">
      {jsonLd.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
      <section className="bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mt-7 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-9">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-black text-brand-700"><Plane className="h-4 w-4" /> {topic.entries.length} airlines compared</div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{topic.name} airline rules compared</h1>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">Compare cabin and checked-baggage guidance side by side. This is a planning tool, not a substitute for the airline’s latest official policy.</p>

            <div className="mt-9 overflow-x-auto rounded-3xl ring-1 ring-slate-200">
              <table className="min-w-full border-collapse bg-white text-left">
                <thead className="bg-slate-950 text-white"><tr><th className="px-5 py-4">Airline</th><th className="px-5 py-4">Cabin</th><th className="px-5 py-4">Checked</th><th className="px-5 py-4">Key warning</th><th className="px-5 py-4">Full rule</th></tr></thead>
                <tbody>
                  {topic.entries.map((entry) => (
                    <tr key={entry.rule.slug} className="border-t border-slate-200 align-top">
                      <td className="px-5 py-5 font-black text-slate-950">{entry.airline}</td>
                      <td className="px-5 py-5">{badge(entry.rule.cabin)}</td>
                      <td className="px-5 py-5">{badge(entry.rule.checked)}</td>
                      <td className="max-w-md px-5 py-5 text-sm leading-6 text-slate-600">{entry.rule.warning || entry.rule.shortAnswer}</td>
                      <td className="px-5 py-5"><a href={`/rules/${entry.rule.slug}/`} className="inline-flex items-center gap-2 font-bold text-brand-700">View <ArrowRight className="h-4 w-4" /></a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-100">
              <h2 className="text-xl font-black text-amber-950">Before relying on this comparison</h2>
              <p className="mt-3 leading-7 text-amber-900">Check the airline’s official baggage page, your departure airport’s security rules and destination customs requirements. Capacity limits, approvals and route-specific rules may apply.</p>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {faq.map((item) => <div key={item.question} className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200"><h2 className="font-black text-slate-950">{item.question}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p></div>)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
