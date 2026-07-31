# Build 22 — Authority Engine

## Implemented
- Reusable top-of-page Authority Decision Card across every `/rules/[slug]/` page.
- Category-aware explanations of why a travel rule exists.
- Contextual common traveller mistakes.
- Practical traveller checklist.
- Three-step official verification order.
- Journey links connecting item rules to airline, category and trip-planning content.
- Internal `/authority-dashboard/` with `noindex` metadata and a quality-priority audit.
- Build validation script integrated into `postbuild`.

## Important positioning
This build strengthens the existing item-rule entry point while connecting it to the broader travel journey. CanIBringItNow remains a whole-travel-industry platform, not an airline-only website.

## Test after deployment
- `/rules/power-bank-emirates/`
- `/rules/medication-plane/`
- `/rules/baby-milk-plane/`
- `/authority-dashboard/`

## Commands
```bash
npm install
npm run build
```

## Build 22 extension: First-page opportunity system

Added a transparent, heuristic keyword opportunity engine that prioritises specific item + airline searches without inventing SEMrush volume or difficulty values.

New internal noindex routes:

- `/first-page-opportunities/`
- `/content-coverage-matrix/`

Rule pages now include a related-search topic-cluster panel linking to existing sibling airline pages and relevant searches.

The opportunity scores are intentionally based on current content structure, specificity, depth, source context and high-intent categories. Search Console and SEMrush exports should be used to replace or enrich these heuristic scores with real impressions, positions, CTR, volume and keyword difficulty.
