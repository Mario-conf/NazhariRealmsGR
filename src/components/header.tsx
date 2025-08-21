import { Globe, MountainIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function Header() {
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
          El Tiempo
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
          Rutas
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/rules"
        >
          Reglas
        </Link>
        <Button>Contacto</Button>
        <Select defaultValue="es">
          <SelectTrigger className="w-auto h-9 bg-transparent border-0 gap-2">
            <Globe className="h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="it">Italiano</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
          </SelectContent>
        </Select>
      </nav>
    </header>
  );
}
