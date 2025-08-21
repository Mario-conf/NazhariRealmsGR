'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Trail, Review } from '@/lib/trail-data';
import { Star, Mountain, Forest, Waves, Sun, Clock, Milestone, Map, Download, X, Heart } from 'lucide-react';
import useReviews from '@/hooks/use-reviews';
import { ReviewForm } from './review-form';
import { ReviewList } from './review-list';

interface TrailDetailsDialogProps {
  trail: Trail;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const terrainIcons = {
  Mountain: <Mountain className="h-5 w-5" />,
  Forest: <Forest className="h-5 w-5" />,
  Coastal: <Waves className="h-5 w-5" />,
  Desert: <Sun className="h-5 w-5" />,
};

const difficultyLabels = {
    'Easy': 'Fácil',
    'Moderate': 'Moderada',
    'Hard': 'Difícil'
};

const terrainLabels = {
    'Mountain': 'Montaña',
    'Forest': 'Bosque',
    'Coastal': 'Costa',
    'Desert': 'Desierto'
};


export function TrailDetailsDialog({
  trail,
  onClose,
  isFavorite,
  onToggleFavorite,
}: TrailDetailsDialogProps) {
  const { reviews, addReview } = useReviews(trail.id);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="relative p-0">
          <img
            src={trail.image}
            alt={trail.name}
            data-ai-hint={trail.imageHint}
            className="w-full h-64 object-cover rounded-t-lg"
          />
           <Button variant="ghost" size="icon" className="absolute top-2 right-14 bg-background/70 hover:bg-background rounded-full h-9 w-9" onClick={onToggleFavorite}>
            <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-primary'}`} />
            <span className="sr-only">Añadir a favoritos</span>
          </Button>
           <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/70 hover:bg-background rounded-full h-9 w-9" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Cerrar</span>
          </Button>
          <div className="p-6">
            <DialogTitle className="text-3xl font-bold mb-2">{trail.name}</DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground">{trail.location}</DialogDescription>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 px-6 pb-6 overflow-y-auto flex-grow">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4 border-b pb-2">Estadísticas de la ruta</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="text-muted-foreground">Valoración</p>
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
                    <p className="text-muted-foreground">Distancia</p>
                    <p className="font-semibold">{trail.length} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Duración</p>
                    <p className="font-semibold">{trail.duration} horas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {terrainIcons[trail.terrain]}
                  <div>
                    <p className="text-muted-foreground">Terreno</p>
                    <p className="font-semibold">{terrainLabels[trail.terrain]}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 border-b pb-2">Descripción</h3>
              <p className="text-muted-foreground">{trail.description}</p>
            </div>
             <div>
              <h3 className="font-semibold text-lg mb-4 border-b pb-2">Reseñas ({reviews.length})</h3>
              <ReviewList reviews={reviews} />
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4 border-b pb-2">Mapa de la Ruta</h3>
              <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
                  <Map className="w-16 h-16 text-muted-foreground/50" />
                  <p className="sr-only">Un mapa de la ruta.</p>
              </div>
               <Button className="w-full mt-4">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar archivo GPX
              </Button>
            </div>
            <div>
               <h3 className="font-semibold text-lg mb-4 border-b pb-2">Dejar una reseña</h3>
               <ReviewForm onSubmit={addReview} />
            </div>
          </div>
        </div>
         <DialogFooter className="px-6 pb-6 pt-2">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
