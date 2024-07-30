import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function CreatorPage({
  params,
}: {
  params: { username: string };
}) {
  const externalUser = await currentUser();
  console.log({ username: params.username });
  const user = await getUserByUsername(params.username);

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    redirect("/404");
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing />
    </div>
  );
}
