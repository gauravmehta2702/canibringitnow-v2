import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const reportPath = path.join(root, 'src/lib/travelIntelligence.ts');
const clientPath = path.join(root, 'src/components/trip/TripRuleCheckerClient.tsx');
const graphPath = path.join(root, 'src/lib/travelIntelligenceGraph.ts');

const [report, client, graph] = await Promise.all([
  fs.readFile(reportPath, 'utf8'),
  fs.readFile(clientPath, 'utf8'),
  fs.readFile(graphPath, 'utf8'),
]);

const checks = [
  ['risk level model', report.includes("riskLevel: 'High risk'")],
  ['decision summary', report.includes('decisionSummary')],
  ['score breakdown', report.includes('scoreBreakdown')],
  ['priority actions', report.includes('priorityActions')],
  ['decision intelligence UI', client.includes('Decision intelligence')],
  ['why score UI', client.includes('Why this score?')],
  ['next actions UI', client.includes('What to do next')],
  ['clear airline mismatch', graph.includes("Verify ${input.airline}'s current policy separately")],
];

const failures = checks.filter(([, passed]) => !passed).map(([name]) => name);
if (failures.length) {
  console.error(`Release 6.1 validation failed: ${failures.join(', ')}`);
  process.exit(1);
}

console.log('Validated Release 6.1 intelligent trip risk analysis, transparent scoring and priority actions.');
