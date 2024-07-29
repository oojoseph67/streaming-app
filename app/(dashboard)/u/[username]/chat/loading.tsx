import { Skeleton } from "@/components/ui/skeleton";
import { ChatToggleCardSkeleton } from "./_components/toggle";

export default function ChatLoading() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-[200px]" />
      <div className="space-y-4">
        <ChatToggleCardSkeleton />
        <ChatToggleCardSkeleton />
        <ChatToggleCardSkeleton />
      </div>
    </div>
  );
}
