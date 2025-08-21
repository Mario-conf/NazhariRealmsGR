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
import { Star, Mountain, Forest, Waves, Sun, Clock, Milestone } from 'lucide-react';

interface TrailCardProps {
  trail: Trail;
  onSelect: () => void;
}

const terrainIcons = {
  Mountain: <Mountain className="h-4 w-4" />,
  Forest: <Forest className="h-4 w-4" />,
  Coastal: <Waves className="h-4 w-4" />,
  Desert: <Sun className="h-4 w-4" />,
};

export function TrailCard({ trail, onSelect }: TrailCardProps) {
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
          <Badge
            variant={trail.difficulty === 'Hard' ? 'destructive' : 'secondary'}
            className="absolute top-2 right-2"
          >
            {trail.difficulty}
          </Badge>
        </div>
        <div className="p-6">
          <CardTitle className="text-xl mb-1">{trail.name}</CardTitle>
          <CardDescription>{trail.location}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0">
        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2" title="Rating">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="font-semibold">{trail.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-2" title="Terrain">
            {terrainIcons[trail.terrain]}
            <span>{trail.terrain}</span>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-2" title="Length">
            <Milestone className="h-4 w-4" />
            <span>{trail.length} km</span>
          </div>
          <div className="flex items-center gap-2" title="Duration">
            <Clock className="h-4 w-4" />
            <span>{trail.duration} hrs</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button onClick={onSelect} className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
