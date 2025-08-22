import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Club de Senderismo Alpine-Hike',
  description: 'Tu aventura comienza aquí.',
};

//This is the root layout, it does not need to know about the locale
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
