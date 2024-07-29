import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { redirect } from "next/navigation";
import { ChatToggleCard } from "./_components/toggle";

export default async function DashboardChatPage() {
  const self = await getSelf();

  if (!self) redirect("/");

  const stream = await getStreamByUserId(self?.id);

  console.log({ stream });

  if (!stream) throw new Error("Stream not found");

  return (
    <div className="p-6">
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-2xl font-bold">Chat Setting</h1>
      </div>
      <div className="space-y-4">
        <ChatToggleCard
          field="isChatEnabled"
          label="Enable Chat"
          value={stream.isChatEnabled}
        />
        <ChatToggleCard
          field="isChatDelayed"
          label="Delay Chat"
          value={stream.isChatDelayed}
        />
        <ChatToggleCard
          field="isChatFollowersOnly"
          label="Must be following to Chat"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
}
