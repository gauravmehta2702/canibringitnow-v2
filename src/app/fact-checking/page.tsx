import TrustPage from '@/components/trust/TrustPage';
export const metadata={title:'Fact-Checking Policy | Can I Bring It Now',description:'How travel-rule information is checked and presented.'};
export default function Page(){return <TrustPage title="Fact-Checking Policy" description="We distinguish between general aviation guidance, airline policy, airport screening and destination-country restrictions." sections={[
{title:'Source priority',body:<p>When available, we prioritise government, civil-aviation, airport, customs and operating-airline information over blogs, forums or anecdotal reports.</p>},
{title:'Conflicting information',body:<p>When sources differ, we present the safer practical interpretation, explain that rules can vary and direct the traveller to the authority making the final decision.</p>},
{title:'Dates and freshness',body:<p>Pages carry a review date. A date does not guarantee that a policy has not changed, so time-sensitive or high-risk items should always be checked again before travel.</p>},
{title:'User reports',body:<p>Future traveller experiences will be treated as anecdotal evidence, moderated before publication and never used alone to override official guidance.</p>}
]}/>}
