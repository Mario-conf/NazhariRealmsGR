import { MountainIcon, Menu, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { LanguageSwitcher } from './language-switcher';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const t = useTranslations('Header');

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
      <nav className="ml-auto hidden md:flex items-center gap-4 lg:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/weather"
        >
          {t('weather')}
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/blog"
        >
          {t('blog')}
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/routes"
        >
          {t('routes')}
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/rules"
        >
          {t('rules')}
        </Link>
        <Button asChild variant="secondary">
          <Link href="/#contact">{t('contact')}</Link>
        </Button>
        <LanguageSwitcher />
      </nav>
      <div className="ml-auto flex items-center md:hidden gap-2">
        <Button asChild size="icon" variant="ghost">
          <Link href="/#contact">
            <Phone className="h-5 w-5" />
            <span className="sr-only">{t('contact')}</span>
          </Link>
        </Button>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
