"use client";

import * as React from "react";
import type { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { Difficulty, Terrain } from "@/types";
import { Search, X, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
        setSortKey(prevKey => {
            if (prevKey === key) {
                setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
            } else {
                setSortOrder("asc");
            }
            return key;
        });
    }, [setSortKey, setSortOrder]);

    const handleDurationChange = React.useCallback((value: [number, number]) => {
        setDurationRange(value);
    }, [setDurationRange]);

    const handleHistoricalChange = React.useCallback((checked: boolean | 'indeterminate') => {
        setShowHistorical(Boolean(checked));
    }, [setShowHistorical]);


  const isFiltered = searchQuery || selectedDifficulties.size > 0 || durationRange[0] !== 0 || durationRange[1] !== 24 || selectedTerrains.size > 0 || showHistorical;

  return (
    <div className="bg-white p-4 rounded-xl mb-6 shadow-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search trails, e.g. 'Serpent''"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-lg focus:ring-primary focus:border-primary"
        />
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="filters" className="border-b-0">
          <div className="flex justify-between items-center pt-3">
             <AccordionTrigger className="hover:no-underline text-sm font-semibold flex-1 text-left">
                Filters
             </AccordionTrigger>
             {isFiltered && (
                <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-muted-foreground hover:bg-gray-100">
                    <X className="mr-2 h-4 w-4" />
                    Clear
                </Button>
            )}
          </div>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div>
                <Label className="font-semibold text-sm mb-2 block">Difficulty</Label>
                <div className="grid grid-cols-2 gap-2">
                  {difficulties.map(d => (
                    <div key={d} className="flex items-center space-x-2">
                      <Checkbox id={`diff-${d}`} checked={selectedDifficulties.has(d)} onCheckedChange={() => handleDifficultyToggle(d)} />
                      <label htmlFor={`diff-${d}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{d}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label className="font-semibold text-sm mb-2 block">Terrain</Label>
                <div className="grid grid-cols-2 gap-2">
                  {terrains.map(t => (
                    <div key={t} className="flex items-center space-x-2">
                      <Checkbox id={`terrain-${t}`} checked={selectedTerrains.has(t)} onCheckedChange={() => handleTerrainToggle(t)} />
                      <label htmlFor={`terrain-${t}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{t}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <Label className="font-semibold text-sm">Duration (hours)</Label>
                  <Slider value={durationRange} onValueChange={handleDurationChange} max={24} step={1} className="mt-3"/>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{durationRange[0]}h</span>
                    <span>{durationRange[1]}h</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="historical" checked={showHistorical} onCheckedChange={handleHistoricalChange} />
                  <Label htmlFor="historical" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Includes Historical Elements</Label>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-start items-center pt-4">
          <Select onValueChange={(value) => handleSortChange(value as SortKey)} value={sortKey}>
              <SelectTrigger className="w-[180px] h-9 text-sm">
                  <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                  <SelectItem value="averageRating">Rating</SelectItem>
              </SelectContent>
          </Select>
          <Button variant="ghost" size="sm" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="ml-2">
             {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
      </div>
    </div>
  );
}
