import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const clientPath = path.join(root, 'src', 'components', 'trip', 'TripRuleCheckerClient.tsx');
const returnPath = path.join(root, 'src', 'components', 'trip', 'ReturnToTripChecker.tsx');
const rulePagePath = path.join(root, 'src', 'app', 'rules', '[slug]', 'page.tsx');

const [client, returnComponent, rulePage] = await Promise.all([
  fs.readFile(clientPath, 'utf8'),
  fs.readFile(returnPath, 'utf8'),
  fs.readFile(rulePagePath, 'utf8'),
]);

const checks = [
  [client.includes('localStorage'), 'Trip persistence'],
  [client.includes('target="_blank"'), 'Rule links open in a new tab'],
  [client.includes('Trip readiness'), 'Trip readiness score'],
  [client.includes('Start new trip'), 'Start-new-trip control'],
  [client.includes('Share trip'), 'Share control'],
  [returnComponent.includes('Return to Trip Checker'), 'Return-to-trip banner'],
  [rulePage.includes('<ReturnToTripChecker />'), 'Rule-page integration'],
];

const failed = checks.filter(([passed]) => !passed);
if (failed.length) {
  console.error('Version 3.1 validation failed:');
  failed.forEach(([, label]) => console.error(`- ${label}`));
  process.exit(1);
}

console.log('Validated Version 3.1 persistent Trip Checker workflow.');
