"use client";

import { stringToColor } from "@/lib/utils";
import { ReceivedChatMessage } from "@livekit/components-react";
import { format } from "date-fns";

export function ChatMessage({ messages }: { messages: ReceivedChatMessage }) {
  const color = stringToColor(messages.from?.name || "");

  return (
    <div className="flex gap-2 rounded-md hover:bg-white/5">
      <p>{format(messages.timestamp, "HH:MM")}</p>
      <div className="flex flex-wrap items-baseline gap-1 grow">
        <p className="text-sm font-semibold whitespace-nowrap">
          <span className="truncate" style={{ color: color }}>
            {messages.from?.name}
          </span>
        </p>
        <p className="text-sm break-all">{messages.message}</p>
      </div>
    </div>
  );
}
