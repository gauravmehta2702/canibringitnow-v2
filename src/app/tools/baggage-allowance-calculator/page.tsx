import ToolHero from '@/components/orbit5/ToolHero';
import ToolCardGrid from '@/components/orbit5/ToolCardGrid';
import BaggageAllowanceCalculator from '@/components/orbit5/BaggageAllowanceCalculator';
import { getToolInternalLinks } from '@/lib/orbit5Tools';
export const metadata = { title: 'Baggage Allowance Calculator | Can I Bring It Now', description: 'Estimate your cabin and checked baggage plan before flying.', alternates: { canonical: '/tools/baggage-allowance-calculator/' } };
export default function Page() { return <main className="min-h-screen bg-slate-50 pb-24 md:pb-0"><section className="bg-gradient-to-br from-brand-50 via-white to-sky-50"><div className="mx-auto max-w-6xl px-5 py-10 md:px-8"><a href="/travel-tools/" className="text-sm font-semibold text-brand-600">← Travel tools</a><ToolHero eyebrow="Baggage" title="Baggage Allowance Calculator" description="Estimate your cabin and checked baggage plan before flying." /><BaggageAllowanceCalculator /><ToolCardGrid title="Continue planning" eyebrow="Related checks" cards={getToolInternalLinks()} /></div></section></main>; }
