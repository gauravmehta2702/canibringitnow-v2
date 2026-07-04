import AuthorityLinkGrid from '@/components/seo/AuthorityLinkGrid';
import {
  getAirlineRuleLinks,
  getAuthorityAirlines,
  getAuthorityAirports,
  getAuthorityCountries,
  getDestinationRuleLinks,
  getRelatedSearchTerms,
  getSimilarItemLinks,
} from '@/lib/knowledgeGraphAuthority';

export default function SeoAuthorityLayer({
  slug,
  item,
}: {
  slug?: string;
  item?: string;
}) {
  const relatedSearches = getRelatedSearchTerms(item);

  return (
    <div className="mt-8">
      <AuthorityLinkGrid
        eyebrow="Airline authority"
        title="Popular airline guides"
        links={getAuthorityAirlines(12)}
      />

      <AuthorityLinkGrid
        eyebrow="Destination authority"
        title="Popular destination guides"
        links={getAuthorityCountries(12)}
      />

      <AuthorityLinkGrid
        eyebrow="Airport security"
        title="Common airport security checks"
        links={getAuthorityAirports(12)}
      />

      <AuthorityLinkGrid
        eyebrow="Similar items"
        title="Similar travel items to check"
        links={getSimilarItemLinks(slug, 12)}
      />

      <AuthorityLinkGrid
        eyebrow="Airline rule clusters"
        title="More airline-specific rules"
        links={getAirlineRuleLinks(12)}
      />

      <AuthorityLinkGrid
        eyebrow="Destination rule clusters"
        title="More destination-specific rules"
        links={getDestinationRuleLinks(12)}
      />

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-200">
        <p className="font-bold text-brand-600">Related searches</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Questions travellers also ask</h2>
        <div className="mt-5 flex flex-wrap gap-2">
          {relatedSearches.map((term) => (
            <a
              key={term}
              href={`/search/?q=${encodeURIComponent(term)}`}
              className="rounded-full bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50 hover:text-brand-700"
            >
              {term}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
