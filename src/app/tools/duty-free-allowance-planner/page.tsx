import ToolHero from '@/components/orbit5/ToolHero';
import ToolCardGrid from '@/components/orbit5/ToolCardGrid';
import DutyFreeAllowancePlanner from '@/components/orbit5/DutyFreeAllowancePlanner';
import { getToolInternalLinks } from '@/lib/orbit5Tools';
export const metadata = { title: 'Duty-Free Allowance Planner | Can I Bring It Now', description: 'Plan what customs and allowance checks to make before buying duty-free goods.', alternates: { canonical: '/tools/duty-free-allowance-planner/' } };
export default function Page() { return <main className="min-h-screen bg-slate-50 pb-24 md:pb-0"><section className="bg-gradient-to-br from-brand-50 via-white to-sky-50"><div className="mx-auto max-w-6xl px-5 py-10 md:px-8"><a href="/travel-tools/" className="text-sm font-semibold text-brand-600">← Travel tools</a><ToolHero eyebrow="Customs" title="Duty-Free Allowance Planner" description="Plan what customs and allowance checks to make before buying duty-free goods." /><DutyFreeAllowancePlanner /><ToolCardGrid title="Continue planning" eyebrow="Related checks" cards={getToolInternalLinks()} /></div></section></main>; }
