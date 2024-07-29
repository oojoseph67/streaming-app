import { Button } from "@/components/ui/button";
import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { redirect } from "next/navigation";
import { KeysUrlCard } from "./_components/url-card";
import { KeysCardComponent } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

export default async function DashboardKey() {
  const self = await getSelf();

  if (!self) redirect("/");

  const stream = await getStreamByUserId(self?.id);

  console.log({ stream });

  if (!stream) throw new Error("Stream not found");
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & Urls</h1>
        <ConnectModal/>
      </div>
      <div className="space-y-4">
        <KeysUrlCard value={stream.serverUrl} />
        <KeysCardComponent value={stream.streamKey} />
      </div>
    </div>
  );
}
