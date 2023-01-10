import type { PaginatedResultInfo } from "lens";
import { ProfileSortCriteria } from "lens";
import create from "zustand";

interface LeaderboardState {
  sortBy: ProfileSortCriteria;
  setSortBy: (option: ProfileSortCriteria) => void;
  offset: string | null;
  setOffset: (offset: string | null) => void;
  currentPageInfo: PaginatedResultInfo | undefined;
  setCurrentPageInfo: (page: PaginatedResultInfo | undefined) => void;
}

export const leaderboardState = create<LeaderboardState>((set) => ({
  sortBy: ProfileSortCriteria.MostFollowers,
  setSortBy: (option) => set(() => ({ sortBy: option })),
  offset: null,
  setOffset: (offset) => set(() => ({ offset })),
  currentPageInfo: undefined,
  setCurrentPageInfo: (page) => set(() => ({ currentPageInfo: page })),
}));
