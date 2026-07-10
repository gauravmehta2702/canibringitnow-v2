import TrustPage from '@/components/trust/TrustPage';
export const metadata = { title: 'Editorial Policy | Can I Bring It Now', description: 'How Can I Bring It Now researches, writes and updates travel guidance.' };
export default function Page(){return <TrustPage title="Editorial Policy" description="Our editorial process is designed to make complicated travel rules easier to understand without hiding uncertainty or replacing official guidance." sections={[
{title:'How we create guidance',body:<><p>We start with the traveller’s practical question, separate cabin baggage, checked baggage, security and customs considerations, and write the answer in plain English.</p><p>Structured rule pages are reviewed for warnings, restrictions, packing tips, related guidance and a visible review date.</p></>},
{title:'Editorial independence',body:<p>Advertising, affiliate relationships and commercial opportunities do not determine a rule’s answer. Informational conclusions are kept separate from product recommendations.</p>},
{title:'Updates',body:<p>Travel requirements can change. Pages display a review date and encourage travellers to check the operating airline, departure airport and destination authority before important journeys.</p>},
{title:'Limitations',body:<p>We provide general information, not legal, medical or official regulatory advice. The final decision remains with airlines, security officers, border authorities and customs officials.</p>}
]}/>}
