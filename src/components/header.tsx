import { MountainIcon, Menu, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { LanguageSwitcher } from './language-switcher';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

export function Header() {
  const t = useTranslations('Header');

  const navLinks = [
    { href: '/weather', label: t('weather') },
    { href: '/blog', label: t('blog') },
    { href: '/routes', label: t('routes') },
    { href: '/rules', label: t('rules') },
  ];

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-primary text-primary-foreground shadow-md sticky top-0 z-40">
      <Link
        className="flex items-center justify-center gap-2"
        href="/"
      >
        <MountainIcon className="h-6 w-6" />
        <span className="font-semibold hidden sm:inline-block">
          Nazhari Realms GR
        </span>
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="ml-auto hidden md:flex items-center gap-4 lg:gap-6">
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
      <div className="ml-auto flex items-center md:hidden gap-2">
        <LanguageSwitcher />
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium mt-10">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold mb-4"
                >
                    <MountainIcon className="h-6 w-6" />
                    <span>Nazhari Realms GR</span>
                </Link>
                {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                        <Link href={link.href} className="text-muted-foreground hover:text-foreground">
                            {link.label}
                        </Link>
                    </SheetClose>
                ))}
                 <SheetClose asChild>
                    <Button asChild className="mt-4">
                        <Link href="/#contact">{t('contact')}</Link>
                    </Button>
                </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
