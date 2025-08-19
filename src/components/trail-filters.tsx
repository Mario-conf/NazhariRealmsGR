"use client";

import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Difficulty, Terrain } from "@/types";
import { SlidersHorizontal, Search, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortKey = "name" | "distance" | "duration" | "difficulty" | "averageRating";

interface TrailFiltersProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  selectedDifficulties: Set<Difficulty>;
  setSelectedDifficulties: Dispatch<SetStateAction<Set<Difficulty>>>;
  durationRange: [number, number];
  setDurationRange: Dispatch<SetStateAction<[number, number]>>;
  selectedTerrains: Set<Terrain>;
  setSelectedTerrains: Dispatch<SetStateAction<Set<Terrain>>>;
  showHistorical: boolean;
  setShowHistorical: Dispatch<SetStateAction<boolean>>;
  sortKey: SortKey;
  setSortKey: Dispatch<SetStateAction<SortKey>>;
  sortOrder: "asc" | "desc";
  setSortOrder: Dispatch<SetStateAction<"asc" | "desc">>;
  onClearFilters: () => void;
}

const difficulties: Difficulty[] = ["Easy", "Moderate", "Hard", "Expert"];
const terrains: Terrain[] = ["Mountain", "Forest", "Coastal", "Desert"];

export function TrailFilters({
  searchQuery, setSearchQuery,
  selectedDifficulties, setSelectedDifficulties,
  durationRange, setDurationRange,
  selectedTerrains, setSelectedTerrains,
  showHistorical, setShowHistorical,
  sortKey, setSortKey,
  sortOrder, setSortOrder,
  onClearFilters,
}: TrailFiltersProps) {

  const handleDifficultyToggle = React.useCallback((difficulty: Difficulty) => {
    setSelectedDifficulties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(difficulty)) newSet.delete(difficulty);
      else newSet.add(difficulty);
      return newSet;
    });
  }, [setSelectedDifficulties]);

  const handleTerrainToggle = React.useCallback((terrain: Terrain) => {
    setSelectedTerrains(prev => {
      const newSet = new Set(prev);
      if (newSet.has(terrain)) newSet.delete(terrain);
      else newSet.add(terrain);
      return newSet;
    });
  }, [setSelectedTerrains]);

  const handleSortChange = React.useCallback((key: SortKey) => {
    setSortKey(key);
    setSortOrder(prev => (sortKey === key ? (prev === "asc" ? "desc" : "asc") : "asc"));
  }, [sortKey, setSortKey, setSortOrder]);

  const handleDurationChange = React.useCallback((value: [number, number]) => {
    setDurationRange(value);
  }, [setDurationRange]);
  
  const handleHistoricalChange = React.useCallback((checked: boolean | 'indeterminate') => {
      setShowHistorical(Boolean(checked));
  }, [setShowHistorical]);

  const isFiltered = searchQuery || selectedDifficulties.size > 0 || durationRange[0] !== 0 || durationRange[1] !== 24 || selectedTerrains.size > 0 || showHistorical;

  return (
    <div className="bg-card p-4 rounded-lg mb-8 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search trails..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-11 bg-secondary border-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label className="font-semibold text-sm">Difficulty</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {difficulties.map(d => (
              <div key={d} className="flex items-center space-x-2">
                <Checkbox id={`diff-${d}`} checked={selectedDifficulties.has(d)} onCheckedChange={() => handleDifficultyToggle(d)} />
                <label htmlFor={`diff-${d}`} className="text-sm font-medium leading-none">{d}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label className="font-semibold text-sm">Terrain</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {terrains.map(t => (
              <div key={t} className="flex items-center space-x-2">
                <Checkbox id={`terrain-${t}`} checked={selectedTerrains.has(t)} onCheckedChange={() => handleTerrainToggle(t)} />
                <label htmlFor={`terrain-${t}`} className="text-sm font-medium leading-none">{t}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="font-semibold text-sm">Duration (hours)</Label>
            <div className="mt-2">
              <Slider value={durationRange} onValueChange={handleDurationChange} max={24} step={1} />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{durationRange[0]}h</span>
                <span>{durationRange[1]}h</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="historical" checked={showHistorical} onCheckedChange={handleHistoricalChange} />
            <Label htmlFor="historical" className="text-sm font-medium">Includes Historical Elements</Label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sort by: {sortKey} ({sortOrder})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => handleSortChange("name")}>Name</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSortChange("distance")}>Distance</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSortChange("duration")}>Duration</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSortChange("difficulty")}>Difficulty</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleSortChange("averageRating")}>Rating</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-muted-foreground">
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
}
