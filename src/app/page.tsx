import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Globe2,
  Hotel,
  Layers3,
  Luggage,
  Plane,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import SearchBox from '@/components/SearchBox';
import { airlines, categories, countries, rules } from '@/data/rules';

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const popularSearches = [
  { label: 'Power bank on Emirates', emoji: '🔋', href: '/search/?q=power%20bank%20on%20Emirates' },
  { label: 'Medication to Japan', emoji: '💊', href: '/search/?q=medication%20to%20Japan' },
  { label: 'Baby formula to USA', emoji: '👶', href: '/search/?q=baby%20formula%20to%20USA' },
  { label: 'Liquids in hand luggage', emoji: '💧', href: '/search/?q=liquids%20in%20hand%20luggage' },
  { label: 'Drone batteries', emoji: '🛩️', href: '/search/?q=drone%20batteries' },
  { label: 'Protein powder to Australia', emoji: '🥤', href: '/search/?q=protein%20powder%20to%20Australia' },
  { label: 'CPAP machine Qatar', emoji: '🧳', href: '/search/?q=CPAP%20machine%20Qatar' },
  { label: 'Top 5 Tokyo hotels', emoji: '🏨', href: '/top-5-guides/' },
];

const platformRoutes = [
  { title: 'Travel Intelligence', href: '/travel-intelligence/', icon: Brain, description: 'Get connected rules, questions, timeline and next actions.' },
  { title: 'Before You Fly', href: '/before-you-fly/', icon: Route, description: 'Start your pre-travel preparation from one dashboard.' },
  { title: 'Packing Planner', href: '/packing-planner/', icon: Luggage, description: 'Create a checklist for your destination and airline.' },
  { title: 'Destination Intelligence', href: '/destination-intelligence/', icon: Globe2, description: 'Rules, preparation and Top 5 guide ideas by destination.' },
  { title: 'Airline Hubs', href: '/airline-hub/', icon: Plane, description: 'Browse travel checks by airline.' },
  { title: 'Top 5 Guides', href: '/top-5-guides/', icon: Hotel, description: 'Hotel, restaurant and attraction guide templates.' },
];

const trustPoints = [
  'Search by item, airline or country',
  'Cabin and checked baggage decisions',
  'Related questions and preparation timelines',
  'Built to connect rules, destinations and trip planning',
];

