"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useCreatorSidebarStore } from "@/utils/store/use-creator-sidebar";

export function DashboardContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebarStore(
    (state) => state
  );
  const matches = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (matches) return onCollapse();
    if (!matches) return onExpand();
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
}
