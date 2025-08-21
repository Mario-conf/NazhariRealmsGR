'use client';

import * as React from 'react';
import { trails, Trail } from '@/lib/trail-data';
import { TrailCard } from '@/components/trail-card';
import { TrailFilters } from '@/components/trail-filters';
import { TrailDetailsDialog } from '@/components/trail-details-dialog';
import useFavorites from '@/hooks/use-favorites';
import { useTranslations } from 'next-intl';

export default function RoutesPage() {
  const t = useTranslations('RoutesPage');
  const [filteredTrails, setFilteredTrails] = React.useState<Trail[]>(trails);
  const [selectedTrail, setSelectedTrail] = React.useState<Trail | null>(null);
  const { favorites, toggleFavorite } = useFavorites();

  const handleSelectTrail = (trail: Trail) => {
    setSelectedTrail(trail);
  };

  const handleCloseDialog = () => {
    setSelectedTrail(null);
  };

  const handleToggleFavorite = (e: React.MouseEvent, trailId: number) => {
    e.stopPropagation();
    toggleFavorite(trailId);
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            {t('subtitle')}
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12">
          <aside className="sticky top-20 h-fit">
            <TrailFilters onFilterChange={setFilteredTrails} favorites={favorites} />
          </aside>
          <section>
            {filteredTrails.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredTrails.map((trail) => (
                  <TrailCard
                    key={trail.id}
                    trail={trail}
                    onSelect={() => handleSelectTrail(trail)}
                    isFavorite={favorites.includes(trail.id)}
                    onToggleFavorite={(e) => handleToggleFavorite(e, trail.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg">
                <p className="text-xl font-semibold text-muted-foreground">
                  {t('no_results_title')}
                </p>
                <p className="text-muted-foreground">
                  {t('no_results_subtitle')}
                </p>
              </div>
            )}
          </section>
        </main>
      </div>
      {selectedTrail && (
        <TrailDetailsDialog
          trail={selectedTrail}
          onClose={handleCloseDialog}
          isFavorite={favorites.includes(selectedTrail.id)}
          onToggleFavorite={() => toggleFavorite(selectedTrail.id)}
        />
      )}
    </>
  );
}
