"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParticipants } from "@livekit/components-react";
import { useMemo, useState, useEffect } from "react";
import { CommunityItem } from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

type Participant = RemoteParticipant | LocalParticipant;
type CommunityChatProps = {
  viewerName: string;
  hostName: string;
  isHidden: boolean | null | undefined;
};

export function CommunityChat({
  viewerName,
  hostName,
  isHidden,
}: CommunityChatProps) {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(value);

  const participants = useParticipants();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc: Participant[], participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as Participant[]);

    return deduped.filter((participant) =>
      participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
    );
  }, [participants, debouncedValue]);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community"
        className="border-white/10"
      />

      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results
        </p>

        {filteredParticipants.map((participant, index) => {
          return (
            <CommunityItem
              key={index}
              hostName={hostName}
              viewerName={viewerName}
              participantName={participant.name || ""}
              participantIdentity={participant.identity}
            />
          );
        })}
      </ScrollArea>
    </div>
  );
}
