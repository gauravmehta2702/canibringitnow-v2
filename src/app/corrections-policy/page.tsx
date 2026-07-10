import TrustPage from '@/components/trust/TrustPage';
export const metadata={title:'Corrections Policy | Can I Bring It Now',description:'How to report and correct inaccurate or outdated travel guidance.'};
export default function Page(){return <TrustPage title="Corrections Policy" description="We welcome clear reports of outdated, incomplete or inaccurate information." sections={[
{title:'How to report an issue',body:<p>Use the contact page and include the page URL, the statement you believe is wrong, the correct information and—where possible—an official source.</p>},
{title:'How we review reports',body:<p>We compare the report with relevant official material, consider whether the change affects related pages and update the review date when a substantive correction is made.</p>},
{title:'What we correct',body:<p>We correct factual errors, broken links, misleading wording and material omissions. Minor formatting changes may be made without a formal correction note.</p>},
{title:'No guarantee of immediate response',body:<p>Urgent travel decisions should be confirmed directly with the airline, airport or government authority rather than waiting for a website correction.</p>}
]}/>}
