# Growth Release 9 Notes

## What changed

- Added a Growth Release 9 dashboard at `/growth-release-9/`.
- Added focused launch/indexing limits in `src/lib/launchLimits.ts`.
- Updated dynamic static generation to use the launch limits instead of generating too many pages at once.
- Updated `sitemap.xml` generation to match the focused first indexing batch.
- Removed a duplicate topic-cluster block from rule pages.
- Temporarily archived low-priority/internal growth routes by renaming their `page.tsx` files to `page.archived.tsx`.
- Added `docs/GROWTH_RELEASE_9_ARCHIVED_ROUTES.md` so archived routes can be restored gradually.
- Added `experimental.cpus = 1` in `next.config.mjs` to make Cloudflare/Windows builds more stable.

## Why

The site has enough content engines to generate hundreds or thousands of pages. Growth Release 9 intentionally keeps the public static export focused so Google sees higher-quality pages first and Cloudflare builds stay stable.

## Local checks completed

- `npx tsc --noEmit` passed.
- `npm run build` compiled successfully and generated all static pages in the sandbox, but the sandbox process timed out during Next.js build-trace collection. The generated `out/` folder was present. Please still run `npm run build` on your Windows machine before pushing, as your machine previously completed the build successfully.
