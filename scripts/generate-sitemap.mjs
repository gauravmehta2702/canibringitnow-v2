import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'out');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SITE_URL = 'https://canibringitnow.com';

// Internal planning, QA and operational pages must not be advertised to search engines.
const EXCLUDED_PREFIXES = [
  '/_next/', '/404/', '/offline/',
  '/adsense-layout/', '/affiliate-components/', '/ai-content-factory/',
  '/ai-marketing-seeds/', '/analytics-intelligence/', '/analytics-plan/',
  '/analytics-setup/', '/atlas-audit/', '/authority-clusters/',
  '/backlink-outreach-hub/', '/backlink-resources/', '/content-expansion-queue/',
  '/content-qa-checklist/', '/ctr-booster/', '/editorial-calendar/',
  '/g10-complete/', '/growth-command-center/', '/growth-command-centre/',
  '/growth-engine/', '/growth-release-9/', '/high-intent-page-factory/',
  '/home-2/', '/indexable-pages-map/', '/indexing-control/',
  '/internal-link-optimizer/', '/internal-links/', '/launch-control/',
  '/launch-readiness/', '/manual-work-reducer/', '/newsletter-starter/',
  '/next-30-days/', '/official-source-center/', '/orbit/',
  '/orbit-international/', '/orbit-release-2/', '/orbit-release-3/',
  '/orbit-release-4/', '/orbit-release-6/', '/orbit-release-7/',
  '/orbit-sitemap/', '/page-refresh-queue/', '/pinterest-pin-factory/',
  '/production-dashboard/', '/qa/', '/quality-audit/',
  '/revenue-intelligence/', '/revenue-launch/', '/revenue-readiness-score/',
  '/revenue-safe-zones/', '/search-console-action-plan/', '/seo-health-monitor/',
  '/seo-network/', '/seo-scale/', '/social-distribution-plan/',
  '/social-export-studio/', '/topic-clusters/', '/topics/',
  '/traffic-command/', '/traffic-magnets/', '/trust-source-policy/',
  '/utm-campaign-builder/', '/v2-foundation/', '/v2-travel-brain/',
  '/v3-core/', '/video-script-factory/', '/visitor-retention-engine/',
  '/growth/', '/growth8/', '/growth9/', '/intelligence/', '/launch/',
  '/marketing/', '/orbit2/'
];

const LOW_PRIORITY_PREFIXES = ['/privacy/', '/terms/', '/contact/', '/disclaimer/'];
const HIGH_PRIORITY_PREFIXES = ['/rules/', '/items/', '/airlines/', '/countries/', '/categories/', '/questions/'];

function normalizeRoute(filePath) {
  const relative = path.relative(OUT_DIR, filePath).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative.endsWith('/index.html')) return `/${relative.slice(0, -'index.html'.length)}`;
  if (relative.endsWith('.html')) return `/${relative.slice(0, -'.html'.length)}/`;
  return null;
}

function shouldInclude(route) {
  if (!route || route.includes('[') || route.includes(']')) return false;
  return !EXCLUDED_PREFIXES.some((prefix) => route === prefix || route.startsWith(prefix));
}

function priorityFor(route) {
  if (route === '/') return '1.0';
  if (HIGH_PRIORITY_PREFIXES.some((prefix) => route.startsWith(prefix))) return '0.8';
  if (LOW_PRIORITY_PREFIXES.some((prefix) => route.startsWith(prefix))) return '0.3';
  return '0.6';
}

function changeFrequencyFor(route) {
  if (route === '/') return 'weekly';
  if (HIGH_PRIORITY_PREFIXES.some((prefix) => route.startsWith(prefix))) return 'monthly';
  if (LOW_PRIORITY_PREFIXES.some((prefix) => route.startsWith(prefix))) return 'yearly';
  return 'monthly';
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else if (entry.isFile() && entry.name === 'index.html') files.push(fullPath);
  }
  return files;
}

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

async function main() {
  try {
    await fs.access(OUT_DIR);
  } catch {
    console.error('Sitemap generation failed: the out directory does not exist. Run next build first.');
    process.exit(1);
  }

  const htmlFiles = await walk(OUT_DIR);
  const routes = [...new Set(htmlFiles.map(normalizeRoute).filter(shouldInclude))].sort((a, b) => {
    if (a === '/') return -1;
    if (b === '/') return 1;
    return a.localeCompare(b);
  });

  const buildDate = new Date().toISOString();
  const entries = routes.map((route) => [
    '  <url>',
    `    <loc>${escapeXml(`${SITE_URL}${route}`)}</loc>`,
    `    <lastmod>${buildDate}</lastmod>`,
    `    <changefreq>${changeFrequencyFor(route)}</changefreq>`,
    `    <priority>${priorityFor(route)}</priority>`,
    '  </url>'
  ].join('\n')).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(OUT_DIR, 'sitemap.xml'), xml, 'utf8'),
    fs.writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8'),
  ]);

  console.log(`Generated sitemap.xml with ${routes.length} public URLs.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
