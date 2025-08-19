"use client";

import * as React from "react";
import { Trail, Review, Difficulty, Terrain } from "@/types";
import { initialTrails } from "@/lib/trails";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { AppHeader } from "@/components/header";
import { TrailFilters } from "@/components/trail-filters";
import { TrailCard } from "@/components/trail-card";
import { TrailDetailsDialog } from "@/components/trail-details-dialog";
import { Button } from "@/components/ui/button";

type SortKey = "name" | "distance" | "duration" | "difficulty" | "averageRating";

const difficultyOrder: Record<Difficulty, number> = { "Easy": 1, "Moderate": 2, "Hard": 3, "Expert": 4 };

export default function Home() {
  const [trails] = React.useState<Trail[]>(initialTrails);
  const [reviews, setReviews] = useLocalStorage<Review[]>("reviews", []);
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const [selectedTrail, setSelectedTrail] = React.useState<Trail | null>(null);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDifficulties, setSelectedDifficulties] = React.useState<Set<Difficulty>>(new Set());
  const [durationRange, setDurationRange] = React.useState<[number, number]>([0, 24]);
  const [selectedTerrains, setSelectedTerrains] = React.useState<Set<Terrain>>(new Set());
  const [showHistorical, setShowHistorical] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  
  const [sortKey, setSortKey] = React.useState<SortKey>("name");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  const trailsWithReviews = React.useMemo(() => {
    return trails.map(trail => {
      const trailReviews = reviews.filter(r => r.trailId === trail.id);
      const totalRating = trailReviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = trailReviews.length > 0 ? totalRating / trailReviews.length : 0;
      return { ...trail, averageRating };
    });
  }, [trails, reviews]);

  const filteredAndSortedTrails = React.useMemo(() => {
    let filtered = trailsWithReviews.filter(trail => {
      const searchMatch = trail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trail.description.toLowerCase().includes(searchQuery.toLowerCase());
      const difficultyMatch = selectedDifficulties.size === 0 || selectedDifficulties.has(trail.difficulty);
      const durationMatch = trail.duration >= durationRange[0] && trail.duration <= durationRange[1];
      const terrainMatch = selectedTerrains.size === 0 || trail.terrain.some(t => selectedTerrains.has(t));
      const historicalMatch = !showHistorical || trail.hasHistoricalElements;

      return searchMatch && difficultyMatch && durationMatch && terrainMatch && historicalMatch;
    });

    const sorted = [...filtered].sort((a, b) => {
      let compareA: string | number;
      let compareB: string | number;

      if (sortKey === 'difficulty') {
        compareA = difficultyOrder[a.difficulty];
        compareB = difficultyOrder[b.difficulty];
      } else {
        compareA = a[sortKey];
        compareB = b[sortKey];
      }
      
      if (compareA < compareB) return sortOrder === "asc" ? -1 : 1;
      if (compareA > compareB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [trailsWithReviews, searchQuery, selectedDifficulties, durationRange, selectedTerrains, showHistorical, sortKey, sortOrder]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDifficulties(new Set());
    setDurationRange([0, 24]);
    setSelectedTerrains(new Set());
    setShowHistorical(false);
  };

  const handleAddReview = (reviewData: Omit<Review, "id" | "date">) => {
    const newReview: Review = {
      ...reviewData,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setReviews(prevReviews => [...prevReviews, newReview]);
  };

  const toggleFavorite = (trailId: string) => {
    setFavorites(prev => 
      prev.includes(trailId) 
        ? prev.filter(id => id !== trailId) 
        : [...prev, trailId]
    );
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <TrailFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDifficulties={selectedDifficulties}
          setSelectedDifficulties={setSelectedDifficulties}
          durationRange={durationRange}
          setDurationRange={setDurationRange}
          selectedTerrains={selectedTerrains}
          setSelectedTerrains={setSelectedTerrains}
          showHistorical={showHistorical}
          setShowHistorical={setShowHistorical}
          sortKey={sortKey}
          setSortKey={setSortKey}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          onClearFilters={handleClearFilters}
          date={date}
          setDate={setDate}
        />
        
        {filteredAndSortedTrails.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {filteredAndSortedTrails.map(trail => (
              <TrailCard 
                key={trail.id}
                trail={trail}
                isFavorite={favorites.includes(trail.id)}
                onToggleFavorite={() => toggleFavorite(trail.id)}
                onSelectTrail={() => setSelectedTrail(trail)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-headline font-semibold">No Trails Found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your filters to find your next adventure.</p>
            <Button onClick={handleClearFilters} className="mt-4">Clear Filters</Button>
          </div>
        )}

      </main>
      
      {selectedTrail && (
        <TrailDetailsDialog 
          trail={selectedTrail}
          reviews={reviews.filter(r => r.trailId === selectedTrail.id)}
          onAddReview={handleAddReview}
          isOpen={!!selectedTrail}
          onClose={() => setSelectedTrail(null)}
        />
      )}
    </div>
  );
}
