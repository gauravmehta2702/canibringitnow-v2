import { ChevronRight, Home } from 'lucide-react';
import type { BreadcrumbItem } from '@/lib/siteSeo';

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.href}-${item.name}`} className="inline-flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4 text-slate-400" aria-hidden="true" />}
            {isLast ? (
              <span className="text-slate-800" aria-current="page">{item.name}</span>
            ) : (
              <a href={item.href} className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700">
                {index === 0 && <Home className="h-4 w-4" aria-hidden="true" />}
                {item.name}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
}
