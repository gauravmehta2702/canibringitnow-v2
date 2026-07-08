import ToolHero from '@/components/orbit5/ToolHero';
import ToolCardGrid from '@/components/orbit5/ToolCardGrid';
import TravelChecklistBuilder from '@/components/orbit5/TravelChecklistBuilder';
import { getToolInternalLinks } from '@/lib/orbit5Tools';
export const metadata = { title: 'Travel Checklist Builder | Can I Bring It Now', description: 'Build a travel checklist based on destination, airline, travellers and items.', alternates: { canonical: '/tools/travel-checklist-builder/' } };
export default function Page() { return <main className="min-h-screen bg-slate-50 pb-24 md:pb-0"><section className="bg-gradient-to-br from-brand-50 via-white to-sky-50"><div className="mx-auto max-w-6xl px-5 py-10 md:px-8"><a href="/travel-tools/" className="text-sm font-semibold text-brand-600">← Travel tools</a><ToolHero eyebrow="Checklist" title="Travel Checklist Builder" description="Build a travel checklist based on destination, airline, travellers and items." /><TravelChecklistBuilder /><ToolCardGrid title="Continue planning" eyebrow="Related checks" cards={getToolInternalLinks()} /></div></section></main>; }
