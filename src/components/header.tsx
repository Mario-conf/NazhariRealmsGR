'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { LanguageSwitcher } from './language-switcher';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

export function Header() {
  const t = useTranslations('Header');
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { href: '/weather', label: t('weather') },
    { href: '/routes', label: t('routes') },
    { href: '/rules', label: t('rules') },
  ];

  return (
    <header className="px-4 lg:px-6 h-auto min-h-16 flex items-center justify-between bg-primary text-primary-foreground shadow-md sticky top-0 z-40 flex-wrap">
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
        <span className="font-semibold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      
      {/* Desktop Navigation - Hidden on screens < 416px */}
      <nav className="ml-auto hidden min-[416px]:flex items-center gap-4 lg:gap-6">
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

      {/* Mobile Menu Button - Only visible on screens <= 415px */}
      <div className="ml-auto block min-[416px]:hidden">
          <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="secondary" size="icon">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle navigation menu</span>
          </Button>
      </div>
      
      {/* Mobile Navigation Menu - Full width, appears below header */}
      {isMenuOpen && (
          <div className="w-full flex flex-col items-center gap-4 py-4 min-[416px]:hidden animate-in fade-in-20 slide-in-from-top-4 duration-300">
                {navLinks.map(link => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-primary-foreground hover:underline"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
                 <Button asChild variant="secondary" className="w-full max-w-xs" onClick={() => setIsMenuOpen(false)}>
                    <Link href="/#contact">{t('contact')}</Link>
                </Button>
                <div className="mt-2">
                    <LanguageSwitcher />
                </div>
          </div>
      )}
    </header>
  );
}
