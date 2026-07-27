export type TravelService = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  searchIntents: string[];
  questions: { question: string; answer: string }[];
  checklist: string[];
  related: { label: string; href: string }[];
};

export const travelServices: TravelService[] = [
  {
    slug: 'travel-insurance', name: 'Travel insurance', eyebrow: 'Protect your trip',
    description: 'Understand what to compare before buying cover, including medical expenses, cancellation, baggage, delays and activity exclusions.',
    searchIntents: ['travel insurance for families', 'travel insurance for USA trips', 'annual travel insurance', 'cover for pre-existing conditions'],
    checklist: ['Check medical-expense limits', 'Review cancellation and curtailment cover', 'Declare relevant medical conditions', 'Confirm activities and destinations are covered', 'Read excesses and exclusions'],
    questions: [
      { question: 'When should I buy travel insurance?', answer: 'Many travellers buy cover soon after booking so eligible cancellation risks may be covered from the policy start date. Always check the policy wording.' },
      { question: 'Does every policy cover existing medical conditions?', answer: 'No. Conditions may need to be declared and accepted, excluded, or covered for an additional premium.' },
      { question: 'Is the cheapest policy always suitable?', answer: 'Not necessarily. Compare limits, excesses, exclusions and the risks that matter for your trip rather than price alone.' },
    ],
    related: [{ label: 'Travel checklist builder', href: '/tools/travel-checklist-builder/' }, { label: 'Passport validity checker', href: '/tools/passport-validity-checker/' }, { label: 'Before you fly', href: '/before-you-fly/' }],
  },
  {
    slug: 'airport-hotels', name: 'Airport hotels', eyebrow: 'Sleep closer to your flight',
    description: 'Choose an airport hotel by terminal access, transfer time, shuttle arrangements, family needs and early-departure practicality.',
    searchIntents: ['hotels near airport terminals', 'walking distance airport hotels', 'airport hotel with parking', 'family airport hotels'],
    checklist: ['Confirm the correct airport and terminal', 'Check walking route or shuttle timetable', 'Verify early breakfast availability', 'Compare parking packages', 'Check cancellation terms'],
    questions: [
      { question: 'Is “near the airport” the same as walking distance?', answer: 'No. Some hotels described as nearby still require a shuttle, taxi or public transport. Check the exact terminal route.' },
      { question: 'Should I book the night before an early flight?', answer: 'It can reduce travel risk and stress, especially where public transport is limited early in the morning.' },
      { question: 'What should families check?', answer: 'Room capacity, cot availability, shuttle accessibility, breakfast times and the distance from the terminal are useful checks.' },
    ],
    related: [{ label: 'Airport guides', href: '/airport-guides/' }, { label: 'Travel budget calculator', href: '/tools/travel-budget-calculator/' }, { label: 'Destination guides', href: '/destination-guides/' }],
  },
  {
    slug: 'car-hire', name: 'Car hire', eyebrow: 'Drive at your destination',
    description: 'Compare collection locations, insurance terms, deposits, fuel policies, mileage and driver requirements before reserving a vehicle.',
    searchIntents: ['airport car hire', 'car hire without hidden fees', 'family car rental', 'one way car hire'],
    checklist: ['Check licence and age requirements', 'Understand the deposit and excess', 'Compare fuel policies', 'Inspect mileage limits', 'Photograph the vehicle at collection and return'],
    questions: [
      { question: 'Why can the collection price differ from the advertised price?', answer: 'Extras such as insurance upgrades, additional drivers, child seats, fuel and location fees can change the final cost.' },
      { question: 'What is a rental-car excess?', answer: 'It is the amount you may remain responsible for after an insured incident, subject to the rental agreement.' },
      { question: 'Should I choose airport or off-airport collection?', answer: 'Airport collection is convenient, while off-airport sites can sometimes be cheaper. Include transfer time and fees in the comparison.' },
    ],
    related: [{ label: 'Travel budget calculator', href: '/tools/travel-budget-calculator/' }, { label: 'Destination intelligence', href: '/destination-intelligence/' }, { label: 'Country guides', href: '/country-guides/' }],
  },
  {
    slug: 'airport-parking', name: 'Airport parking', eyebrow: 'Plan your departure',
    description: 'Compare short stay, long stay, meet-and-greet and hotel parking options by terminal, transfer time and security arrangements.',
    searchIntents: ['cheap airport parking', 'airport meet and greet parking', 'terminal parking', 'airport hotel parking package'],
    checklist: ['Match parking to the correct terminal', 'Allow time for shuttle transfers', 'Check vehicle-key arrangements', 'Review cancellation terms', 'Record the car condition and mileage'],
    questions: [
      { question: 'What is meet-and-greet parking?', answer: 'A driver usually meets you near the terminal and parks the vehicle at an off-site or designated facility. Check the operator and handover instructions.' },
      { question: 'How early should I arrive?', answer: 'Add the operator’s recommended transfer or handover time to the airport’s own check-in guidance.' },
      { question: 'Is the cheapest parking always best?', answer: 'Consider transfer frequency, distance, security, cancellation flexibility and terminal convenience as well as price.' },
    ],
    related: [{ label: 'Airport guides', href: '/airport-guides/' }, { label: 'Airport delay readiness checker', href: '/tools/airport-delay-readiness-checker/' }, { label: 'Before you fly', href: '/before-you-fly/' }],
  },
  {
    slug: 'airport-transfers', name: 'Airport transfers', eyebrow: 'Get to and from the airport',
    description: 'Compare trains, buses, taxis, private transfers and shared shuttles using total journey time, luggage needs and arrival time.',
    searchIntents: ['airport transfer to city centre', 'airport taxi cost', 'late night airport transport', 'private airport transfer'],
    checklist: ['Check operating hours', 'Allow for immigration and baggage collection', 'Confirm luggage capacity', 'Use a clear meeting point', 'Keep the provider contact details'],
    questions: [
      { question: 'Should I pre-book an airport transfer?', answer: 'Pre-booking can be useful for late arrivals, larger groups, accessibility needs or destinations with limited public transport.' },
      { question: 'How much connection time should I allow?', answer: 'Allow for immigration, baggage collection, walking time and possible delays before committing to a fixed departure.' },
      { question: 'Are taxis always faster than trains?', answer: 'Not always. Traffic, terminal location and the destination can make rail or metro services faster on some routes.' },
    ],
    related: [{ label: 'Airport guides', href: '/airport-guides/' }, { label: 'Destination intelligence', href: '/destination-intelligence/' }, { label: 'Travel budget calculator', href: '/tools/travel-budget-calculator/' }],
  },
  {
    slug: 'esim-and-connectivity', name: 'eSIM and connectivity', eyebrow: 'Stay connected abroad',
    description: 'Compare eSIMs, roaming and local SIM options by device compatibility, coverage, data allowance and activation requirements.',
    searchIntents: ['best eSIM for travel', 'eSIM for Europe', 'international data SIM', 'avoid roaming charges'],
    checklist: ['Confirm your phone supports eSIM', 'Check that the device is unlocked', 'Compare country coverage', 'Understand data validity', 'Install before departure when permitted'],
    questions: [
      { question: 'Will an eSIM give me a local phone number?', answer: 'Some plans are data-only, while others include calls or a number. Check the plan details before buying.' },
      { question: 'Can I keep my normal SIM active?', answer: 'Many compatible phones support dual-SIM use, but settings and charges vary. Disable unwanted data roaming on your home line.' },
      { question: 'When should I activate an eSIM?', answer: 'Follow the provider instructions because some plans begin when installed and others begin when first connected at the destination.' },
    ],
    related: [{ label: 'Country guides', href: '/country-guides/' }, { label: 'Destination guides', href: '/destination-guides/' }, { label: 'Travel checklist builder', href: '/tools/travel-checklist-builder/' }],
  },
  {
    slug: 'airport-lounges', name: 'Airport lounges', eyebrow: 'Make the airport easier',
    description: 'Find the right lounge by terminal, opening hours, access method, family policy, food, showers and maximum-stay rules.',
    searchIntents: ['airport lounge access', 'family airport lounges', 'airport lounge with showers', 'pay per visit airport lounge'],
    checklist: ['Confirm terminal and airside location', 'Check opening hours', 'Review guest and child policies', 'Check maximum stay', 'Confirm access during connections'],
    questions: [
      { question: 'Can anyone pay to use an airport lounge?', answer: 'Some lounges sell entry, while others require a membership, eligible ticket, status or card benefit. Access can also depend on capacity.' },
      { question: 'Can I use a lounge in another terminal?', answer: 'Often not, especially where terminals are not connected airside. Confirm the lounge is accessible from your departure gate.' },
      { question: 'Are food and drinks always included?', answer: 'Inclusions vary by lounge and access type. Premium drinks, showers or sleep rooms may cost extra.' },
    ],
    related: [{ label: 'Airport guides', href: '/airport-guides/' }, { label: 'Airport delay readiness checker', href: '/tools/airport-delay-readiness-checker/' }, { label: 'Flight status checker', href: '/tools/flight-status-checker/' }],
  },
  {
    slug: 'flight-compensation', name: 'Flight delays and compensation', eyebrow: 'Know your next steps',
    description: 'Organise evidence and understand the questions to ask after a delay, cancellation, missed connection or baggage disruption.',
    searchIntents: ['flight delay compensation', 'cancelled flight rights', 'missed connection compensation', 'lost baggage claim'],
    checklist: ['Keep booking and boarding documents', 'Record the actual timings', 'Ask the airline for the reason', 'Keep receipts for reasonable expenses', 'Check the rules that apply to the journey'],
    questions: [
      { question: 'Does every delay qualify for compensation?', answer: 'No. Eligibility depends on the route, applicable law, delay length, cause and other conditions.' },
      { question: 'What evidence should I keep?', answer: 'Keep booking documents, boarding passes, messages, receipts, photographs and notes of actual departure and arrival times.' },
      { question: 'Is reimbursement the same as compensation?', answer: 'No. Reimbursement can cover eligible expenses or a refund, while compensation is a separate payment available only in certain circumstances.' },
    ],
    related: [{ label: 'Flight status checker', href: '/tools/flight-status-checker/' }, { label: 'Airport delay readiness checker', href: '/tools/airport-delay-readiness-checker/' }, { label: 'Travel insurance guide', href: '/travel-services/travel-insurance/' }],
  },
];

export function getTravelService(slug: string) {
  return travelServices.find((service) => service.slug === slug);
}
