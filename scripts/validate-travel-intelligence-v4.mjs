import type { RuleStatus } from '@/data/rules';

export type TravellerType =
  | 'general'
  | 'family'
  | 'business'
  | 'student'
  | 'medical'
  | 'photographer';

export type BagMode = 'cabin' | 'checked';

export type TravelProfile = {
  airline: string;
  departure: string;
  destination: string;
  bagMode: BagMode;
  travellerType: TravellerType;
};

export type IntelligenceItem = {
  slug: string;
  item: string;
  category: string;
  shortAnswer: string;
  cabin: RuleStatus;
  checked: RuleStatus;
  warning?: string;
};

export type IntelligenceFinding = {
  id: string;
  severity: 'info' | 'check' | 'warning' | 'blocker';
  title: string;
  detail: string;
};

export type JourneyStage = {
  stage:
    | 'Before leaving home'
    | 'Airport security'
    | 'Boarding and gate check'
    | 'On arrival';
  actions: string[];
};

export type TravelIntelligenceReport = {
  readiness: number;
  label:
    | 'Not ready'
    | 'Needs attention'
    | 'Nearly ready'
    | 'Ready to verify';
  findings: IntelligenceFinding[];
  timeline: JourneyStage[];
  summary: string;
};

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function pluralise(
  count: number,
  singular: string,
  plural = `${singular}s`,
) {
  return count === 1 ? singular : plural;
}

function travellerAdvice(
  travellerType: TravellerType,
): IntelligenceFinding | undefined {
  switch (travellerType) {
    case 'family':
      return {
        id: 'traveller-family',
        severity: 'check',
        title: 'Prepare family items for separate screening',
        detail:
          'Keep baby food, milk, medicines and essential child supplies easy to remove. Allow extra time for security checks.',
      };

    case 'business':
      return {
        id: 'traveller-business',
        severity: 'info',
        title: 'Protect essential work equipment',
        detail:
          'Keep laptops, chargers, batteries, documents and valuables accessible, especially if your cabin bag may be gate checked.',
      };

    case 'student':
      return {
        id: 'traveller-student',
        severity: 'info',
        title: 'Keep documents and essential electronics accessible',
        detail:
          'Carry travel, study and accommodation documents separately from checked baggage. Verify batteries and electronics before departure.',
      };

    case 'medical':
      return {
        id: 'traveller-medical',
        severity: 'warning',
        title: 'Carry medical evidence and essential supplies in cabin baggage',
        detail:
          'Keep medicines labelled and carry prescriptions, medical letters or supporting documents where appropriate. Check temperature and storage requirements.',
      };

    case 'photographer':
      return {
        id: 'traveller-photographer',
        severity: 'check',
        title: 'Check camera batteries and specialist equipment',
        detail:
          'Protect spare battery terminals, keep lithium batteries in cabin baggage and verify restrictions for tripods, drones and oversized equipment.',
      };

    default:
      return undefined;
  }
}

