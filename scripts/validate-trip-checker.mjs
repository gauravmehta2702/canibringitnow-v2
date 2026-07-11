import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const required = [
  path.join(root, 'src/app/trip-checker/page.tsx'),
  path.join(root, 'src/components/trip/TripRuleCheckerClient.tsx'),
  path.join(root, 'out/trip-checker/index.html'),
  path.join(root, 'out/sitemap.xml'),
];

for (const file of required) {
  try {
    await fs.access(file);
  } catch {
    console.error(`Trip checker validation failed: missing ${path.relative(root, file)}`);
    process.exit(1);
  }
}

const sitemap = await fs.readFile(path.join(root, 'out/sitemap.xml'), 'utf8');
if (!sitemap.includes('https://canibringitnow.com/trip-checker/')) {
  console.error('Trip checker validation failed: /trip-checker/ is missing from sitemap.xml');
  process.exit(1);
}

const footer = await fs.readFile(path.join(root, 'src/components/SiteFooter.tsx'), 'utf8');
if (!footer.includes("'/trip-checker/'")) {
  console.error('Trip checker validation failed: global footer does not link to /trip-checker/.');
  process.exit(1);
}

console.log('Validated Trip Packing & Baggage Rule Checker route, sitemap and footer integration.');
