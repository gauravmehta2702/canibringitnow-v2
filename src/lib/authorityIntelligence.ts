import type { UniversalContentPage } from '@/lib/contentEngine';

export type IntelligenceSection = {
  title: string;
  body: string;
  bullets: string[];
};

export type AuthorityIntelligence = {
  intro: string;
  confidence: 'High' | 'Medium' | 'Check before travel';
  sections: IntelligenceSection[];
  officialChecks: string[];
  alerts: string[];
};

const airlineNotes: Record<string, string[]> = {
  ryanair: ['Low-cost fare types can have different cabin-bag entitlements.', 'Confirm priority-bag and checked-bag dimensions before departure.'],
  easyjet: ['Cabin-bag entitlement depends on fare and seat selection.', 'Large cabin bags normally require the relevant booking option.'],
  'british-airways': ['Allowance can vary by cabin and route.', 'Partner-operated flights may apply the operating carrier’s rules.'],
  emirates: ['Route and cabin class can affect baggage allowances.', 'Lithium batteries and smart baggage require extra checks.'],
  'qatar-airways': ['Allowance can vary by route, cabin and ticket conditions.', 'Partner-operated sectors may follow another carrier’s policy.'],
  'air-india': ['Domestic and international allowances can differ.', 'Check the operating carrier on codeshare journeys.'],
};

const countryAlerts: Record<string, string[]> = {
  australia: ['Australia applies strict biosecurity controls to food, plant and animal products.', 'Declare uncertain food or natural products rather than risking a penalty.'],
  japan: ['Some prescription and controlled medicines need advance permission.', 'Food, meat and plant products may be restricted at customs.'],
  india: ['High-value goods, cash and certain electronics can require declaration.', 'Carry prescriptions for important or controlled medicines.'],
  usa: ['Agricultural and food products must be declared on arrival.', 'Airport security rules and customs import rules are separate checks.'],
  uae: ['Some medicines legal elsewhere may be controlled in the UAE.', 'Check medicine approval and documentation requirements before departure.'],
  singapore: ['Controlled medicines and prohibited items are enforced strictly.', 'Declare restricted goods and verify current customs limits.'],
  canada: ['Food, plant and animal products must be declared.', 'Controlled medicines should remain labelled with supporting documents.'],
  thailand: ['Medication and import rules can differ from your departure country.', 'Declare restricted goods and check limits for tobacco, alcohol and food.'],
};

function genericAirline(page: UniversalContentPage): AuthorityIntelligence {
  const special = airlineNotes[page.slug] ?? [];
  return {
    intro: `${page.name} rules should be checked at two levels: the airline’s current baggage policy and the airport or national rules that apply to the journey. The operating carrier makes the final baggage decision.`,
    confidence: page.rules.length >= 6 ? 'High' : 'Medium',
    alerts: special,
    officialChecks: [
      `${page.name} cabin baggage page`,
      `${page.name} checked baggage and restricted items page`,
      'Departure-airport security guidance',
      'Destination customs authority',
    ],
    sections: [
      {
        title: 'Cabin baggage overview',
        body: `Check the fare, route and operating carrier before relying on a general ${page.name} allowance. Size, weight and personal-item rules may differ by ticket.`,
        bullets: ['Measure the bag including wheels and handles.', 'Keep medicines, documents and permitted spare batteries accessible.', 'Expect gate checks on busy or full flights.'],
      },
      {
        title: 'Checked baggage and restricted items',
        body: 'Checked baggage rules cover both allowance and safety restrictions. An item can fit within the weight limit but still be prohibited because of batteries, pressure, flammability or security concerns.',
        bullets: ['Do not place spare lithium batteries or power banks in checked baggage.', 'Protect fragile and valuable items.', 'Review sports equipment and special-baggage rules before paying for baggage.'],
      },
      {
        title: 'Batteries, electronics and smart bags',
        body: 'Battery-powered devices are commonly accepted, but spare batteries and power banks normally belong in cabin baggage. Large batteries may need airline approval.',
        bullets: ['Check the watt-hour rating.', 'Protect exposed terminals.', 'Confirm whether a smart-bag battery must be removable.'],
      },
      {
        title: 'Liquids, medication and family travel',
        body: 'Airport security controls liquids, while the airline controls onboard and baggage acceptance. Medication and baby supplies may have exceptions, but extra screening is possible.',
        bullets: ['Keep prescriptions or supporting letters for important medicine.', 'Pack baby supplies in an accessible way.', 'Check local security rules for liquids and gels.'],
      },
      {
        title: 'Codeshares and connecting journeys',
        body: 'A ticket sold by one airline may be operated by another. The operating carrier’s restrictions and the strictest airport on the itinerary can determine what is accepted.',
        bullets: ['Check every flight number and operating carrier.', 'Review transit-airport restrictions.', 'Reconfirm rules if the itinerary changes.'],
      },
    ],
  };
}

