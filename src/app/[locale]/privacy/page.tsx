import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
  const t = useTranslations('PrivacyPage');

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <h1 className="font-serif text-4xl font-bold mb-6">{t('title')}</h1>
      <div className="prose max-w-none text-muted-foreground space-y-4">
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
        <p>{t('p3')}</p>
        <p>{t('p4')}</p>
      </div>
    </div>
  );
}
