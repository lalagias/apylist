"use client";

import { LayoutGrid, List } from "lucide-react";
import { useLayoutStore } from "@/store/layout-store";
import { Button } from "@/components/ui/button";

export function ViewToggle() {
  const { viewMode, setViewMode } = useLayoutStore();

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => setViewMode("grid")}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
          viewMode === "grid"
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        } h-10 w-10`}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => setViewMode("list")}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
          viewMode === "list"
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        } h-10 w-10`}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
