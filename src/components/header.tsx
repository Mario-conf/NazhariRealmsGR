import { MountainIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const t = useTranslations('Header');

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background shadow-sm">
      <Link className="flex items-center justify-center" href="/">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Alpine-Hike Club</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
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
        <Button>{t('contact')}</Button>
        <LanguageSwitcher />
      </nav>
    </header>
  );
}
