"use client";

import { HintComponent } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useChatSidebarStore } from "@/utils/store/use-chat-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export function ChatToggle() {
  const { collapsed, onCollapse, onExpand } = useChatSidebarStore(
    (state) => state
  );

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <HintComponent label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant={"ghost"}
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </HintComponent>
  );
}
