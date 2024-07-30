"use client";

import { Stream, User } from "@prisma/client";
import { useViewerToken } from "../../hooks/use-viwer-token";
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";
import { VideoPlayer } from "./video";
import { useChatSidebarStore } from "@/utils/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat } from "./chat/chat";
import { ChatToggle } from "./chat/chat-toggle";

type StreamPlayerProps = {
  user: User & { stream: Stream | null };
  stream: Stream | null;
  isFollowing: boolean | null;
};

export function StreamPlayer({ user, stream, isFollowing }: StreamPlayerProps) {
  const { token, name, identity } = useViewerToken(user.id);

  const { collapsed } = useChatSidebarStore((state) => state);

  if (!token || !name || !identity) return <div> Cannot watch stream</div>;

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top=[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_API_WEBSOCKET_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg;grind-cols-2 xl:grid-cols-2 2xl:grid-cols-3"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <VideoPlayer hostName={user.username} hostIdentity={user.id} />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream?.isChatEnabled}
            isChatDelayed={stream?.isChatDelayed}
            isChatFollowersOnly={stream?.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
}
