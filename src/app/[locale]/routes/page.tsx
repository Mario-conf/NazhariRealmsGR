'use client';

import * as React from 'react';
import type { Trail } from '@/lib/trail-data';
import { TrailCard } from '@/components/trail-card';
import { TrailFilters } from '@/components/trail-filters';
import { TrailDetailsDialog } from '@/components/trail-details-dialog';
import useFavorites from '@/hooks/use-favorites';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import type { Metadata } from 'next';

// No se puede exportar Metadata en un client component
// Esto debe hacerse en el layout o en un server component padre si fuera necesario.
// Por ahora, el SEO se manejará globalmente en el layout.tsx principal.

export default function RoutesPage() {
  const t = useTranslations('RoutesPage');
  const locale = useLocale();
  const [allTrails, setAllTrails] = React.useState<Trail[]>([]);
  const [filteredTrails, setFilteredTrails] = React.useState<Trail[]>([]);
  const [selectedTrail, setSelectedTrail] = React.useState<Trail | null>(null);
  const { favorites, toggleFavorite } = useFavorites();

  React.useEffect(() => {
    // Fetch trails based on the current locale
    fetch(`/data/trails.${locale}.json`)
      .then((res) => {
        if (!res.ok) {
          // Fallback to Spanish if the locale file is not found
          console.warn(`Trail data for locale "${locale}" not found, falling back to "es".`);
          return fetch(`/data/trails.es.json`);
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        // The json file has a root "trails" property
        setAllTrails(data.trails);
        setFilteredTrails(data.trails);
      })
      .catch(error => console.error("Failed to load trail data:", error));
  }, [locale]);

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

  if (allTrails.length === 0) {
    // Optional: add a loading skeleton here
    return <div className="container mx-auto px-4 py-8 text-center">Cargando rutas...</div>
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="font-serif text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            {t('subtitle')}
          </p>
        </header>
        
        <aside className="mb-12">
          <div className="container mx-auto p-0">
             <Card>
                <CardContent className="p-4 md:p-6">
                    <TrailFilters allTrails={allTrails} onFilterChange={setFilteredTrails} favorites={favorites} />
                </CardContent>
            </Card>
          </div>
        </aside>

        <main>
          {filteredTrails.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
            <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg text-center p-4">
              <p className="text-xl font-semibold text-muted-foreground">
                {t('no_results_title')}
              </p>
              <p className="text-muted-foreground">
                {t('no_results_subtitle')}
              </p>
            </div>
          )}
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