export function buildTravelIntelligenceReport(
  profile: TravelProfile,
  items: IntelligenceItem[],
  contextAlerts: string[] = [],
): TravelIntelligenceReport {
  const findings: IntelligenceFinding[] = [];

  const selectedStatuses = items.map((item) =>
    profile.bagMode === 'cabin'
      ? item.cabin
      : item.checked,
  );

  const blocked = selectedStatuses.filter(
    (status) => status === 'Not allowed',
  ).length;

  const restricted = selectedStatuses.filter(
    (status) => status === 'Restricted',
  ).length;

  const allowed = selectedStatuses.filter(
    (status) => status === 'Allowed',
  ).length;

  const categories = items.map((item) =>
    item.category.toLowerCase(),
  );

  const hasMedication = categories.some((category) =>
    category.includes('medication'),
  );

  const hasBatteryOrElectronic = categories.some(
    (category) =>
      /battery|batteries|electronic|electronics/.test(
        category,
      ),
  );

  const hasFoodOrBabyItem = categories.some((category) =>
    /food|baby|infant|milk|formula/.test(category),
  );

  /*
   * Journey completeness checks
   */

  if (!profile.airline) {
    findings.push({
      id: 'missing-airline',
      severity: 'check',
      title: 'Select the operating airline',
      detail:
        'Airlines can apply stricter baggage, battery, medical-equipment and infant-item rules than general airport guidance.',
    });
  }

  if (!profile.departure) {
    findings.push({
      id: 'missing-departure',
      severity: 'info',
      title: 'Add the departure country',
      detail:
        'Departure security controls screening, liquid restrictions and local exemptions. Adding it makes the report more specific.',
    });
  }

  if (!profile.destination) {
    findings.push({
      id: 'missing-destination',
      severity: 'check',
      title: 'Select the destination',
      detail:
        'Airport security permission does not automatically mean destination customs, biosecurity or medicine rules permit the item.',
    });
  }

  if (items.length === 0) {
    findings.push({
      id: 'missing-items',
      severity: 'check',
      title: 'Add the items you are packing',
      detail:
        'The report becomes useful after at least one item has been selected.',
    });
  }

  /*
   * Item-level decisions
   */

  items.forEach((item) => {
    const status =
      profile.bagMode === 'cabin'
        ? item.cabin
        : item.checked;

    if (status === 'Not allowed') {
      findings.push({
        id: `blocked-${item.slug}`,
        severity: 'blocker',
        title: `${item.item} is not allowed in this bag`,
        detail:
          item.warning ||
          `${item.shortAnswer} Remove it, change bags or confirm an authorised alternative before travelling.`,
      });

      return;
    }

    if (status === 'Restricted') {
      findings.push({
        id: `restricted-${item.slug}`,
        severity: 'warning',
        title: `${item.item} needs additional checks`,
        detail:
          item.warning ||
          `${item.shortAnswer} Verify quantity, size, documentation and airline-specific conditions before departure.`,
      });
    }
  });

  /*
   * Knowledge-graph context alerts
   */

  contextAlerts.forEach((detail, index) => {
    const isAirlineMismatch =
      detail.includes('selected airline') ||
      detail.includes('another airline');

    const isDestinationMismatch =
      detail.includes('selected destination') ||
      detail.includes('customs');

    const isSourceGap =
      detail.includes('official-source') ||
      detail.includes('official source');

    let title = 'Important journey-context check';

    if (isAirlineMismatch) {
      title = 'Selected rule and airline do not match';
    } else if (isDestinationMismatch) {
      title = 'Selected rule and destination may not match';
    } else if (isSourceGap) {
      title = 'Official verification is still required';
    }

    findings.push({
      id: `context-${index}`,
      severity: 'warning',
      title,
      detail,
    });
  });

  /*
   * Category-specific advice
   */

  if (hasMedication) {
    findings.push({
      id: 'medical-documents',
      severity:
        profile.travellerType === 'medical'
          ? 'warning'
          : 'check',
      title: 'Carry medicine documents',
      detail:
        'Keep medicines in labelled packaging and carry a prescription, doctor letter or supporting evidence where appropriate. Controlled medicines can have destination-specific rules.',
    });
  }

  if (hasBatteryOrElectronic) {
    findings.push({
      id: 'battery-access',
      severity: 'check',
      title: 'Keep lithium batteries accessible',
      detail:
        'Power banks and spare lithium batteries normally belong in cabin baggage. Protect terminals and check watt-hour and quantity limits.',
    });
  }

  if (hasFoodOrBabyItem) {
    findings.push({
      id: 'customs-food',
      severity: 'check',
      title: 'Security permission is not customs permission',
      detail:
        'Baby-food and liquid screening exceptions do not override destination biosecurity, food-import or declaration requirements.',
    });
  }

  const tailoredAdvice = travellerAdvice(
    profile.travellerType,
  );

  if (tailoredAdvice) {
    findings.push(tailoredAdvice);
  }

  /*
   * Transparent readiness calculation
   */

  let readiness = 20;

  if (profile.airline) {
    readiness += 12;
  }

  if (profile.departure) {
    readiness += 8;
  }

  if (profile.destination) {
    readiness += 12;
  }

  if (profile.bagMode) {
    readiness += 8;
  }

  if (items.length > 0) {
    readiness += Math.min(18, items.length * 6);
  }

  if (allowed > 0) {
    readiness += Math.min(10, allowed * 3);
  }

  readiness -= blocked * 28;
  readiness -= restricted * 10;
  readiness -= Math.min(18, contextAlerts.length * 4);

  if (hasMedication) {
    readiness -= 3;
  }

  if (hasBatteryOrElectronic) {
    readiness -= 2;
  }

  if (hasFoodOrBabyItem && profile.destination) {
    readiness -= 3;
  }

  readiness = Math.max(
    0,
    Math.min(100, readiness),
  );

  const label: TravelIntelligenceReport['label'] =
    readiness < 40
      ? 'Not ready'
      : readiness < 65
        ? 'Needs attention'
        : readiness < 85
          ? 'Nearly ready'
          : 'Ready to verify';

  /*
   * Journey timeline
   */

  const beforeHome = unique([
    profile.airline
      ? `Confirm ${profile.airline}'s current baggage and restricted-item policies.`
      : 'Select the operating airline and confirm its current baggage policy.',

    profile.destination
      ? `Review ${profile.destination} customs, medicine and declaration guidance.`
      : 'Add a destination to receive customs and arrival reminders.',

    blocked > 0
      ? `Remove or repack ${blocked} ${pluralise(
          blocked,
          'item',
        )} marked not allowed.`
      : 'Keep important rule pages and supporting documents available offline.',

    contextAlerts.length > 0
      ? 'Resolve every airline, destination and official-source warning before departure.'
      : '',

    hasMedication
      ? 'Pack prescriptions, doctor letters and medicine documents where appropriate.'
      : '',

    hasBatteryOrElectronic
      ? 'Check lithium-battery watt-hour and quantity limits.'
      : '',
  ]);

  const security = unique([
    'Keep liquids, medication, batteries and baby supplies easy to remove for screening.',

    hasBatteryOrElectronic
      ? 'Protect spare battery terminals and keep power banks in cabin baggage.'
      : '',

    hasMedication
      ? 'Present medicine documents if requested.'
      : '',

    hasFoodOrBabyItem
      ? 'Expect baby food, milk or formula to be screened separately.'
      : '',
  ]);

  const boarding = unique([
    'Be ready to remove valuables, medicines and batteries if the cabin bag is gate checked.',

    'Follow the operating carrier when a codeshare itinerary names more than one airline.',

    restricted > 0
      ? `Keep evidence for ${restricted} restricted ${pluralise(
          restricted,
          'item',
        )} accessible.`
      : '',
  ]);

  const arrival = unique([
    profile.destination
      ? `Read the ${profile.destination} declaration carefully and declare uncertain goods.`
      : 'Check destination declarations before arrival.',

    hasFoodOrBabyItem
      ? 'Declare food, plant, animal or agricultural products when required.'
      : '',

    hasMedication
      ? 'Keep medicines and supporting documents available until customs checks are complete.'
      : '',
  ]);

  /*
   * Plain-language summary
   */

  let summary =
    'Add your journey and packing list to generate a personalised report.';

  if (items.length > 0) {
    if (blocked > 0) {
      summary = `${blocked} ${pluralise(
        blocked,
        'item',
      )} must be removed or repacked before travel.`;
    } else if (restricted > 0) {
      summary = `${restricted} ${pluralise(
        restricted,
        'item',
      )} need additional checks, documents or approval.`;
    } else if (contextAlerts.length > 0) {
      summary =
        'The selected bag contains no prohibited item, but airline, destination or official-source checks remain unresolved.';
    } else {
      summary =
        'No prohibited item was found in the selected bag. Complete the final airline, airport and destination checks before travelling.';
    }
  }

  return {
    readiness,
    label,
    findings: findings.slice(0, 16),

    timeline: [
      {
        stage: 'Before leaving home',
        actions: beforeHome,
      },
      {
        stage: 'Airport security',
        actions: security,
      },
      {
        stage: 'Boarding and gate check',
        actions: boarding,
      },
      {
        stage: 'On arrival',
        actions: arrival,
      },
    ],

    summary,
  };
}