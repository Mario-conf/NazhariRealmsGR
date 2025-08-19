"use client";

import { Mountain } from "lucide-react";

export function AppHeader() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-full">
            <Mountain className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold font-headline text-foreground tracking-wide">
            Altavia Trail
          </h1>
        </div>
      </div>
    </header>
  );
}