export type Entity={slug:string,type:string,related?:string[]}
export const graph:Entity[]=[];
export const related=(slug:string)=>graph.find(g=>g.slug===slug)?.related??[];
