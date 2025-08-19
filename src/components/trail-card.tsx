"use client";

import Image from "next/image";
import { Trail } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Timer, Route, BarChart3 } from "lucide-react";
import { StarRating } from "@/components/star-rating";
import { cn } from "@/lib/utils";

interface TrailCardProps {
  trail: Trail;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelectTrail: () => void;
}

const difficultyVariantMap = {
  Easy: "default",
  Moderate: "secondary",
  Hard: "destructive",
  Expert: "destructive",
} as const;


export function TrailCard({ trail, isFavorite, onToggleFavorite, onSelectTrail }: TrailCardProps) {
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <Card onClick={onSelectTrail} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full">
      <CardHeader className="p-0 relative">
        <Image
          src={trail.imageUrl}
          alt={trail.name}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
          data-ai-hint={trail.imageHint}
        />
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "text-white")} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2 truncate">{trail.name}</CardTitle>
        <p className="text-muted-foreground text-sm mb-3">{trail.location}</p>
        <div className="flex items-center gap-2">
           <StarRating rating={trail.averageRating} size={16} />
           <span className="text-xs text-muted-foreground">({trail.averageRating.toFixed(1)})</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2 text-xs text-muted-foreground items-center">
         <div className="flex items-center gap-1">
            <Route className="h-3 w-3" /> {trail.distance} km
         </div>
         <div className="flex items-center gap-1">
            <Timer className="h-3 w-3" /> {trail.duration} hrs
         </div>
         <div className="flex items-center gap-1">
            <Badge variant={trail.difficulty === 'Easy' ? 'default' : trail.difficulty === 'Moderate' ? 'secondary' : 'destructive'} className="text-xs">{trail.difficulty}</Badge>
         </div>
      </CardFooter>
    </Card>
  );
}
