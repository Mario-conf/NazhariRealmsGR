'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (value: string) => {
    router.replace(pathname, { locale: value });
  };

  return (
    <Select defaultValue={locale} onValueChange={onSelectChange}>
      <SelectTrigger className="w-full md:w-auto h-10 md:h-9 bg-transparent md:border-0 gap-2 text-base md:text-sm">
        <Globe className="h-5 w-5 md:h-4 md:w-4" />
        <span className="hidden md:inline-block">
          <SelectValue placeholder={t('selectLanguage')} />
        </span>
         <span className="md:hidden">
          {
            {
              es: 'Español',
              en: 'English',
              de: 'Deutsch',
              it: 'Italiano',
              fr: 'Français',
            }[locale]
          }
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="es">Español</SelectItem>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="de">Deutsch</SelectItem>
        <SelectItem value="it">Italiano</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
      </SelectContent>
    </Select>
  );
}
