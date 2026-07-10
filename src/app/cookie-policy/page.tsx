import TrustPage from '@/components/trust/TrustPage';
export const metadata={title:'Cookie Policy | Can I Bring It Now',description:'How cookies and similar technologies may be used.'};
export default function Page(){return <TrustPage title="Cookie Policy" description="This page explains how cookies and similar technologies may support analytics, preferences and advertising." sections={[
{title:'Essential technologies',body:<p>Some storage may be needed for site operation, security or remembering consent choices.</p>},
{title:'Analytics',body:<p>With appropriate consent where required, analytics may help us understand page usage, device types and website performance.</p>},
{title:'Advertising',body:<p>If advertising is activated, advertising partners may use cookies or similar technologies subject to applicable consent requirements and their own policies.</p>},
{title:'Your choices',body:<p>You can use the website’s consent controls and browser settings to manage non-essential cookies. Blocking some technologies may affect certain features.</p>}
]}/>}
