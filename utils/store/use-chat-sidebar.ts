import { create } from "zustand";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

type ChatSidebarStoreType = {
  collapsed: boolean;
  variant: ChatVariant;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeChatVariant: (variant: ChatVariant) => void;
};

export const useChatSidebarStore = create<ChatSidebarStoreType>((set) => ({
  collapsed: false,
  variant: ChatVariant.CHAT,
  onExpand: () => set((state) => ({ ...state, collapsed: false })),
  onCollapse: () => set((state) => ({ ...state, collapsed: true })),
  onChangeChatVariant: (variant: ChatVariant) =>
    set((state) => ({ ...state, variant })),
}));
