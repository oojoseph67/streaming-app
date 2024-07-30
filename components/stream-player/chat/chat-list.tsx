"use client";

import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";
import { Skeleton } from "@/components/ui/skeleton";

export function ChatList({
  messages,
  isHidden,
}: {
  messages: ReceivedChatMessage[];
  isHidden: boolean | null | undefined;
}) {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is Disabled" : "Welcome to the chat"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message, index) => {
        return <ChatMessage key={index} messages={message} />;
      })}
    </div>
  );
}

export function ChatListSkeleton() {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
}
