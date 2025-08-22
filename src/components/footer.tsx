import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 bg-gray-900 text-gray-400">
      <p className="text-xs">{t('copyright')}</p>
      <div className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline hover:text-white underline-offset-4" href="#">
          {t('terms')}
        </Link>
        <Link className="text-xs hover:underline hover:text-white underline-offset-4" href="#">
          {t('privacy')}
        </Link>
      </div>
    </footer>
  );
}
