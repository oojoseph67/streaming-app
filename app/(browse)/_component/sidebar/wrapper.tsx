"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/utils/store/use-sidebar";

type WrapperProps = {
  children: React.ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  const { collapsed } = useSidebarStore((state) => state);

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2d2e35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
}
