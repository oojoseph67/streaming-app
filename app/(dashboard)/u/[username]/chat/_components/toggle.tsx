"use client";

import { updateStreamSettings } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

type ChatToggleCardProps = {
  field: FieldTypes;
  label: string;
  value: boolean;
};

export function ChatToggleCard({
  field,
  label,
  value = false,
}: ChatToggleCardProps) {
  const [isPending, startTransition] = useTransition();

  const onChange = async () => {
    startTransition(() => {
      updateStreamSettings({ [field]: !value })
        .then(() => {
          toast.success("Chat settings updated successfully");
        })
        .catch(() => {
          toast.error("something went wrong");
        });
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            onCheckedChange={onChange}
            disabled={isPending}
            className="first-letter:uppercase"
            checked={value}
          >
            {value ? "on" : "off"}
          </Switch>
        </div>
      </div>
    </div>
  );
}

export function ChatToggleCardSkeleton() {
  return <Skeleton className="rounded-xl p-10 w-full" />;
}
