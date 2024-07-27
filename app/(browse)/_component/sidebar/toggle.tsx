"use client";

import { HintComponent } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/utils/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export function Toggle() {
  const { collapsed, onExpand, onCollapse } = useSidebarStore((state) => state);
  const label = collapsed ? "expand" : "collapse";

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <HintComponent label={label} side="right" asChild>
            <Button onClick={onExpand} className="h-auto p-2" variant={"ghost"}>
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </HintComponent>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">For you</p>
          <HintComponent label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="h-auto p-2 ml-auto"
              variant={"ghost"}
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </HintComponent>
        </div>
      )}
    </>
  );
}
