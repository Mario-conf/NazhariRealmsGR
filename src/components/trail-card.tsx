"use client";

import Image from "next/image";
import { Trail } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Timer, Route } from "lucide-react";

interface TrailCardProps {
  trail: Trail;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelectTrail: () => void;
}

export function TrailCard({ trail, isFavorite, onToggleFavorite, onSelectTrail }: TrailCardProps) {
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <Card onClick={onSelectTrail} className="flex flex-col overflow-hidden shadow-none border-none rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full bg-secondary">
      <div className="relative">
        <Image
          src={trail.imageUrl}
          alt={trail.name}
          width={400}
          height={250}
          className="w-full h-40 object-cover rounded-t-lg"
          data-ai-hint={trail.imageHint}
        />
      </div>
      <CardContent className="p-3 flex-grow flex flex-col">
        <h3 className="font-bold text-base mb-1 truncate">{trail.name}</h3>
        <p className="text-muted-foreground text-sm mb-2 flex-grow">{trail.location}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
            <span>{trail.averageRating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Route className="h-3 w-3" /> 
            <span>{trail.distance} km</span>
          </div>
          <div className="flex items-center gap-1">
            <Timer className="h-3 w-3" /> 
            <span>{trail.duration} hrs</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
