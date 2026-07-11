# Version 5.0 — Travel Intelligence Database Foundation

This release introduces a non-breaking structured graph above the existing rules dataset.

## Included

- Typed graph nodes for rules, items, airlines, countries, categories, guides and sources.
- Explicit rule-to-entity relationships derived from the existing dataset.
- Honest source-gap modelling: editorial summaries are not mislabelled as official sources.
- Graph context alerts inside the Trip Checker when a selected rule targets a different airline or country.
- Local HTML and JSON graph reports in `reports/`.
- Build validation for graph integrity.

## Important

This is the migration foundation, not a mass URL generator. Existing public routes remain unchanged. Future source, comparison, multilingual and AI features should query this graph instead of duplicating relationship logic.
