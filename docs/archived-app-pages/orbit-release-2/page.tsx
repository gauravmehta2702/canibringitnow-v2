import Orbit2CardGrid from '@/components/orbit2/Orbit2CardGrid';
import Orbit2Hero from '@/components/orbit2/Orbit2Hero';
const modules = [
  { title: 'International SEO', href: '/orbit-international/', label: 'ORBIT', description: 'Translation-ready architecture, language priorities and hreflang planning.' },
  { title: 'Traffic Command', href: '/traffic-command/', label: 'Growth', description: 'Weekly organic traffic control panel based on visits, paths and Search Console actions.' },
  { title: 'Traffic Magnets', href: '/traffic-magnets/', label: 'Content', description: 'Google Discover and social-friendly travel content ideas.' },
  { title: 'CTR Booster', href: '/ctr-booster/', label: 'SEO', description: 'Improve titles, meta descriptions and first-answer blocks for higher click-through rate.' },
  { title: 'Revenue Launch', href: '/revenue-launch/', label: 'Money', description: 'Contextual monetisation plan for AdSense, hotels, eSIMs, insurance and gear.' },
  { title: 'Indexing Control', href: '/indexing-control/', label: 'Technical SEO', description: 'Decide what Google should index, noindex and crawl first.' },
];
export const metadata = { title: 'ORBIT Release 2 | Can I Bring It Now', description: 'Combined growth, international SEO, indexing and revenue launch package.', alternates: { canonical: '/orbit-release-2/' } };
export default function OrbitRelease2Page() { return <main className="min-h-screen bg-slate-50 pb-24 md:pb-0"><section className="bg-gradient-to-br from-brand-50 via-white to-sky-50"><div className="mx-auto max-w-6xl px-5 py-10 md:px-8"><a href="/orbit/" className="text-sm font-semibold text-brand-600">← ORBIT</a><Orbit2Hero eyebrow="ORBIT Release 2" title="Growth, indexing and revenue launch system" description="This combined release prepares the site for international SEO, better indexing, higher CTR, traffic-magnet content and safer monetisation." /><Orbit2CardGrid title="Release 2 modules" eyebrow="Combined next stages" cards={modules} /></div></section></main>; }
