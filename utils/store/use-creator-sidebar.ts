import { create } from "zustand";

type CreatorSidebarStoreType = {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
};

export const useCreatorSidebarStore = create<CreatorSidebarStoreType>((set) => ({
  collapsed: false,
  onExpand: () => set((state) => ({ ...state, collapsed: false })),
  onCollapse: () => set((state) => ({ ...state, collapsed: true })),
}));
