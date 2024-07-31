import {
  ChatVariant,
  useChatSidebarStore,
} from "@/utils/store/use-chat-sidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader } from "./chat-header";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatList, ChatListSkeleton } from "./chat-list";
import { CommunityChat } from "../community/community-chat";

type ChatProps = {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean | null | undefined;
  isChatEnabled: boolean | null | undefined;
  isChatDelayed: boolean | null | undefined;
  isChatFollowersOnly: boolean | null | undefined;
};

export function Chat({
  viewerName,
  hostIdentity,
  hostName,
  isChatDelayed,
  isChatEnabled,
  isChatFollowersOnly,
  isFollowing,
}: ChatProps) {
  const matches = useMediaQuery("(max-width:1024px)");
  const { variant, onExpand } = useChatSidebarStore((state) => state);

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden =
    !isChatEnabled || !isOnline || (isChatFollowersOnly && !isFollowing);

  const [value, setValue] = useState("");
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.CHAT && (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            isChatDelayed={isChatDelayed}
            isHidden={isHidden}
            isChatFollowersOnly={isChatFollowersOnly}
            isFollowing={isFollowing}
            onChange={onChange}
            onSubmit={onSubmit}
            value={value}
          />
        </>
      )}

      {variant === ChatVariant.COMMUNITY && (
        <>
          <CommunityChat
            viewerName={viewerName}
            hostName={hostName}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeader />
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
}
