"use client";

import { Stream, User } from "@prisma/client";
import { useViewerToken } from "@/hooks/use-viwer-token";

type StreamPlayerProps = {
  user: User & { stream: Stream | null };
  stream: Stream | null;
  isFollowing: boolean | null;
};

export function StreamPlayer({ user, stream, isFollowing }: StreamPlayerProps) {
  const { token, name, identity } = useViewerToken(user.id);

  if (!token || !name || !identity) return <div> Cannot watch stream</div>;

  return <div>Can watch stream</div>;
}
