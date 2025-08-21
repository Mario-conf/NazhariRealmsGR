import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Trail } from '@/lib/trail-data';
import { Star, Mountain, Forest, Waves, Sun, Clock, Milestone, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface TrailCardProps {
  trail: Trail;
  onSelect: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const terrainIcons = {
  Mountain: <Mountain className="h-4 w-4" />,
  Forest: <Forest className="h-4 w-4" />,
  Coastal: <Waves className="h-4 w-4" />,
  Desert: <Sun className="h-4 w-4" />,
};

export function TrailCard({ trail, onSelect, isFavorite, onToggleFavorite }: TrailCardProps) {
  const t = useTranslations('TrailCard');

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
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={trail.image}
            alt={trail.name}
            data-ai-hint={trail.imageHint}
            className="w-full h-48 object-cover"
          />
           <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 rounded-full bg-background/70 hover:bg-background/90 h-9 w-9"
            onClick={onToggleFavorite}
            aria-label={isFavorite ? t('remove_favorite') : t('add_favorite')}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`} />
          </Button>
          <Badge
            variant={trail.difficulty === 'Hard' ? 'destructive' : 'secondary'}
            className="absolute top-2 left-2"
          >
            {difficultyLabels[trail.difficulty]}
          </Badge>
        </div>
        <div className="p-6">
          <CardTitle className="font-serif text-xl mb-1">{trail.name}</CardTitle>
          <CardDescription>{trail.location}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2" title={t('rating_title')}>
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="font-semibold">{trail.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2" title={t('terrain_title')}>
            {terrainIcons[trail.terrain]}
            <span>{terrainLabels[trail.terrain]}</span>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-2" title={t('distance_title')}>
            <Milestone className="h-4 w-4" />
            <span>{trail.length} km</span>
          </div>
          <div className="flex items-center gap-2" title={t('duration_title')}>
            <Clock className="h-4 w-4" />
            <span>{trail.duration} hrs</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button onClick={onSelect} className="w-full">
          {t('view_details')}
        </Button>
      </CardFooter>
    </Card>
  );
}
