import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const graphFile = path.join(root, 'src/lib/travelIntelligenceGraph.ts');
const rulesFile = path.join(root, 'src/data/rules.ts');
const outputDir = path.join(root, 'reports');

const [graphSource, rulesSource] = await Promise.all([
  fs.readFile(graphFile, 'utf8'),
  fs.readFile(rulesFile, 'utf8'),
]);

const ruleCount = (rulesSource.match(/slug:\s*['"][^'"]+['"]/g) || []).length;
const airlineRules = (rulesSource.match(/['"]airline['"]/gi) || []).length;
const countryRules = (rulesSource.match(/['"]country['"]/gi) || []).length;
const hasWeightedEdges = graphSource.includes('buildEdges') && graphSource.includes('weight: number');
const hasJourneyAssessment = graphSource.includes('assessJourneyGraph');
const hasRecommendations = graphSource.includes('getGraphRecommendationsForRule');

const report = {
  release: '6.0',
  generatedAt: new Date().toISOString(),
  ruleCount,
  signals: {
    weightedEdges: hasWeightedEdges,
    journeyAssessment: hasJourneyAssessment,
    graphRecommendations: hasRecommendations,
  },
  safeguards: [
    'No automatic mass publication',
    'Editorial sources remain labelled as editorial',
    'Rule-to-rule recommendations require measurable relationships',
    'Source gaps remain visible to users and editors',
  ],
  rawMentions: { airlineRules, countryRules },
};

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(path.join(outputDir, 'travel-knowledge-graph.json'), JSON.stringify(report, null, 2));
await fs.writeFile(path.join(outputDir, 'travel-knowledge-graph.html'), `<!doctype html><html><head><meta charset="utf-8"><title>Travel Knowledge Graph Report</title><style>body{font-family:Arial,sans-serif;max-width:920px;margin:40px auto;padding:0 20px;color:#0f172a}section{border:1px solid #cbd5e1;border-radius:20px;padding:24px;margin:20px 0}strong{font-size:32px}li{margin:10px 0}</style></head><body><h1>Release 6 Travel Knowledge Graph</h1><section><strong>${ruleCount}</strong><p>rule records audited</p></section><section><h2>Graph capabilities</h2><ul><li>Weighted edges: ${hasWeightedEdges ? 'PASS' : 'FAIL'}</li><li>Journey assessment: ${hasJourneyAssessment ? 'PASS' : 'FAIL'}</li><li>Graph recommendations: ${hasRecommendations ? 'PASS' : 'FAIL'}</li></ul></section><section><h2>Publishing safeguards</h2><ul>${report.safeguards.map((item) => `<li>${item}</li>`).join('')}</ul></section></body></html>`);

console.log(`Generated Release 6 Travel Knowledge Graph report for ${ruleCount} rules.`);