export default function Home() {
  const latestRules = rules.slice(0, 6);
  const featuredAirlines = airlines.slice(0, 8);
  const featuredCountries = countries.slice(0, 8);

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-sky-50">
        <div className="mx-auto max-w-7xl px-5 py-6 md:px-8">
          <nav className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 font-bold text-slate-950">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white">
                <Luggage className="h-5 w-5" />
              </span>
              Can I Bring It Now
            </a>
            <div className="hidden gap-6 text-sm font-bold text-slate-600 md:flex">
              <a href="/travel-intelligence/">Travel Intelligence</a>
              <a href="/before-you-fly/">Before You Fly</a>
              <a href="/airline-hub/">Airlines</a>
              <a href="/country-hub/">Countries</a>
            </div>
          </nav>

          <div className="mx-auto max-w-5xl py-16 text-center md:py-24">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-bold text-brand-900 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Know before you go
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-7xl">
              Search travel rules for any item, airline or country.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Check what you can bring, where to pack it, what airlines may restrict, what destination rules may apply, and what to prepare before you fly.
            </p>
            <SearchBox />
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-bold text-slate-600">
              {['Power banks', 'Medication', 'Baby travel', 'Customs', 'Hotels later', 'Packing'].map((x) => (
                <span key={x} className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200">{x}</span>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-500">
              We simplify travel preparation. Always confirm important restrictions with official airline, airport or government sources before travel.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-soft">
          <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-sky-200">
                <Brain className="h-4 w-4" /> Featured engine
              </div>
              <h2 className="mt-4 text-3xl font-black md:text-5xl">Travel Intelligence Engine</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Ask one connected question such as power bank on Emirates to Japan and get matching rules, related questions, a preparation timeline and next actions.
              </p>
              <a href="/travel-intelligence/" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 font-bold text-white hover:bg-brand-700">
                Open Travel Intelligence <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/10">
              <div className="space-y-4">
                {['Item', 'Airline', 'Country', 'Timeline', 'Related links'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-300" />
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <p className="font-semibold text-brand-600">Choose your path</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">Start with the tool that matches your trip</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {platformRoutes.map((route) => {
            const Icon = route.icon;
            return (
              <a key={route.href} href={route.href} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft">
                <Icon className="h-8 w-8 text-brand-600" />
                <h3 className="mt-4 text-xl font-bold text-slate-950">{route.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{route.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">Open <ArrowRight className="h-4 w-4" /></span>
              </a>
            );
          })}
        </div>
      </section>

      <section id="popular" className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <p className="font-semibold text-brand-600">Popular searches</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">High-intent travel questions</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularSearches.map((item) => (
            <a key={item.label} href={item.href} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft">
              <div className="text-3xl">{item.emoji}</div>
              <h3 className="mt-4 text-xl font-bold text-slate-950">{item.label}</h3>
              <p className="mt-2 text-sm text-slate-600">Check travel guidance and related preparation.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">Check now <ArrowRight className="h-4 w-4" /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <Layers3 className="h-8 w-8 text-brand-600" />
            <h2 className="mt-4 text-2xl font-bold text-slate-950">Browse categories</h2>
            <p className="mt-3 text-slate-600">Explore rules by item type.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {categories.map((category) => (
                <a key={category} href={`/categories/${slugify(category)}/`} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-brand-50 hover:text-brand-700">{category}</a>
              ))}
            </div>
            <a href="/category-hub/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">Open category hub <ArrowRight className="h-4 w-4" /></a>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <Plane className="h-8 w-8 text-brand-600" />
            <h2 className="mt-4 text-2xl font-bold text-slate-950">Browse airlines</h2>
            <p className="mt-3 text-slate-600">Airline-specific travel checks.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {featuredAirlines.map((airline) => (
                <a key={airline} href={`/airlines/${slugify(airline)}/`} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-brand-50 hover:text-brand-700">{airline}</a>
              ))}
            </div>
            <a href="/airline-hub/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">Open airline hub <ArrowRight className="h-4 w-4" /></a>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <Globe2 className="h-8 w-8 text-brand-600" />
            <h2 className="mt-4 text-2xl font-bold text-slate-950">Browse destinations</h2>
            <p className="mt-3 text-slate-600">Country and destination preparation.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {featuredCountries.map((country) => (
                <a key={country} href={`/destinations/${slugify(country)}/`} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-brand-50 hover:text-brand-700">{country}</a>
              ))}
            </div>
            <a href="/destination-intelligence/" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">Open destination intelligence <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section id="trust" className="bg-slate-950 py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="font-semibold text-sky-300">Why use Can I Bring It Now?</p>
          <h2 className="mt-2 text-3xl font-bold md:text-5xl">Built for quick answers and careful travel decisions.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {trustPoints.map((point) => (
              <div key={point} className="rounded-3xl bg-white/10 p-6 ring-1 ring-white/10">
                <ShieldCheck className="h-7 w-7 text-green-300" />
                <p className="mt-4 font-semibold text-white">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <p className="font-semibold text-brand-600">Latest rules</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">Recently added travel checks</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {latestRules.map((rule) => (
            <a key={rule.slug} href={`/rules/${rule.slug}/`} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft">
              <p className="text-sm font-semibold text-brand-600">{rule.category}</p>
              <h3 className="mt-2 text-xl font-bold text-slate-950">{rule.item}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{rule.shortAnswer}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">Read rule <ArrowRight className="h-4 w-4" /></div>
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© 2026 Can I Bring It Now. Travel guidance is informational only.</p>
          <div className="flex flex-wrap gap-4">
            <a href="/about/">About</a>
            <a href="/contact/">Contact</a>
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms</a>
            <a href="/disclaimer/">Disclaimer</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
