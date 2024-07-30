"use client";

import { HintComponent } from "@/components/hint";
import { Info } from "lucide-react";
import { useMemo } from "react";

export function ChatInfo({
  isChatDelayed,
  isChatFollowersOnly,
}: {
  isChatDelayed: boolean | null | undefined;
  isChatFollowersOnly: boolean | null | undefined;
}) {
  const hint = useMemo(() => {
    if (!isChatFollowersOnly && !isChatDelayed) {
      return "Only followers can chat";
    }

    if (isChatDelayed && !isChatDelayed) {
      return "Chat is delayed";
    }

    if (isChatDelayed && isChatFollowersOnly) {
      return "Chat is delayed and only followers can chat";
    }

    return "";
  }, [isChatDelayed, isChatFollowersOnly]);

  const label = useMemo(() => {
    if (isChatFollowersOnly && !isChatDelayed) {
      return "Followers Only";
    }

    if (isChatDelayed && !isChatDelayed) {
      return "Slow mode";
    }

    if (isChatDelayed && isChatFollowersOnly) {
      return "Followers only and slow mode";
    }

    return "";
  }, [isChatDelayed, isChatFollowersOnly]);

  if (!isChatDelayed && !isChatFollowersOnly) {
    return null;
  }

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <HintComponent label={hint}>
        <Info className="h-4 w-4" />
      </HintComponent>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
}
