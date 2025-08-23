'use client';

import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { LanguageSwitcher } from './language-switcher';
import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

export function Header() {
  const t = useTranslations('Header');

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
        <span className="font-semibold inline-block">
          {siteConfig.name}
        </span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="ml-auto hidden max-[415px]:hidden md:flex items-center gap-4 lg:gap-6">
        {navLinks.map(link => (
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
      <div className="ml-auto block min-[416px]:hidden">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="secondary" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-primary text-primary-foreground flex flex-col">
                <SheetHeader>
                    <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                     <Link
                        className="flex items-center justify-center gap-2 mb-8"
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
                        <span className="font-semibold text-xl">
                          {siteConfig.name}
                        </span>
                    </Link>
                </SheetHeader>
                <nav className="grid gap-6 text-lg font-medium flex-grow">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="hover:underline"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-4 border-t">
                      <LanguageSwitcher />
                    </div>
                </nav>
                <div className="mt-auto p-6 -mx-6">
                   <Image 
                    src="/logo.png"
                    alt="Club logo in menu"
                    width={150}
                    height={150}
                    className="mx-auto"
                    data-ai-hint="logo club grande"
                   />
                </div>
            </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
