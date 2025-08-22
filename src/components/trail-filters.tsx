'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { Trail } from '@/lib/trail-data';
import { ListRestart, Heart, Search, SlidersHorizontal } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';

interface TrailFiltersProps {
  allTrails: Trail[];
  onFilterChange: (filteredTrails: Trail[]) => void;
  favorites: number[];
}

const DIFFICULTIES: Trail['difficulty'][] = ['Easy', 'Moderate', 'Hard'];
const TERRAINS: Trail['terrain'][] = [
  'Mountain',
  'Forest',
 'Coastal',
  'Desert',
];

export function TrailFilters({ allTrails, onFilterChange, favorites }: TrailFiltersProps) {
  const t = useTranslations('TrailFilters');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDifficulties, setSelectedDifficulties] = React.useState<
    string[]
  >([]);
  const [selectedTerrains, setSelectedTerrains] = React.useState<string[]>([]);
  const [durationRange, setDurationRange] = React.useState([0, 100]);
  const [sortOrder, setSortOrder] = React.useState('rating-desc');
  const [showOnlyFavorites, setShowOnlyFavorites] = React.useState(false);

  const maxDuration = React.useMemo(() => {
    if (allTrails.length === 0) return 100;
    return Math.ceil(Math.max(...allTrails.map((t) => t.duration)));
  }, [allTrails]);

  React.useEffect(() => {
    // Initialize duration range once trails are loaded
    setDurationRange([0, maxDuration]);
  }, [maxDuration]);

  const filterAndSortTrails = React.useCallback(() => {
    let filtered = allTrails;

    if (showOnlyFavorites) {
      filtered = filtered.filter((trail) => favorites.includes(trail.id));
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (trail) =>
          trail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trail.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter((trail) =>
        selectedDifficulties.includes(trail.difficulty)
      );
    }

    if (selectedTerrains.length > 0) {
      filtered = filtered.filter((trail) =>
        selectedTerrains.includes(trail.terrain)
      );
    }

    filtered = filtered.filter(
      (trail) =>
        trail.duration >= durationRange[0] &&
        trail.duration <= durationRange[1]
    );

    const [sortBy, order] = sortOrder.split('-');
    const sorted = [...filtered].sort((a, b) => {
      let valA, valB;
      switch (sortBy) {
        case 'rating':
          valA = a.rating;
          valB = b.rating;
          break;
        case 'length':
          valA = a.length;
          valB = b.length;
          break;
        case 'duration':
          valA = a.duration;
          valB = b.duration;
          break;
        default:
          return 0;
      }
      return order === 'asc' ? valA - valB : valB - valA;
    });

    onFilterChange(sorted);
  }, [
    allTrails,
    searchTerm,
    selectedDifficulties,
    selectedTerrains,
    durationRange,
    sortOrder,
    showOnlyFavorites,
    favorites,
    onFilterChange,
  ]);

  React.useEffect(() => {
    filterAndSortTrails();
  }, [filterAndSortTrails]);

  const handleDifficultyToggle = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const handleTerrainToggle = (terrain: string) => {
    setSelectedTerrains((prev) =>
      prev.includes(terrain)
        ? prev.filter((t) => t !== terrain)
        : [...prev, terrain]
    );
  };
  
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDifficulties([]);
    setSelectedTerrains([]);
    setDurationRange([0, maxDuration]);
    setSortOrder('rating-desc');
    setShowOnlyFavorites(false);
  };
  
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
         <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder={t('search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
        </div>
         <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger id="sort">
            <SelectValue placeholder={t('sort_placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating-desc">{t('sort_rating_desc')}</SelectItem>
            <SelectItem value="rating-asc">{t('sort_rating_asc')}</SelectItem>
            <SelectItem value="length-desc">{t('sort_length_desc')}</SelectItem>
            <SelectItem value="length-asc">{t('sort_length_asc')}</SelectItem>
            <SelectItem value="duration-desc">{t('sort_duration_desc')}</SelectItem>
            <SelectItem value="duration-asc">{t('sort_duration_asc')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Accordion type="single" collapsible className="w-full">
         <AccordionItem value="item-1">
            <AccordionTrigger className="text-base">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    <span>Filtros Avanzados</span>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4">
                    <div>
                        <Label className="text-base">{t('difficulty_label')}</Label>
                        <div className="space-y-2 mt-2">
                        {DIFFICULTIES.map((d) => (
                            <div key={d} className="flex items-center space-x-2">
                            <Checkbox
                                id={`diff-${d}`}
                                checked={selectedDifficulties.includes(d)}
                                onCheckedChange={() => handleDifficultyToggle(d)}
                            />
                            <Label htmlFor={`diff-${d}`} className="font-normal">
                                {difficultyLabels[d]}
                            </Label>
                            </div>
                        ))}
                        </div>
                    </div>
                     <div>
                        <Label className="text-base">{t('terrain_label')}</Label>
                        <div className="space-y-2 mt-2">
                        {TERRAINS.map((t_item) => (
                            <div key={t_item} className="flex items-center space-x-2">
                            <Checkbox
                                id={`terrain-${t_item}`}
                                checked={selectedTerrains.includes(t_item)}
                                onCheckedChange={() => handleTerrainToggle(t_item)}
                            />
                            <Label htmlFor={`terrain-${t_item}`} className="font-normal">
                                {terrainLabels[t_item]}
                            </Label>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div>
                        <Label className="text-base">{t('duration_label')}</Label>
                        <Slider
                        min={0}
                        max={maxDuration}
                        step={1}
                        value={durationRange}
                        onValueChange={setDurationRange}
                        className="mt-4"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>{durationRange[0]}h</span>
                        <span>{durationRange[1]}h</span>
                        </div>
                    </div>
                </div>
            </AccordionContent>
         </AccordionItem>
      </Accordion>

       <div className="flex flex-col sm:flex-row gap-4 justify-between items-center border-t pt-4">
         <div className="flex items-center gap-2">
            <Label htmlFor="favorites-only" className="flex items-center gap-2 text-base">
            <Heart className="h-5 w-5 text-red-500" />
            {t('favorites_label')}
            </Label>
            <Switch
            id="favorites-only"
            checked={showOnlyFavorites}
            onCheckedChange={setShowOnlyFavorites}
            />
        </div>
        <Button variant="ghost" className="text-sm" onClick={handleResetFilters}>
            <ListRestart className="mr-2 h-4 w-4" />
            {t('reset_button')}
        </Button>
      </div>
    </div>
  );
}
