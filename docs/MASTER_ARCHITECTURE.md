# Can I Bring It Now — Master Architecture Decision Record

Status: Accepted
Version: 1.0

## Permanent Decisions

### ADR-001: Technology Stack
Use Next.js, TypeScript, Tailwind CSS, GitHub, and Cloudflare Pages.

### ADR-002: Data-Driven Architecture
All public pages must be generated from structured data. Do not create individual static HTML pages manually.

### ADR-003: Permanent URL Structure
Use stable, search-friendly URLs:
- /
- /rules/[slug]
- /airlines/[slug]
- /countries/[slug]
- /categories/[slug]
- /tools/[slug]

Avoid changing URLs after indexing.

### ADR-004: SEO Philosophy
Build answer-first pages targeting real search intent:
- Can I bring...
- Can I take...
- Is this allowed...
- Cabin baggage...
- Checked baggage...
- Customs rules...

No low-value filler blog content.

### ADR-005: Monetisation Principle
Answer the user's question first. Recommend products only when they genuinely help. Monetisation should start early enough to support the business, but never damage trust.

### ADR-006: Trust Layer
Every rule page should eventually include:
- Last reviewed date
- Official source references
- Disclaimer
- Confidence/review status
- Clear warning where rules vary

### ADR-007: Expansion Vision
The long-term product is a Travel Preparation Platform, not only a baggage rules site.

Future modules:
- Travel rules
- Airline rules
- Country customs
- Trip builder
- Packing checklist
- Travel essentials
- AI travel assistant

## Locked Roadmap

### Sprint 1 — Foundation
Professional homepage, search, dynamic rule pages, structured data, sitemap, robots, SEO base.

### Sprint 2 — Travel Knowledge Engine
Expand data model, add airline/country/category pages, internal linking.

### Sprint 3 — Traffic Engine
Google Search Console, Analytics, Bing Webmaster, Microsoft Clarity, sitemap submission.

### Sprint 4 — Early Monetisation
Affiliate-ready travel essentials, helpful product recommendations, later display ads.

### Sprint 5 — Trip Builder
From/to/airline/traveller inputs with packing and restriction results.

## Rules for Future Changes
Do not rebuild the foundation unless required by:
- Security issue
- Platform-breaking change
- Strong real-user data proving the architecture is failing

All future work should add to the foundation, not replace it.

