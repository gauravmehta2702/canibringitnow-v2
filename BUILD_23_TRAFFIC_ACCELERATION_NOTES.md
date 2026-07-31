# Build 23 — Traffic Acceleration Engine

## Objective
Use real Google Search Console data to prioritise pages already receiving impressions, improve their internal authority, and guide broader travel-industry expansion without inventing search volume.

## Added
- Historical Search Console snapshot dated 2026-07-28.
- Traffic acceleration scoring for rule pages.
- `/traffic-war-room/` internal noindex dashboard.
- Homepage links to high-demand rule pages.
- Query-language context on rule pages.
- Search-demand-aware metadata for proven policy-intent pages.
- Whole-travel-industry expansion map covering airports, destinations/customs, insurance, accommodation, transport and connectivity.

## Important
The Search Console data is a fixed historical snapshot. Replace it with a newer export during a future data refresh.

## Validation
Run:

```bash
npm install
npm run build
```

Build 23 also adds:

```bash
npm run validate:build23
```
