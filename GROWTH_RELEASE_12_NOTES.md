# Growth Release 12 — Complete Rule Coverage

This release exports every rule stored in `src/data/rules.ts` instead of limiting production generation to the first eight rules.

## Changes

- Generates a static page for every rule record.
- Keeps the existing automatic sitemap generator.
- Adds a post-build validation step that fails the build when a rule page or its sitemap URL is missing.
- Does not change the design, rule wording, analytics, or internal-linking layout.

## Expected build output

After `npm run build`, the terminal should display messages similar to:

- `Generated sitemap.xml with ... public URLs.`
- `Validated ... exported rule pages and sitemap URLs.`

The exact totals depend on the current data in the project.
