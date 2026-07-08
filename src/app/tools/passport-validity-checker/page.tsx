import ToolHero from '@/components/orbit5/ToolHero';
import ToolCardGrid from '@/components/orbit5/ToolCardGrid';
import PassportValidityChecker from '@/components/orbit5/PassportValidityChecker';
import { getToolInternalLinks } from '@/lib/orbit5Tools';
export const metadata = { title: 'Passport Validity Checker | Can I Bring It Now', description: 'Estimate whether passport validity may need attention before travelling.', alternates: { canonical: '/tools/passport-validity-checker/' } };
export default function Page() { return <main className="min-h-screen bg-slate-50 pb-24 md:pb-0"><section className="bg-gradient-to-br from-brand-50 via-white to-sky-50"><div className="mx-auto max-w-6xl px-5 py-10 md:px-8"><a href="/travel-tools/" className="text-sm font-semibold text-brand-600">← Travel tools</a><ToolHero eyebrow="Documents" title="Passport Validity Checker" description="Estimate whether passport validity may need attention before travelling." /><PassportValidityChecker /><ToolCardGrid title="Continue planning" eyebrow="Related checks" cards={getToolInternalLinks()} /></div></section></main>; }
