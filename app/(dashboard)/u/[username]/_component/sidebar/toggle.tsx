"use client";

import { HintComponent } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useCreatorSidebarStore } from "@/utils/store/use-creator-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export function DashboardToggle() {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebarStore(
    (state) => state
  );

  const label = !collapsed ? "collapse" : "expand";

  return (
    <>
      {collapsed && (
        <div className="w-full hidden lg:flex items-center justify-center pt-4 mb-4">
          <HintComponent label={label} side="right" asChild>
            <Button
              onClick={onExpand}
              className="h-auto p-2 ml-auto"
              variant={"ghost"}
            >
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </HintComponent>
        </div>
      )}

      {!collapsed && (
        <div className="w-full hidden lg:flex items-center justify-center pt-3 pl-6 mb-2">
          <p className="font-semibold text-primary">Dashboard</p>
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
