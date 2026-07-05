import { rules } from '@/data/rules';

export function relatedLinks(slug:string,limit=12){
 const current=rules.find(r=>r.slug===slug);
 if(!current) return [];
 return rules.filter(r=>r.slug!==slug && (r.category===current.category||r.item.split(' ')[0]===current.item.split(' ')[0]))
 .slice(0,limit);
}

export function breadcrumb(slug:string){
 const current=rules.find(r=>r.slug===slug);
 if(!current) return [];
 return [
  {label:'Home',href:'/'},
  {label:current.category,href:`/categories/${current.category.toLowerCase().replace(/[^a-z0-9]+/g,'-')}/`},
  {label:current.item,href:`/rules/${current.slug}/`}
 ];
}
