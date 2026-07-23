# Growth Release 13 — Airline Comparison Knowledge Graph

This release adds a real data-driven airline comparison layer to the public website.

## Public routes
- `/compare-airlines/`
- `/compare-airlines/[item]/` for every item with at least two airline-specific rules

## Features
- Automatically groups airline-specific rules by item
- Static generation of comparison pages
- Cabin and checked-baggage comparison table
- FAQ, breadcrumb and ItemList structured data
- Automatic comparison call-to-action on eligible rule pages
- Comparison routes included in the high-priority sitemap group
- Post-build validation through `validate:growth-v13`
