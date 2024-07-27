import { create } from "zustand";

type SidebarStoreType = {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
};

export const useSidebarStore = create<SidebarStoreType>((set) => ({
  collapsed: false,
  onExpand: () => set((state) => ({ ...state, collapsed: false })),
  onCollapse: () => set((state) => ({ ...state, collapsed: true })),
}));
