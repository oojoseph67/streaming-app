"use client";

import {
  useTracks,
  useRemoteParticipant,
  useConnectionState,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { OfflineVideo } from "./offline-video";
import { LoadingVideo } from "./loading-video";
import { LiveVideo } from "./live-video";

type VideoProps = {
  hostName: string;
  hostIdentity: string;
};

export function VideoPlayer({ hostName, hostIdentity }: VideoProps) {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks().filter(
    (track) => track.participant.identity === hostIdentity
  );

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <OfflineVideo username={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = (
      <LoadingVideo label="Loading...Waiting for host to share video" />
    );
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return <div className="aspect-video border-b group relative">{content}</div>;
}
