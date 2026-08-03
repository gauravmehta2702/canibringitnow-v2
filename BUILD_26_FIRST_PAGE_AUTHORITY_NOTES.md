# Build 26 — First Page Authority Engine

Implemented against the uploaded GitHub repository.

## Public additions
- `/travel-authority/` — topic-cluster and methodology centre.
- `/downloads/canibringitnow-travel-rules-snapshot.csv` — downloadable snapshot generated from the current rules database.
- Every `/rules/[slug]/` page now includes a category-aware search-intent and verification panel.

## Internal addition
- `/low-competition-opportunities/` — noindex queue based only on the historical Search Console snapshot.

## Validation
Run `npm run validate:build26`, then `npm run build`.
