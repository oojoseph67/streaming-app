"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

export function Actions() {
  const user = useUser();
  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      {!user.isSignedIn && (
        <SignInButton>
          <Button variant={"primary"} size={"sm"}>
            Login
          </Button>
        </SignInButton>
      )}

      {!!user.isSignedIn && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
          >
            <Link href={`/u/${user.user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <UserButton afterSwitchSessionUrl="/" />
        </div>
      )}
    </div>
  );
}
