"use client";

import { useUser } from "@clerk/nextjs";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { DashboardNavItem, DashboardNavItemSkeleton } from "./navitem";

export function DashboardNavigation() {
  const pathname = usePathname();
  const { isLoaded, user } = useUser();

  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  if (!user?.username || !isLoaded) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => {
          return <DashboardNavItemSkeleton key={i} />;
        })}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route, index) => {
        return (
          <DashboardNavItem
            key={index}
            label={route.label}
            icon={route.icon}
            href={route.href}
            isActive={pathname === route.href}
          />
        );
      })}
    </ul>
  );
}
