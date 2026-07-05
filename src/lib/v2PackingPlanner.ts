export type PackingInput = {
  destination: string;
  airline: string;
  days: number;
  withBaby?: boolean;
  withMedication?: boolean;
  withElectronics?: boolean;
};

export function generatePackingPlan(input: PackingInput) {
  const base = [
    'Passport / ID',
    'Tickets and booking references',
    'Travel insurance documents',
    'Phone and charger',
    'Clothes for trip length',
    'Toiletries in travel-size containers',
  ];

  const extras = [
    input.withElectronics ? 'Power bank, adapters and cable organiser' : '',
    input.withMedication ? 'Medication, prescription and doctor letter if needed' : '',
    input.withBaby ? 'Baby formula, bottles, nappies, wipes and spare clothes' : '',
    input.destination ? `Check customs rules for ${input.destination}` : '',
    input.airline ? `Check baggage rules for ${input.airline}` : '',
  ].filter(Boolean);

  return {
    title: `${input.days || 7}-day packing plan for ${input.destination || 'your destination'}`,
    summary: `Plan for ${input.airline || 'your airline'} with ${base.length + extras.length} recommended checks.`,
    items: [...base, ...extras],
  };
}
