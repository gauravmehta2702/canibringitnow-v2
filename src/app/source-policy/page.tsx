import TrustPage from '@/components/trust/TrustPage';
export const metadata={title:'Source Policy | Can I Bring It Now',description:'The sources used for baggage, security and customs guidance.'};
export default function Page(){return <TrustPage title="Source Policy" description="Our source hierarchy helps readers understand the difference between official rules, general guidance and practical travel advice." sections={[
{title:'Preferred sources',body:<p>Preferred sources include government departments, aviation regulators, airport-security authorities, customs agencies and the operating airline’s own baggage or dangerous-goods pages.</p>},
{title:'Secondary sources',body:<p>Reliable secondary material may help explain context, but it should not replace the authority responsible for enforcement.</p>},
{title:'Practical advice',body:<p>Packing tips and examples are clearly presented as practical guidance. They are not represented as binding rules.</p>},
{title:'Source changes',body:<p>Official pages can be moved or updated without notice. Readers should use the named authority as the final point of confirmation.</p>}
]}/>}
