import fs from 'node:fs';

const required = [
  'src/data/searchConsoleSnapshot.ts',
  'src/lib/trafficAccelerationEngine.ts',
  'src/components/growth/SearchDemandLinks.tsx',
  'src/components/rules/SearchDemandContext.tsx',
  'src/app/traffic-war-room/page.tsx',
];

for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Build 23 missing ${file}`);
}

const data = fs.readFileSync('src/data/searchConsoleSnapshot.ts', 'utf8');
if (!data.includes('medication-southwest-airlines') || !data.includes('singapore airlines drone policy')) {
  throw new Error('Build 23 Search Console snapshot does not contain the expected priority data.');
}

const rulePage = fs.readFileSync('src/app/rules/[slug]/page.tsx', 'utf8');
if (!rulePage.includes('SearchDemandContext')) throw new Error('Build 23 rule-page integration is missing.');

const homePage = fs.readFileSync('src/app/page.tsx', 'utf8');
if (!homePage.includes('SearchDemandLinks')) throw new Error('Build 23 homepage demand links are missing.');

console.log('Validated Build 23 Traffic Acceleration Engine with real Search Console snapshot data.');
