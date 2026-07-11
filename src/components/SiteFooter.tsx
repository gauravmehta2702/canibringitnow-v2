const groups = [
  {
    title: 'Explore',
    links: [
      ['Trip checker', '/trip-checker/'], ['Rules', '/rules/'], ['Items', '/items/'], ['Airlines', '/airlines/'],
      ['Countries', '/countries/'], ['Categories', '/categories/'], ['Guides', '/guides/'], ['Search', '/search/'],
    ],
  },
  {
    title: 'Trust & editorial',
    links: [
      ['About', '/about/'], ['Editorial policy', '/editorial-policy/'],
      ['Fact checking', '/fact-checking/'], ['Source policy', '/source-policy/'],
      ['Corrections policy', '/corrections-policy/'], ['Contact', '/contact/'],
    ],
  },
  {
    title: 'Legal & commercial',
    links: [
      ['Privacy', '/privacy/'], ['Cookie policy', '/cookie-policy/'], ['Terms', '/terms/'],
      ['Disclaimer', '/disclaimer/'], ['Advertising policy', '/advertising-policy/'],
      ['Affiliate disclosure', '/affiliate-disclosure/'],
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-lg font-black text-white">Can I Bring It Now?</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">Plain-English baggage, security and customs guidance. Always confirm important restrictions with official sources before travel.</p>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <p className="font-black text-white">{group.title}</p>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                {group.links.map(([label, href]) => <a key={href} href={href} className="hover:text-white">{label}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs leading-6 text-slate-500">
          © 2026 Can I Bring It Now. Information is general guidance and is not a substitute for airline, airport, government, customs, medical or legal advice.
        </div>
      </div>
    </footer>
  );
}
