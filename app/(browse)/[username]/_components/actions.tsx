"use client";

import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

export function UserAction({
  isFollowing,
  userId,
}: {
  isFollowing: boolean;
  userId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleOnClick = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) => {
          if (data) {
            toast.success(`You are now following ${data.following.username}`);
          } else {
            toast.error("Failed to follow user. Please try again later.");
          }
        })
        .catch((error) => {
          console.error("Follow error:", error);
          toast.error("Failed to follow user. Please try again later.");
        });
    });
  };

  return (
    <Button
      disabled={isPending || isFollowing}
      onClick={handleOnClick}
      variant={"primary"}
    >
      {!isPending ? "Follow" : "Following..."}
    </Button>
  );
}
