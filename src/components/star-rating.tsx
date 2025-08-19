"use client";

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  onRate?: (rating: number) => void;
  isInteractive?: boolean;
}

export function StarRating({ rating, totalStars = 5, size = 20, className, onRate, isInteractive = false }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index: number) => {
    if (isInteractive) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (isInteractive) {
      setHoverRating(0);
    }
  };

  const handleClick = (index: number) => {
    if (isInteractive && onRate) {
      onRate(index);
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= (hoverRating || rating);
        
        return (
          <Star
            key={i}
            size={size}
            className={cn(
              "transition-colors",
              isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
              isInteractive ? "cursor-pointer" : ""
            )}
            onMouseOver={() => handleMouseOver(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
          />
        );
      })}
    </div>
  );
}