function genericCountry(page: UniversalContentPage): AuthorityIntelligence {
  const alerts = countryAlerts[page.slug] ?? [];
  return {
    intro: `Travelling to ${page.name} involves both aviation-security rules and destination import rules. Passing departure security does not automatically mean an item can legally enter ${page.name}.`,
    confidence: alerts.length ? 'High' : 'Medium',
    alerts,
    officialChecks: [
      `${page.name} customs authority`,
      `${page.name} government travel or border guidance`,
      'Departure-airport security guidance',
      'Operating airline restricted-items policy',
    ],
    sections: [
      {
        title: 'Customs and declarations',
        body: `Check what must be declared when entering ${page.name}. Personal goods can still be restricted by value, quantity, purpose or product type.`,
        bullets: ['Declare goods when uncertain.', 'Keep receipts for high-value items.', 'Separate personal-use goods from commercial quantities.'],
      },
      {
        title: 'Food, plants and animal products',
        body: 'Food and biosecurity rules vary widely. Packaged food may be accepted while fresh meat, dairy, fruit, seeds or plants are restricted.',
        bullets: ['Read the arrival declaration carefully.', 'Keep food in original labelled packaging.', 'Do not hide food or agricultural products.'],
      },
      {
        title: 'Medication and health items',
        body: `A medicine allowed on the aircraft may still be controlled in ${page.name}. Check the active ingredient, quantity and documentation requirements.`,
        bullets: ['Carry medicine in original packaging.', 'Bring a prescription or doctor letter.', 'Check controlled-drug rules well before travel.'],
      },
      {
        title: 'Cash, duty-free and valuable goods',
        body: 'Cash-declaration thresholds and duty-free allowances are separate from airline baggage limits. Exceeding an allowance can lead to tax, seizure or penalties.',
        bullets: ['Check current cash thresholds.', 'Keep duty-free receipts.', 'Declare expensive gifts or commercial goods where required.'],
      },
      {
        title: 'Electronics, batteries and communications equipment',
        body: 'Normal personal electronics are often accepted, but high-value devices, drones, radio equipment and large batteries can attract extra checks.',
        bullets: ['Carry power banks in cabin baggage.', 'Check drone and radio-equipment rules.', 'Back up important data before travel.'],
      },
    ],
  };
}

export function getAuthorityIntelligence(page: UniversalContentPage): AuthorityIntelligence | null {
  if (page.kind === 'airline') return genericAirline(page);
  if (page.kind === 'country') return genericCountry(page);
  return null;
}

export function getTripContextAlerts(airline: string, destination: string, categories: string[]) {
  const alerts: string[] = [];
  const airlineKey = airline.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const countryKey = destination.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  if (airline && airlineNotes[airlineKey]) alerts.push(...airlineNotes[airlineKey]);
  if (destination && countryAlerts[countryKey]) alerts.push(...countryAlerts[countryKey]);
  if (categories.some((value) => /battery/i.test(value))) alerts.push('Keep power banks and spare lithium batteries in cabin baggage and check watt-hour limits.');
  if (categories.some((value) => /medication/i.test(value))) alerts.push('Check destination medicine controls and carry supporting documents.');
  if (categories.some((value) => /food|baby/i.test(value))) alerts.push('Airport-security exceptions do not override destination customs and biosecurity rules.');
  if (categories.some((value) => /liquid|cosmetic/i.test(value))) alerts.push('Confirm the departure airport’s cabin-liquid limit and pack larger containers in checked baggage where permitted.');

  return Array.from(new Set(alerts)).slice(0, 6);
}
