import { promises as fs } from 'node:fs';

const files = {
  client: 'src/components/trip/TripRuleCheckerClient.tsx',
  tools: 'src/lib/travelLaunchTools.ts',
};

const [client, tools] = await Promise.all([
  fs.readFile(files.client, 'utf8'),
  fs.readFile(files.tools, 'utf8'),
]);

const checks = [
  [client.includes('Smart packing checklist'), 'Smart packing checklist UI missing'],
  [client.includes('Guided packing assistant'), 'Guided packing assistant UI missing'],
  [client.includes('Copy trip link'), 'Shareable trip-link action missing'],
  [client.includes('packing_checklist_generated'), 'Checklist analytics event missing'],
  [client.includes('packing_assistant_query'), 'Packing-assistant analytics event missing'],
  [client.includes('trip_share_link_created'), 'Share-link analytics event missing'],
  [tools.includes('buildSmartPackingChecklist'), 'Checklist generator missing'],
  [tools.includes('findPackingAssistantMatches'), 'Assistant matching engine missing'],
  [tools.includes('encodeShareableTrip'), 'Trip-link encoder missing'],
  [tools.includes('decodeShareableTrip'), 'Trip-link decoder missing'],
];

const failures = checks.filter(([passed]) => !passed).map(([, message]) => message);
if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Validated Version 7.0 Launch Edition: checklist, guided assistant, saved progress, shareable trip links and analytics events.');
