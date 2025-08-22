import '../globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <div className="relative flex min-h-dvh flex-col bg-background">
      <meta name="google-site-verification" content="gREbj8AXK3TcCFaAhaseH8DV__xhBbSP8B9eGgzTiZ4" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
