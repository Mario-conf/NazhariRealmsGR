'use client';

import Image from 'next/image';
import { Map } from 'lucide-react';

interface RouteMapProps {
  imageUrl: string | undefined;
}

export function RouteMap({ imageUrl }: RouteMapProps) {
  if (!imageUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <div className="text-center">
            <Map className="mx-auto h-12 w-12" />
            <p className="mt-2 text-sm">No hay mapa disponible.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg">
      <Image
        src={imageUrl}
        alt="Mapa de la ruta"
        width={600}
        height={400}
        className="h-full w-full object-cover"
        data-ai-hint="mapa ruta senderismo"
      />
    </div>
  );
}
