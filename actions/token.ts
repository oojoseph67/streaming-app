"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import { getSelf } from "../lib/auth-service";
import { getUserById } from "../lib/user-service";
import { isBlockedByUser } from "../lib/block-service";

export async function createViewerToken(hostIdentity: string) {
  let self;

  try {
    self = await getSelf();
  } catch {
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 1000)}`;

    self = { id, username };
  }

  if(!self) {
    throw new Error("Failed to create viewer token");
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error("Host not found");
  }

  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) {
    throw new Error("User is blocked");
  }

  const isHost = self.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username,
      ttl: 3600, // 1 hour (or whatever duration you prefer)
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return token.toJwt();
}
