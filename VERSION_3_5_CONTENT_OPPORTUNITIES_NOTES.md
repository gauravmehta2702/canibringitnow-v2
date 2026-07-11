# Version 3.5 — Content Opportunities Dashboard

This release adds a local-only operational dashboard for prioritising content improvements.

## Why it is local-only

The current website is a static Cloudflare Pages export and has no authenticated admin backend. Publishing an “admin” route would not make it private. The dashboard is therefore generated into `reports/` on the owner’s computer and is not linked from the public website or included in the sitemap.

## Commands

Generate or refresh the dashboard:

```powershell
npm run content:opportunities
```

Open this file in a browser:

```text
reports\content-opportunities.html
```

The report flags thin source data, generic source notes, stale review dates, duplicated direct answers, weak tags and missing practical detail. Its scores are prioritisation aids, not predictions of Google rankings or AdSense approval.
