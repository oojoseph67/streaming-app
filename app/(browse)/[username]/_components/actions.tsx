"use client";

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, unFollow } from "@/actions/follow";
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
  const [isFollowPending, startFollowTransition] = useTransition();
  const [isUnFollowPending, startUnfollowTransition] = useTransition();
  const [isBlockPending, startBlockTransition] = useTransition();

  const handleOnFollow = () => {
    startFollowTransition(() => {
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
          toast.error(error);
        });
    });
  };

  const handleUnFollow = () => {
    startUnfollowTransition(() => {
      unFollow(userId)
        .then((data) => {
          if (data) {
            toast.success(`You are unfollowed ${data.following.username}`);
          } else {
            toast.error("Failed to follow user. Please try again later.");
          }
        })
        .catch((error) => {
          console.error("Follow error:", error);
          toast.error(error);
        });
    });
  };

  const handleBlock = () => {
    startBlockTransition(() => {
      onBlock(userId)
        .then((data) => {
          if (data) {
            toast.success(`You blocked ${data.blocked.username}`);
          }
        })
        .catch((error) => {
          console.error("Block error:", error);
          toast.error("Failed to block user. Please try again later.");
        });
    });
  };

  return (
    <>
      {isFollowing ? (
        <Button
          disabled={isUnFollowPending}
          onClick={handleUnFollow}
          variant={"primary"}
        >
          {!isUnFollowPending ? "Unfollow" : "Unfollowing..."}
        </Button>
      ) : (
        <Button
          disabled={isFollowPending || isFollowing}
          onClick={handleOnFollow}
          variant={"primary"}
        >
          {!isFollowPending ? "Follow" : "Following..."}
        </Button>
      )}
      <Button
        disabled={isBlockPending}
        onClick={handleBlock}
        variant={"destructive"}
      >
        Block User
      </Button>
    </>
  );
}
