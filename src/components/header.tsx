import { MountainIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background shadow-sm">
      <Link className="flex items-center justify-center" href="/">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Alpine-Hike Club</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/weather"
        >
          Weather
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/blog"
        >
          Blog
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/routes"
        >
          Routes
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/rules"
        >
          Rules
        </Link>
        <Button>Contact</Button>
      </nav>
    </header>
  );
}
