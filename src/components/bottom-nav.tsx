'use client';

import { Home, Map, CloudSun, ScrollText } from 'lucide-react';
import { Link, usePathname } from '@/navigation';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/routes', icon: Map, label: 'Routes' },
  { href: '/weather', icon: CloudSun, label: 'Weather' },
  { href: '/rules', icon: ScrollText, label: 'Rules' },
];

export function BottomNav() {
  const pathname = usePathname();
  const t = useTranslations('Header');

  const getLabel = (label: string) => {
    switch (label) {
      case 'Home':
        return 'Inicio'; // Or a key like t('nav.home')
      case 'Routes':
        return t('routes');
      case 'Weather':
        return t('weather');
      case 'Rules':
        return t('rules');
      default:
        return label;
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t md:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive =
            item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'inline-flex flex-col items-center justify-center px-5 hover:bg-muted group',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs">
                {getLabel(item.label)}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}
