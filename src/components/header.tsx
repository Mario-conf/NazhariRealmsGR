"use client";

import { Mountain } from "lucide-react";

export function AppHeader() {
  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2">
          <Mountain className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary tracking-wide">
            Altavia Trail
          </h1>
        </div>
      </div>
    </header>
  );
}
