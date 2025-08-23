import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { LanguageSwitcher } from './language-switcher';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
    <header className="px-4 lg:px-6 h-16 flex items-center bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
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
        <Button asChild variant="secondary">
          <Link href="/#contact">{t('contact')}</Link>
        </Button>
        <LanguageSwitcher />
      </nav>

      {/* Mobile Navigation */}
      <div className="ml-auto min-[416px]:hidden">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="secondary" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-primary text-primary-foreground border-r-secondary">
              <SheetHeader>
                  <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium mt-8 flex-grow">
                  <SheetClose asChild>
                        <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4 text-primary-foreground">
                          <Image 
                            src={siteConfig.logo}
                            alt="Club Logo"
                            width={32}
                            height={32}
                            className="h-8 w-8 rounded-full"
                            data-ai-hint={siteConfig.logoHint}
                          />
                          <span>{siteConfig.name}</span>
                      </Link>
                  </SheetClose>
                  {navLinks.map(link => (
                        <SheetClose asChild key={link.href}>
                            <Link href={link.href} className="text-primary-foreground hover:underline py-2">{link.label}</Link>
                        </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link href="/#contact" className="text-primary-foreground hover:underline py-2">{t('contact')}</Link>
                  </SheetClose>
                    <div className="pt-4 border-t border-t-secondary">
                      <LanguageSwitcher />
                  </div>
              </nav>
              <div className="mt-auto p-6 -mx-6">
                  <SheetClose asChild>
                    <Link href="/">
                      <Image 
                          src="/logo.png"
                          alt="Club Logo Large"
                          width={200}
                          height={200}
                          className="w-full h-auto"
                          data-ai-hint="logo club grande"
                      />
                    </Link>
                  </SheetClose>
              </div>
            </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
