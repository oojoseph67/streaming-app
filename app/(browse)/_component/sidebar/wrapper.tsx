"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/utils/store/use-sidebar";
import { useIsClient } from "usehooks-ts";
import { RecommendedSkeleton } from "./recommended";
import { FollowingSkeleton } from "./following";

type WrapperProps = {
  children: React.ReactNode;
};

export function Wrapper({ children }: WrapperProps) {
  const isClient = useIsClient();
  const { collapsed } = useSidebarStore((state) => state);

  if (!isClient) {
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
        {/* <ToggleSkeleton/> */}
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }

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
