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
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { trails, Trail } from '@/lib/trail-data';
import { ListRestart, Heart } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface TrailFiltersProps {
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
const MAX_DURATION = Math.ceil(Math.max(...trails.map((t) => t.duration)));

export function TrailFilters({ onFilterChange, favorites }: TrailFiltersProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDifficulties, setSelectedDifficulties] = React.useState<
    string[]
  >([]);
  const [selectedTerrains, setSelectedTerrains] = React.useState<string[]>([]);
  const [durationRange, setDurationRange] = React.useState([0, MAX_DURATION]);
  const [sortOrder, setSortOrder] = React.useState('rating-desc');
  const [showOnlyFavorites, setShowOnlyFavorites] = React.useState(false);

  const filterAndSortTrails = React.useCallback(() => {
    let filtered = trails;

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
    filtered.sort((a, b) => {
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

    onFilterChange(filtered);
  }, [
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
    setDurationRange([0, MAX_DURATION]);
    setSortOrder('rating-desc');
    setShowOnlyFavorites(false);
  };
  
  const difficultyLabels = {
    'Easy': 'Fácil',
    'Moderate': 'Moderada',
    'Hard': 'Difícil'
  }

  const terrainLabels = {
    'Mountain': 'Montaña',
    'Forest': 'Bosque',
    'Coastal': 'Costa',
    'Desert': 'Desierto'
  }

  return (
    <div className="space-y-8">
       <div className="flex items-center justify-between">
        <Label htmlFor="favorites-only" className="flex items-center gap-2 text-base">
          <Heart className="h-5 w-5 text-red-500" />
          Mis Favoritas
        </Label>
        <Switch
          id="favorites-only"
          checked={showOnlyFavorites}
          onCheckedChange={setShowOnlyFavorites}
        />
      </div>
      <div>
        <Label htmlFor="search">Buscar por nombre o lugar</Label>
        <Input
          id="search"
          placeholder="Ej: Veleta, Monachil..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <Label>Dificultad</Label>
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
        <Label>Terreno</Label>
        <div className="space-y-2 mt-2">
          {TERRAINS.map((t) => (
            <div key={t} className="flex items-center space-x-2">
              <Checkbox
                id={`terrain-${t}`}
                checked={selectedTerrains.includes(t)}
                onCheckedChange={() => handleTerrainToggle(t)}
              />
              <Label htmlFor={`terrain-${t}`} className="font-normal">
                {terrainLabels[t]}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Duración (horas)</Label>
        <Slider
          min={0}
          max={MAX_DURATION}
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

      <div>
        <Label htmlFor="sort">Ordenar por</Label>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger id="sort">
            <SelectValue placeholder="Seleccionar..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating-desc">Valoración: Alta a Baja</SelectItem>
            <SelectItem value="rating-asc">Valoración: Baja a Alta</SelectItem>
            <SelectItem value="length-desc">Distancia: Larga a Corta</SelectItem>
            <SelectItem value="length-asc">Distancia: Corta a Larga</SelectItem>
            <SelectItem value="duration-desc">Duración: Larga a Corta</SelectItem>
            <SelectItem value="duration-asc">Duración: Corta a Larga</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button variant="outline" className="w-full" onClick={handleResetFilters}>
        <ListRestart className="mr-2 h-4 w-4" />
        Reiniciar Filtros
      </Button>
    </div>
  );
}
