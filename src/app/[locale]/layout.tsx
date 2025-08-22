import { PT_Sans, Playfair_Display } from 'next/font/google';
import '../globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { BottomNav } from '@/components/bottom-nav';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={`${ptSans.variable} ${playfair.variable} font-sans`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <Footer />
            <BottomNav />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
