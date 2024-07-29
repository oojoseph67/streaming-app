"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebarStore } from "@/utils/store/use-creator-sidebar";

export function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const { collapsed } = useCreatorSidebarStore((state) => state);
  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
}
