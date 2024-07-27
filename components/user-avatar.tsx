import { cva, type VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { LiveBadge } from "./live-badge";
import { Skeleton } from "./ui/skeleton";

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string;
  avatar: string;
  isLive?: boolean;
  showBadge?: boolean;
}

const avatarSizes = cva("", {
  variants: {
    size: {
      small: "w-8 h-8",
      medium: "w-10 h-10",
      large: "w-14 h-14",
    },
    defaultVariants: {
      size: "small",
    },
  },
});

export function UserAvatar({
  username,
  avatar,
  isLive,
  showBadge,
  size,
}: UserAvatarProps) {
  const canShowBadge = showBadge && isLive;

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={avatar} className="object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute bottom-3 left-1/2 transform-translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export function UserAvatarSkeleton({ size }: UserAvatarSkeletonProps) {
  return <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />;
}
