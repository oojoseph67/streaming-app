"use client";

import { useSidebarStore } from "@/utils/store/use-sidebar";
import { User } from "@prisma/client";

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
    </div>
  );
}
