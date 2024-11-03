import { create } from "zustand";
import { persist } from "zustand/middleware";

type ViewMode = "grid" | "list";

interface LayoutState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      viewMode: "grid",
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: "layout-storage",
    }
  )
);
