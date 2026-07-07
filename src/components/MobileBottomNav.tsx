import { Brain, Home, Luggage, Plane, Search } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Search', href: '/search/', icon: Search },
  { label: 'AI', href: '/travel-intelligence/', icon: Brain },
  { label: 'Pack', href: '/packing-planner/', icon: Luggage },
  { label: 'Airlines', href: '/airline-hub/', icon: Plane },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-2xl backdrop-blur md:hidden" aria-label="Mobile navigation">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-semibold text-slate-600 hover:bg-brand-50 hover:text-brand-700"
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
