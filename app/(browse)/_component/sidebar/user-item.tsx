import { LiveBadge } from "@/components/live-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/utils/store/use-sidebar";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";
import { usePathname } from "next/navigation";

type UserItemProps = {
  username: string;
  imageUrl: string;
  isLive: boolean;
};

export function UserItem({ username, imageUrl, isLive }: UserItemProps) {
  const pathname = usePathname();
  const { collapsed } = useSidebarStore((state) => state);

  const href = `/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      asChild
      variant={"ghost"}
      className={cn(
        "'w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            collapsed && "justify-center"
          )}
        >
          <UserAvatar
            username={username}
            isLive={isLive}
            avatar={imageUrl}
            // showBadge
          />
          {!collapsed && <p className="truncate">{username}</p>}
          {!collapsed && isLive && <LiveBadge className="ml-auto" />}
        </div>
      </Link>
    </Button>
  );
}

export function UserItemSkeleton() {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div>
        <Skeleton className="h-6" />
      </div>
    </li>
  );
}

