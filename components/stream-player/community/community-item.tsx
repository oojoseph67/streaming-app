"use client";

import { onBlock } from "@/actions/block";
import { HintComponent } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn, stringToColor } from "@/lib/utils";
import { MinusCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type CommunityItemProps = {
  hostName: string;
  viewerName: string;
  participantName: string;
  participantIdentity: string;
};

export function CommunityItem({
  hostName,
  viewerName,
  participantIdentity,
  participantName,
}: CommunityItemProps) {
  const [isPending, startTransition] = useTransition();

  const color = stringToColor(participantName);
  const isSelf = participantName === viewerName;
  const isHost = participantName === hostName;

  const handleBlock = () => {
    if (!participantName || isSelf || !isHost) return;

    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => {
          toast.success(
            `Participant ${participantName} has been successfully blocked`
          );
        })
        .catch((error) => {
          toast.error(`Failed to block participant ${participantName}`);
          console.error("Failed to block participant", error);
        });
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        isPending && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <HintComponent label="Block">
          <Button
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
            variant={"ghost"}
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </HintComponent>
      )}
    </div>
  );
}
