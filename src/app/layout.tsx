import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Club de Senderismo Alpine-Hike',
  description: 'Tu aventura comienza aquí.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
