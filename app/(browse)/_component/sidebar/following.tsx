"use client";

import { useSidebarStore } from "@/utils/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

export function Following({
  data,
}: {
  data: (Follow & { following: User })[];
}) {
  const { collapsed } = useSidebarStore((state) => state);

  if (!data.length) return [];

  return (
    <div>
      {!collapsed && (
        <div className="pl-6  mb-4">
          <p className="text-sm text-muted-foreground">Following</p>
        </div>
      )}

      <ul className="space-y-2 px-2">
        {data.map((follow, index) => {
          return (
            <UserItem
              key={index}
              username={follow.following.username}
              imageUrl={follow.following.imageUrl}
              isLive={true}
            />
          );
        })}
      </ul>
    </div>
  );
}

export function FollowingSkeleton() {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3).map((_, i) => <UserItemSkeleton key={i} />)]}
    </ul>
  );
}
