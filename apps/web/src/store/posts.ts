import type { PaginatedResultInfo } from "lens";
import create from "zustand";

interface PostState {
  offset: string | null;
  setOffset: (offset: string | null) => void;
  currentPageInfo: PaginatedResultInfo | undefined;
  setCurrentPageInfo: (page: PaginatedResultInfo | undefined) => void;
}

export const postState = create<PostState>((set) => ({
  offset: null,
  setOffset: (offset) => set(() => ({ offset })),
  currentPageInfo: undefined,
  setCurrentPageInfo: (page) => set(() => ({ currentPageInfo: page })),
}));
