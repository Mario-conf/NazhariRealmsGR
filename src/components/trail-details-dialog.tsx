'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Trail } from '@/lib/trail-data';
import { Star, Mountain, Forest, Waves, Sun, Clock, Milestone, Map, Download, X } from 'lucide-react';

interface TrailDetailsDialogProps {
  trail: Trail;
  onClose: () => void;
}

const terrainIcons = {
  Mountain: <Mountain className="h-5 w-5" />,
  Forest: <Forest className="h-5 w-5" />,
  Coastal: <Waves className="h-5 w-5" />,
  Desert: <Sun className="h-5 w-5" />,
};

export function TrailDetailsDialog({
  trail,
  onClose,
}: TrailDetailsDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="relative">
          <img
            src={trail.image}
            alt={trail.name}
            data-ai-hint={trail.imageHint}
            className="w-full h-64 object-cover rounded-t-lg"
          />
           <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-background/70 hover:bg-background rounded-full h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <div className="p-6">
            <DialogTitle className="text-3xl font-bold mb-2">{trail.name}</DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground">{trail.location}</DialogDescription>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6 overflow-y-auto flex-grow">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Trail Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-amber-400" />
                  <div>
                    <p className="text-muted-foreground">Rating</p>
                    <p className="font-semibold">{trail.rating.toFixed(1)} / 5.0</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={trail.difficulty === 'Hard' ? 'destructive' : 'secondary'}>
                    {trail.difficulty}
                  </Badge>
                  <div>
                    <p className="text-muted-foreground">Difficulty</p>
                    <p className="font-semibold">{trail.difficulty}</p>
                  </div>
                </div>
                 <div className="flex items-center gap-3">
                  <Milestone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Length</p>
                    <p className="font-semibold">{trail.length} km</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-semibold">{trail.duration} hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {terrainIcons[trail.terrain]}
                  <div>
                    <p className="text-muted-foreground">Terrain</p>
                    <p className="font-semibold">{trail.terrain}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground">{trail.description}</p>
            </div>
          </div>
          <div className="space-y-4">
             <h3 className="font-semibold text-lg mb-2">Route Map</h3>
            <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center">
                <Map className="w-16 h-16 text-muted-foreground/50" />
                <p className="sr-only">A map of the trail route.</p>
            </div>
             <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download GPX File
            </Button>
          </div>
        </div>
         <DialogFooter className="px-6 pb-6 pt-0 mt-auto">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
