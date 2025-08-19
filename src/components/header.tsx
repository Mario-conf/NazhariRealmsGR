"use client";

import { ArrowLeft, Share } from "lucide-react";

export function AppHeader() {
  return (
    <header className="bg-background sticky top-0 z-40">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <button className="p-2">
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">
            Altavia Trail
          </h1>
          <button className="p-2">
            <Share className="h-6 w-6 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
