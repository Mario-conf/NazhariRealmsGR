import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { LanguageSwitcher } from './language-switcher';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

export function Header() {
  const t = useTranslations('Header');

  const navLinks = [
    { href: '/weather', label: t('weather') },
    { href: '/routes', label: t('routes') },
    { href: '/rules', label: t('rules') },
  ];

  return (
    <header className="px-4 lg:px-6 h-auto min-h-16 flex items-center bg-primary text-primary-foreground shadow-md sticky top-0 z-40 flex-wrap">
      <Link
        className="flex items-center justify-center gap-2"
        href="/"
      >
        <Image 
          src={siteConfig.logo}
          alt="Club Logo"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
          data-ai-hint={siteConfig.logoHint}
        />
        <span className="font-semibold hidden sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      
      <nav className="ml-auto flex items-center justify-end flex-wrap gap-4 lg:gap-6 py-2">
        {navLinks.map(link => (
           <Link
            key={link.href}
            className="text-sm font-medium hover:underline underline-offset-4"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
        <Button asChild variant="secondary">
          <Link href="/#contact">{t('contact')}</Link>
        </Button>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
