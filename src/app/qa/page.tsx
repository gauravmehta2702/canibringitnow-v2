import { CheckCircle2, ExternalLink, Rocket, Search, ShieldCheck } from 'lucide-react';
import { rules } from '@/data/rules';
import { getAirlines } from '@/lib/airlineUtils';
import { getCategories } from '@/lib/categoryUtils';
import { getCountries } from '@/lib/countryUtils';

export const metadata = {
  title: 'Launch QA | Can I Bring It Now',
  robots: {
    index: false,
    follow: false,
  },
};

const previewBase = 'https://canibringitnow-v2.pages.dev';
const productionBase = 'https://canibringitnow.com';

const searchTests = [
  { label: 'Power bank', path: '/search/?q=power%20bank' },
  { label: 'Portable charger synonym', path: '/search/?q=portable%20charger' },
  { label: 'Medication', path: '/search/?q=medication' },
  { label: 'Baby formula', path: '/search/?q=baby%20formula' },
  { label: 'No-result learning test', path: '/search/?q=cpap%20machine' },
];

const infrastructureTests = [
  { label: 'Homepage', path: '/' },
  { label: 'Travel Rule Matrix', path: '/check/' },
  { label: 'Sitemap XML', path: '/sitemap.xml' },
  { label: 'Robots TXT', path: '/robots.txt' },
  { label: 'PWA Manifest', path: '/manifest.webmanifest' },
  { label: 'Service Worker', path: '/sw.js' },
  { label: 'Offline Page', path: '/offline/' },
  { label: 'Custom 404', path: '/this-page-does-not-exist' },
];

function UrlRow({ label, path }: { label: string; path: string }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-bold text-slate-950">{label}</p>
        <p className="mt-1 break-all text-sm text-slate-500">{previewBase}{path}</p>
      </div>
      <a
        href={`${previewBase}${path}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-fit items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700"
      >
        Open <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 rounded-[2rem] bg-slate-50 p-5 ring-1 ring-slate-200 md:p-6">
      <h2 className="text-2xl font-black text-slate-950">{title}</h2>
      <p className="mt-2 text-slate-600">{description}</p>
      <div className="mt-5 grid gap-3">{children}</div>
    </section>
  );
}

export default function QAPage() {
  const ruleLinks = rules.map((rule) => ({ label: rule.item, path: `/rules/${rule.slug}/` }));
  const categoryLinks = getCategories().map((category) => ({ label: category.name, path: `/categories/${category.slug}/` }));
  const airlineLinks = getAirlines().map((airline) => ({ label: airline.name, path: `/airlines/${airline.slug}/` }));
  const countryLinks = getCountries().map((country) => ({ label: country.name, path: `/countries/${country.slug}/` }));

  const totalUrls =
    infrastructureTests.length + searchTests.length + ruleLinks.length + categoryLinks.length + airlineLinks.length + countryLinks.length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-sky-50">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <a href="/" className="text-sm font-semibold text-brand-600">← Back to homepage</a>

        <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-slate-200 md:p-8">
          <div className="flex items-center gap-3">
            <Rocket className="h-8 w-8 text-brand-600" />
            <p className="font-bold text-brand-600">Launch QA dashboard</p>
          </div>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            RC2 launch testing hub
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Use this private, no-index QA page to test the most important URLs before launch. It is generated from the current rule, airline, country and category data so it stays useful as the site grows.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-green-50 p-5 ring-1 ring-green-100">
              <CheckCircle2 className="h-7 w-7 text-green-700" />
              <p className="mt-3 text-3xl font-black text-green-950">{totalUrls}</p>
              <p className="text-sm font-semibold text-green-800">URLs to verify</p>
            </div>
            <div className="rounded-3xl bg-brand-50 p-5 ring-1 ring-brand-100">
              <Search className="h-7 w-7 text-brand-700" />
              <p className="mt-3 text-3xl font-black text-brand-950">{searchTests.length}</p>
              <p className="text-sm font-semibold text-brand-800">Search tests</p>
            </div>
            <div className="rounded-3xl bg-amber-50 p-5 ring-1 ring-amber-100">
              <ShieldCheck className="h-7 w-7 text-amber-700" />
              <p className="mt-3 text-3xl font-black text-amber-950">Noindex</p>
              <p className="text-sm font-semibold text-amber-800">Hidden from Google</p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-950 p-5 text-white">
            <p className="font-bold">Production URL after launch</p>
            <p className="mt-2 break-all text-slate-300">{productionBase}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              The preview links below use the Cloudflare Pages URL. After launch, replace the preview domain with canibringitnow.com for final production checks.
            </p>
          </div>
        </div>

        <Section title="Infrastructure" description="Core pages and technical endpoints that must work before launch.">
          {infrastructureTests.map((item) => <UrlRow key={item.path} {...item} />)}
        </Section>

        <Section title="Search intelligence" description="These confirm exact matches, synonym matching and no-result learning.">
          {searchTests.map((item) => <UrlRow key={item.path} {...item} />)}
        </Section>

        <Section title="Rule pages" description="Every rule page should show decision cards, trust sections, FAQs and related links.">
          {ruleLinks.map((item) => <UrlRow key={item.path} {...item} />)}
        </Section>

        <Section title="Categories" description="Category hub pages should link users into relevant rules.">
          <UrlRow label="All categories" path="/categories/" />
          {categoryLinks.map((item) => <UrlRow key={item.path} {...item} />)}
        </Section>

        <Section title="Airlines" description="Airline hub pages should load and internally link to useful rule checks.">
          <UrlRow label="All airlines" path="/airlines/" />
          {airlineLinks.map((item) => <UrlRow key={item.path} {...item} />)}
        </Section>

        <Section title="Countries" description="Destination hub pages should load and explain customs/security considerations.">
          <UrlRow label="All countries" path="/countries/" />
          {countryLinks.map((item) => <UrlRow key={item.path} {...item} />)}
        </Section>
      </div>
    </main>
  );
}
