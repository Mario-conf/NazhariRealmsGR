import { MountainIcon, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { LanguageSwitcher } from './language-switcher';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const t = useTranslations('Header');

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background shadow-sm sticky top-0 z-40">
      <Link className="flex items-center justify-center gap-2" href="/">
        <MountainIcon className="h-6 w-6" />
        <span className="font-semibold hidden sm:inline-block">Alpine-Hike Club</span>
      </Link>
      <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
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
        <Button asChild>
          <Link href="/#contact">{t('contact')}</Link>
        </Button>
        <LanguageSwitcher />
      </nav>
      <div className="ml-auto flex items-center md:hidden">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
