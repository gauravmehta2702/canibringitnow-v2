import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const out = path.join(root, 'out');
const dataFile = path.join(root, 'src', 'data', 'knowledgeGuides.ts');
const sitemapFile = path.join(out, 'sitemap.xml');

async function exists(file) { try { await fs.access(file); return true; } catch { return false; } }

const source = await fs.readFile(dataFile, 'utf8');
const slugs = [...source.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);
if (slugs.length < 8) throw new Error(`Authority validation failed: expected at least 8 guides, found ${slugs.length}.`);
if (!(await exists(path.join(out, 'guides', 'index.html')))) throw new Error('Authority validation failed: /guides/ hub was not exported.');
const sitemap = await fs.readFile(sitemapFile, 'utf8');
const missing = [];
for (const slug of slugs) {
  if (!(await exists(path.join(out, 'guides', slug, 'index.html')))) missing.push(`/guides/${slug}/ export`);
  if (!sitemap.includes(`https://canibringitnow.com/guides/${slug}/`)) missing.push(`/guides/${slug}/ sitemap`);
}
const rulePage = await fs.readFile(path.join(root, 'src', 'app', 'rules', '[slug]', 'page.tsx'), 'utf8');
if (!rulePage.includes('RuleKnowledgeGuides')) missing.push('rule-page knowledge-centre integration');
const footer = await fs.readFile(path.join(root, 'src', 'components', 'SiteFooter.tsx'), 'utf8');
if (!footer.includes("'/guides/'")) missing.push('global footer Guides link');
if (missing.length) throw new Error(`Authority validation failed:\n- ${missing.join('\n- ')}`);
console.log(`Validated ${slugs.length} knowledge guides, sitemap coverage, footer navigation and rule-page integration.`);
