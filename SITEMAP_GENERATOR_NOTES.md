# Complete Static Sitemap Generator

The sitemap is generated automatically after every successful `npm run build`.

## How it works

- Next.js exports the website to `out/`.
- `scripts/generate-sitemap.mjs` scans the exported HTML pages.
- Internal planning, QA, launch and operational routes are excluded.
- The complete sitemap is written to both `out/sitemap.xml` and `public/sitemap.xml`.
- Cloudflare deploys the generated file from `out/`.

## Verification

Run:

```bash
npm run build
```

The final lines should include:

```text
Generated sitemap.xml with ... public URLs.
```

Then inspect `out/sitemap.xml` or run `npm run dev` and open `/sitemap.xml`.
