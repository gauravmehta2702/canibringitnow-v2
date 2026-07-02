import DiscoverySections from '@/components/DiscoverySections';
import {
  ArrowRight,
  Baby,
  BatteryCharging,
  BriefcaseMedical,
  Globe2,
  Luggage,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import SearchBox from '@/components/SearchBox';
import { airlines, categories, countries, rules } from '@/data/rules';

const popularSearches = [
  { label: 'Power bank', href: '/rules/power-bank-ryanair/' },
  { label: 'Baby formula', href: '/rules/baby-milk-plane/' },
  { label: 'Medication', href: '/rules/medication-plane/' },
  { label: 'Liquids', href: '/rules/liquids-tsa/' },
  { label: 'Deodorant', href: '/rules/deodorant-uk/' },
  { label: 'Food to Japan', href: '/rules/food-japan/' },
];

const trendingQuestions = [
  { label: 'Can I take a portable charger on a plane?', href: '/search/?q=portable%20charger' },
  { label: 'Can I bring baby milk through security?', href: '/rules/baby-milk-plane/' },
  { label: 'Can I fly with medicine?', href: '/rules/medication-plane/' },
  { label: 'Can I carry liquids in hand luggage?', href: '/rules/liquids-tsa/' },
];

export default function Home() {
  return <main>
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-sky-50">
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
        <nav className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 font-bold text-slate-950">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white">
              <Luggage className="h-5 w-5" />
            </span>
            Can I Bring It Now
          </a>
          <div className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#popular">Popular</a>
            <a href="#categories">Categories</a>
            <a href="#airlines">Airlines</a>
            <a href="#monetisation">Travel essentials</a>
          </div>
        </nav>

        <div className="mx-auto max-w-5xl py-16 text-center md:py-24">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-medium text-brand-900 shadow-sm">
            <Sparkles className="h-4 w-4" /> New travel rules checker, built for fast answers
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-7xl">
            Know what you can bring before you fly.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Instantly check airline baggage, airport security and customs rules for power banks, medication, liquids, food, baby items and travel essentials.
          </p>

          <SearchBox />

          <p className="mt-4 text-sm text-slate-500">
            We simplify travel rules, but always confirm important restrictions with official airline, airport or customs sources before travel.
          </p>
        </div>
      </div>
    </section>

    <section id="popular" className="mx-auto max-w-7xl px-5 py-14 md:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center gap-3">
            <Search className="h-7 w-7 text-brand-600" />
            <div>
              <p className="font-semibold text-brand-600">Popular searches</p>
              <h2 className="text-3xl font-bold text-slate-950">Quick travel checks</h2>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {popularSearches.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-brand-600" />
            <div>
              <p className="font-semibold text-brand-600">Trending questions</p>
              <h2 className="text-3xl font-bold text-slate-950">What travellers ask</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {trendingQuestions.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold text-slate-800 transition hover:border-brand-500 hover:bg-brand-50"
              >
                <span>{item.label}</span>
                <ArrowRight className="h-4 w-4 text-brand-600" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-semibold text-brand-600">Popular checks</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Start with the highest-search travel questions</h2>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {rules.map(r => <a key={r.slug} href={`/rules/${r.slug}/`} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft">
          <p className="text-sm font-semibold text-brand-600">{r.category}</p>
          <h3 className="mt-2 text-xl font-bold text-slate-950">{r.item}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{r.shortAnswer}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
            Read rule <ArrowRight className="h-4 w-4" />
          </div>
        </a>)}
      </div>
    </section>

    <section id="categories" className="bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl bg-white/10 p-6">
            <BatteryCharging className="h-8 w-8 text-sky-300" />
            <h3 className="mt-4 text-2xl font-bold">Batteries & electronics</h3>
            <p className="mt-3 text-slate-300">Power banks, drones, cameras, laptops and lithium battery rules.</p>
          </div>

          <div className="rounded-3xl bg-white/10 p-6">
            <BriefcaseMedical className="h-8 w-8 text-emerald-300" />
            <h3 className="mt-4 text-2xl font-bold">Medication & health</h3>
            <p className="mt-3 text-slate-300">Medicine, prescriptions, liquid medication and destination restrictions.</p>
          </div>

          <div className="rounded-3xl bg-white/10 p-6">
            <Baby className="h-8 w-8 text-pink-300" />
            <h3 className="mt-4 text-2xl font-bold">Baby travel</h3>
            <p className="mt-3 text-slate-300">Baby milk, formula, food, prams and family travel essentials.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="airlines" className="mx-auto max-w-7xl px-5 py-14 md:px-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <Plane className="h-8 w-8 text-brand-600" />
          <h2 className="mt-4 text-3xl font-bold">Featured airlines</h2>
          <p className="mt-3 text-slate-600">Browse common travel questions by airline as we expand the site.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {airlines.map(a => <a key={a} href={`/search/?q=${encodeURIComponent(a)}`} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-brand-50">{a}</a>)}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <Globe2 className="h-8 w-8 text-brand-600" />
          <h2 className="mt-4 text-3xl font-bold">Featured destinations</h2>
          <p className="mt-3 text-slate-600">Find customs, food, medication and baggage topics by destination.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {countries.map(c => <a key={c} href={`/search/?q=${encodeURIComponent(c)}`} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-brand-50">{c}</a>)}
          </div>
        </div>
      </div>

      <div id="monetisation" className="mt-8 rounded-3xl bg-gradient-to-br from-white to-brand-50 p-8 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-brand-600">Travel essentials</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Recommended travel tools, added only where useful
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              As the site grows, this section can include relevant recommendations such as travel insurance,
              eSIMs, cabin luggage, travel-safe power banks and packing tools — without interrupting the main answer.
            </p>
          </div>
          <ShieldCheck className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {categories.map(c => <a key={c} href={`/search/?q=${encodeURIComponent(c)}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium hover:bg-brand-50">{c}</a>)}
      </div>
    </section>

    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto max-w-7xl px-5 text-sm text-slate-500 md:px-8">
        © 2026 Can I Bring It Now. Travel guidance is informational only. Always check official sources before travelling.
      </div>
<DiscoverySections />
    </footer>
  </main>
}
