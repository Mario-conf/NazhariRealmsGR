"use client";

import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Difficulty, Terrain } from "@/types";
import { SlidersHorizontal, Search, ArrowUpDown, Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

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
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
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
  date,
  setDate
}: TrailFiltersProps) {
  
  const handleDifficultyToggle = (difficulty: Difficulty) => {
    setSelectedDifficulties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(difficulty)) {
        newSet.delete(difficulty);
      } else {
        newSet.add(difficulty);
      }
      return newSet;
    });
  };

  const handleTerrainToggle = (terrain: Terrain) => {
    setSelectedTerrains(prev => {
      const newSet = new Set(prev);
      if (newSet.has(terrain)) {
        newSet.delete(terrain);
      } else {
        newSet.add(terrain);
      }
      return newSet;
    });
  };

  const handleSortChange = React.useCallback((value: string) => {
    const [key, order] = value.split("-") as [SortKey, "asc" | "desc"];
    setSortKey(key);
    setSortOrder(order);
  }, [setSortKey, setSortOrder]);

  const isFiltered = searchQuery || selectedDifficulties.size > 0 || durationRange[0] !== 0 || durationRange[1] !== 24 || selectedTerrains.size > 0 || showHistorical;

  return (
    <div className="bg-card p-4 rounded-lg shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search for trails by name or keyword..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("h-12 justify-start text-left font-normal", !date && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              Plan for a date...
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </div>

      <Accordion type="single" collapsible className="w-full mt-2">
        <AccordionItem value="filters">
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-4">
                <AccordionTrigger>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground py-2 px-3 rounded-md">
                        <SlidersHorizontal className="h-4 w-4" />
                        <span>Advanced Filters</span>
                    </div>
                </AccordionTrigger>
                {isFiltered && (
                    <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-muted-foreground hover:text-foreground">
                        <X className="mr-2 h-4 w-4" />
                        Clear Filters
                    </Button>
                )}
             </div>

            <div className="flex items-center gap-2 pr-4">
              <Label htmlFor="sort" className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowUpDown className="h-4 w-4"/>
                Sort by:
              </Label>
              <Select value={`${sortKey}-${sortOrder}`} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="distance-asc">Distance (Shortest)</SelectItem>
                  <SelectItem value="distance-desc">Distance (Longest)</SelectItem>
                  <SelectItem value="duration-asc">Duration (Quickest)</SelectItem>
                  <SelectItem value="duration-desc">Duration (Longest)</SelectItem>
                  <SelectItem value="difficulty-asc">Difficulty (Easiest)</SelectItem>
                  <SelectItem value="difficulty-desc">Difficulty (Hardest)</SelectItem>
                  <SelectItem value="averageRating-desc">Rating (Highest)</SelectItem>
                  <SelectItem value="averageRating-asc">Rating (Lowest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Label className="font-semibold">Difficulty</Label>
                <div className="space-y-2 mt-2">
                  {difficulties.map(d => (
                    <div key={d} className="flex items-center space-x-2">
                      <Checkbox id={`diff-${d}`} checked={selectedDifficulties.has(d)} onCheckedChange={() => handleDifficultyToggle(d)} />
                      <label htmlFor={`diff-${d}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{d}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label className="font-semibold">Terrain</Label>
                <div className="space-y-2 mt-2">
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
                  <Label className="font-semibold">Duration (hours)</Label>
                  <div className="mt-2">
                    <Slider value={durationRange} onValueChange={(val) => setDurationRange(val as [number, number])} max={24} step={1} />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>{durationRange[0]}h</span>
                      <span>{durationRange[1]}h</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="historical" checked={showHistorical} onCheckedChange={(checked) => setShowHistorical(Boolean(checked))} />
                    <Label htmlFor="historical" className="font-semibold">Includes Historical Elements</Label>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}