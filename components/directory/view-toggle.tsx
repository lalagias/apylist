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
        variant={viewMode === "grid" ? "default" : "outline"}
        className="disabled:pointer-events-none disabled:opacity-50"
        size="icon"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => setViewMode("list")}
        variant={viewMode === "list" ? "default" : "outline"}
        className="disabled:pointer-events-none disabled:opacity-50"
        size="icon"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
