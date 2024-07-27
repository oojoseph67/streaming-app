"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/utils/store/use-sidebar";
import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

export function Container({ children }: { children: React.ReactNode }) {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { collapsed, onCollapse, onExpand } = useSidebarStore((state) => state);

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
