"use client";

import { HintComponent } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ChatVariant, useChatSidebarStore } from "@/utils/store/use-chat-sidebar";
import { MessageSquare, Users } from "lucide-react";

export function VariantToggle() {
  const { onChangeChatVariant, variant } = useChatSidebarStore(
    (state) => state
  );

  const isChat = variant === ChatVariant.CHAT
  const Icon = isChat ? Users : MessageSquare;

  const onToggle = () => {
    const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
    onChangeChatVariant(newVariant);
  };

  const label = isChat ? "Community" : "Chat";

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
