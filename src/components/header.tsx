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
      <Link className="flex items-center justify-center" href="/">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Alpine-Hike Club</span>
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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <MountainIcon className="h-6 w-6" />
                <span>Alpine-Hike Club</span>
              </Link>
              <nav className="grid gap-2 text-base">
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  href="/weather"
                >
                  {t('weather')}
                </Link>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  href="/blog"
                >
                  {t('blog')}
                </Link>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  href="/routes"
                >
                  {t('routes')}
                </Link>
                <Link
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  href="/rules"
                >
                  {t('rules')}
                </Link>
                 <Link
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  href="/#contact"
                >
                  {t('contact')}
                </Link>
              </nav>
              <div className="mt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
