'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Trail } from '@/lib/trail-data';
import { Star, Mountain, Trees, Waves, Sun, Clock, Milestone, X, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import StravaEmbedComponent from './strava-embed';

interface TrailDetailsDialogProps {
  trail: Trail;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const terrainIcons = {
  Mountain: <Mountain className="h-5 w-5" />,
  Forest: <Trees className="h-5 w-5" />,
  Coastal: <Waves className="h-5 w-5" />,
  Desert: <Sun className="h-5 w-5" />,
};

export function TrailDetailsDialog({
  trail,
  onClose,
  isFavorite,
  onToggleFavorite,
}: TrailDetailsDialogProps) {
  const t = useTranslations('TrailDetailsDialog');

  const difficultyLabels = {
    'Easy': t('difficulties.Easy'),
    'Moderate': t('difficulties.Moderate'),
    'Hard': t('difficulties.Hard')
  };
  
  const terrainLabels = {
      'Mountain': t('terrains.Mountain'),
      'Forest': t('terrains.Forest'),
      'Coastal': t('terrains.Coastal'),
      'Desert': t('terrains.Desert')
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] flex flex-col">
        <DialogHeader className="relative p-0 border-b">
           <div className="p-6 flex justify-between items-start">
             <div>
                <DialogTitle className="font-serif text-3xl font-bold mb-1">{trail.name}</DialogTitle>
                <DialogDescription className="text-lg text-muted-foreground">{trail.location}</DialogDescription>
             </div>
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="bg-background/70 hover:bg-muted rounded-full h-10 w-10" onClick={onToggleFavorite}>
                    <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-primary'}`} />
                    <span className="sr-only">{t('add_favorite')}</span>
                </Button>
                <Button variant="ghost" size="icon" className="bg-background/70 hover:bg-muted rounded-full h-10 w-10" onClick={onClose}>
                    <X className="h-5 w-5 text-primary" />
                    <span className="sr-only">{t('close')}</span>
                </Button>
             </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 px-6 pb-6 overflow-y-auto flex-grow">
          {/* Columna Izquierda */}
          <aside className="lg:col-span-2 space-y-6">
             <div className="border rounded-lg p-4">
                <h3 className="font-serif font-semibold text-lg mb-4 border-b pb-2">{t('stats_title')}</h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-amber-400" />
                    <div>
                        <p className="text-muted-foreground">{t('rating')}</p>
                        <p className="font-semibold">{trail.rating.toFixed(1)} / 5.0</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant={trail.difficulty === 'Hard' ? 'destructive' : 'secondary'}>
                            {difficultyLabels[trail.difficulty]}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                    <Milestone className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">{t('distance')}</p>
                        <p className="font-semibold">{trail.length} km</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                        <p className="text-muted-foreground">{t('duration')}</p>
                        <p className="font-semibold">{trail.duration} horas</p>
                    </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {terrainIcons[trail.terrain]}
                        <div>
                            <p className="text-muted-foreground">{t('terrain')}</p>
                            <p className="font-semibold">{terrainLabels[trail.terrain]}</p>
                        </div>
                    </div>
                </div>
            </div>
             <div>
              <h3 className="font-serif font-semibold text-lg mb-2 border-b pb-2">{t('description_title')}</h3>
              <p className="text-muted-foreground text-sm">{trail.description}</p>
            </div>
          </aside>
          
          {/* Columna Derecha */}
          <main className="lg:col-span-3 space-y-6">
              <div>
                <h3 className="font-serif font-semibold text-lg mb-4 border-b pb-2">{t('map_title')}</h3>
                 <div className="flex justify-center">
                    {trail.stravaEmbed ? (
                        <StravaEmbedComponent key={trail.id} embed={trail.stravaEmbed} />
                    ) : (
                        <p>No hay mapa de ruta disponible.</p>
                    )}
                </div>
              </div>
          </main>

        </div>
      </DialogContent>
    </Dialog>
  );
}
