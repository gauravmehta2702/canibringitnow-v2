import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const RULES_FILE = path.join(ROOT, 'src', 'data', 'rules.ts');
const OUT_RULES_DIR = path.join(ROOT, 'out', 'rules');
const SITEMAP_FILE = path.join(ROOT, 'public', 'sitemap.xml');

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function extractRuleSlugs(source) {
  const slugs = [...source.matchAll(/^\s*slug:\s*['"]([^'"]+)['"],?\s*$/gm)].map((match) => match[1]);
  return [...new Set(slugs)];
}

async function main() {
  const source = await fs.readFile(RULES_FILE, 'utf8');
  const slugs = extractRuleSlugs(source);

  if (slugs.length === 0) {
    throw new Error('No rule slugs were found in src/data/rules.ts.');
  }

  const sitemap = await fs.readFile(SITEMAP_FILE, 'utf8');
  const missingPages = [];
  const missingSitemapEntries = [];

  for (const slug of slugs) {
    const exportedPage = path.join(OUT_RULES_DIR, slug, 'index.html');
    if (!(await pathExists(exportedPage))) missingPages.push(slug);

    const expectedUrl = `https://canibringitnow.com/rules/${slug}/`;
    if (!sitemap.includes(`<loc>${expectedUrl}</loc>`)) missingSitemapEntries.push(slug);
  }

  if (missingPages.length || missingSitemapEntries.length) {
    console.error('\nRule route validation failed.');
    if (missingPages.length) {
      console.error(`Missing exported rule pages (${missingPages.length}):`);
      console.error(missingPages.slice(0, 25).join(', '));
      if (missingPages.length > 25) console.error(`...and ${missingPages.length - 25} more.`);
    }
    if (missingSitemapEntries.length) {
      console.error(`Missing sitemap rule URLs (${missingSitemapEntries.length}):`);
      console.error(missingSitemapEntries.slice(0, 25).join(', '));
      if (missingSitemapEntries.length > 25) console.error(`...and ${missingSitemapEntries.length - 25} more.`);
    }
    process.exit(1);
  }

  console.log(`Validated ${slugs.length} exported rule pages and sitemap URLs.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
