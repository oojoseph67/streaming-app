"use client";

import { useSidebarStore } from "@/utils/store/use-sidebar";
import { User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

export function Recommended({ data }: { data: User[] }) {
  const { collapsed } = useSidebarStore((state) => state);
  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="font-semibold text-primary">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user, index) => {
          return (
            <UserItem
              key={index}
              username={user.username}
              imageUrl={user.imageUrl}
              isLive={true}
            />
          );
        })}
      </ul>
    </div>
  );
}

export function RecommendedSkeleton() {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, index) => (
        <UserItemSkeleton key={index} />
      ))}
    </ul>
  );
}
