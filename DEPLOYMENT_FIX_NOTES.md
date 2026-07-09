# Deployment Fix Notes

This release is a safe Google/Cloudflare deployment build.

## Fixed
- Upgraded Next.js from 14.2.23 to 14.2.35.
- Fixed Analytics environment variable compatibility:
  - NEXT_PUBLIC_GA4_MEASUREMENT_ID
  - NEXT_PUBLIC_GA_MEASUREMENT_ID
  - NEXT_PUBLIC_GA_ID
- Fixed Clarity environment variable compatibility:
  - NEXT_PUBLIC_CLARITY_PROJECT_ID
  - NEXT_PUBLIC_CLARITY_ID
- Added compatibility for Google Search Console verification variables:
  - NEXT_PUBLIC_GSC_VERIFICATION
  - NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
- Reduced the first static indexing batch to avoid very large export builds.
- Archived experimental/internal pages into docs/archived-app-pages so they do not get built or indexed accidentally.

## Verified
- `npx tsc --noEmit --pretty false` passed.
- `npm run build` completed successfully.
- Static export generated 40 pages successfully.

## Important
Do not upload `node_modules`, `.next`, `out`, or `.git` in manual ZIP uploads.
For GitHub, commit the source files only.
