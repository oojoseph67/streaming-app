"use client";

import { onFollow, unFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAuth, useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type HeaderActionsProps = {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
};

export function HeaderActions({
  isFollowing,
  hostIdentity,
  isHost,
}: HeaderActionsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { user } = useUser();

  const handleOnFollow = () => {
    if (!user) return;

    startTransition(() => {
      onFollow(hostIdentity)
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
    startTransition(() => {
      unFollow(hostIdentity)
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

  const onFollowClick = () => {
    if (!hostIdentity) {
      return router.push("/sign-up");
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnFollow();
    } else {
      handleOnFollow();
    }
  };

  return (
    <Button
      onClick={onFollowClick}
      disabled={isHost || isPending}
      variant={"primary"}
      size={"sm"}
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isHost ? "Host" : isFollowing ? "Following" : "Follow"}
    </Button>
  );
}

export function HeaderActionsSkeleton() {
  return <Skeleton className="h-10 w-full lg:w-24" />;
}
