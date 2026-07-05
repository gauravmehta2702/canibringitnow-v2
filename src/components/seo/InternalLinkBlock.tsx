import { ArrowRight } from 'lucide-react';
import { relatedLinks } from '@/lib/internalLinkEngine';

export default function InternalLinkBlock({slug}:{slug:string}){
 const links=relatedLinks(slug);
 if(!links.length) return null;
 return <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-slate-200">
 <h2 className="text-2xl font-black">Related travel checks</h2>
 <div className="mt-4 grid gap-3 md:grid-cols-2">
 {links.map(l=><a key={l.slug} href={`/rules/${l.slug}/`} className="rounded-2xl bg-slate-50 p-4 hover:bg-brand-50">
 <div className="font-bold">{l.item}</div>
 <div className="text-sm mt-2">{l.shortAnswer}</div>
 <span className="inline-flex mt-3 items-center gap-2 text-brand-600 font-bold">Open <ArrowRight className="h-4 w-4"/></span>
 </a>)}
 </div></section>
}
