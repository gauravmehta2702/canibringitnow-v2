import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();

const FILES = {
  intelligence: 'src/lib/travelIntelligence.ts',
  tripPage: 'src/app/trip-checker/page.tsx',
  tripClient: 'src/components/trip/TripRuleCheckerClient.tsx',
};

const INTELLIGENCE_MARKERS = [
  'buildTravelIntelligenceReport',
  'TravelIntelligenceReport',
  'readiness',
  'findings',
  'timeline',
  'summary',
];

const TRIP_PAGE_MARKERS = [
  'Trip Packing & Baggage Rule Checker',
  'TripRuleCheckerClient',
];

const TRIP_CLIENT_MARKERS = [
  'Packing decision summary',
  'Trip readiness',
  'buildTravelIntelligenceReport',
  'getTravelGraphContextAlerts',
];

async function readProjectFile(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);

  try {
    return await fs.readFile(absolutePath, 'utf8');
  } catch {
    throw new Error(`Required file is missing: ${relativePath}`);
  }
}

function assertContains(content, marker, filePath) {
  if (!content.includes(marker)) {
    throw new Error(
      `Validation failed: "${marker}" was not found in ${filePath}.`,
    );
  }
}

async function validateFile(relativePath, markers) {
  const content = await readProjectFile(relativePath);

  for (const marker of markers) {
    assertContains(content, marker, relativePath);
  }
}

async function main() {
  await validateFile(
    FILES.intelligence,
    INTELLIGENCE_MARKERS,
  );

  await validateFile(
    FILES.tripPage,
    TRIP_PAGE_MARKERS,
  );

  await validateFile(
    FILES.tripClient,
    TRIP_CLIENT_MARKERS,
  );

  console.log(
    'Validated Version 4 Travel Intelligence report engine, Trip Checker route and client integration.',
  );
}

main().catch((error) => {
  console.error(
    error instanceof Error
      ? error.message
      : error,
  );

  process.exit(1);
});