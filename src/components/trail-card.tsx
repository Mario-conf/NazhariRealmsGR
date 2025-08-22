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
import { Star, Mountain, Trees, Waves, Sun, Clock, Milestone, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface TrailCardProps {
  trail: Trail;
  onSelect: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const terrainIcons = {
  Mountain: <Mountain className="h-4 w-4" />,
  Forest: <Trees className="h-4 w-4" />,
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
    <Card 
      className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl cursor-pointer group"
      onClick={onSelect}
    >
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={trail.image}
            alt={trail.name}
            data-ai-hint={trail.imageHint}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
           <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 rounded-full bg-white/20 hover:bg-white/40 h-9 w-9 backdrop-blur-sm"
            onClick={onToggleFavorite}
            aria-label={isFavorite ? t('remove_favorite') : t('add_favorite')}
          >
            <Heart className={`h-5 w-5 transition-all ${isFavorite ? 'text-red-500 fill-red-500' : 'text-white'}`} />
          </Button>
          <Badge
            variant={trail.difficulty === 'Hard' ? 'destructive' : trail.difficulty === 'Moderate' ? 'secondary' : 'default'}
            className="absolute bottom-2 left-2"
          >
            {difficultyLabels[trail.difficulty]}
          </Badge>
        </div>
        <div className="p-4">
          <CardTitle className="font-serif text-lg mb-1 line-clamp-1">{trail.name}</CardTitle>
          <CardDescription className="line-clamp-1">{trail.location}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4 border-t pt-3">
          <div className="flex items-center gap-1.5" title={t('distance_title')}>
            <Milestone className="h-4 w-4" />
            <span>{trail.length} km</span>
          </div>
          <div className="flex items-center gap-1.5" title={t('duration_title')}>
            <Clock className="h-4 w-4" />
            <span>{trail.duration} hrs</span>
          </div>
           <div className="flex items-center gap-1.5" title={t('terrain_title')}>
            {terrainIcons[trail.terrain]}
            <span className="hidden sm:inline">{terrainLabels[trail.terrain]}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-amber-500" title={t('rating_title')}>
             {[...Array(5)].map((_, i) => (
                <Star
                key={i}
                className={`h-4 w-4 ${
                    i < Math.round(trail.rating) ? 'fill-current' : 'text-muted-foreground/30'
                }`}
                />
            ))}
            <span className="text-muted-foreground text-xs ml-1">({trail.rating.toFixed(1)})</span>
        </div>
      </CardContent>
      {/* Footer can be removed to make card clickable, or keep for explicit button */}
       <CardFooter className="p-4 pt-0">
        <Button onClick={onSelect} className="w-full" variant="secondary">
          {t('view_details')}
        </Button>
      </CardFooter>
    </Card>
  );
}
