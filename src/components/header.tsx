
'use client';

import * as React from 'react';
import { Menu, Clock, Mountain, MapPin, Globe, Home } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { LanguageSwitcher } from './language-switcher';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

export function Header() {
  const t = useTranslations('Header');
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  const navLinks = [
    { href: '/weather', label: t('weather'), icon: <Clock className="h-5 w-5" /> },
    { href: '/routes', label: t('routes'), icon: <Mountain className="h-5 w-5" /> },
    { href: '/rules', label: t('rules'), icon: <MapPin className="h-5 w-5" /> },
  ];

  return (
    <header className="px-4 lg:px-6 h-auto min-h-16 flex items-center justify-between bg-primary text-primary-foreground shadow-md sticky top-0 z-40 flex-wrap">
      <Link className="flex items-center justify-center gap-2" href="/">
        <Image
          src={siteConfig.logo}
          alt="Club Logo"
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
          data-ai-hint={siteConfig.logoHint}
        />
        <span className="font-semibold inline-block">{siteConfig.name}</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex items-center gap-4 lg:gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            className="text-sm font-medium hover:underline underline-offset-4"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
        <LanguageSwitcher />
      </nav>

      {/* Mobile Menu Button */}
      <div className="ml-auto md:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="secondary" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-primary text-primary-foreground flex flex-col p-0"
          >
            <SheetHeader className="p-6 pb-4 border-b border-primary-foreground/20">
               <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                <div className="flex flex-col items-center justify-center gap-4 mb-4">
                     <Image
                        src={siteConfig.logo}
                        alt="Club Logo"
                        width={96}
                        height={96}
                        className="h-24 w-24 rounded-full"
                        data-ai-hint={siteConfig.logoHint}
                    />
                    <span className="font-semibold text-xl">
                        {siteConfig.name}
                    </span>
                </div>
            </SheetHeader>
            <nav className="grid gap-2 text-lg font-medium flex-grow p-6">
              <Link
                  href="/"
                  className="flex items-center gap-4 rounded-md px-3 py-3 text-base hover:bg-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  {t('home')}
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-4 rounded-md px-3 py-3 text-base hover:bg-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-auto border-t border-primary-foreground/20">
                <div className="flex items-center gap-4 rounded-md px-3 py-3 text-base">
                  <Globe className="h-5 w-5" />
                  <LanguageSwitcher />
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
