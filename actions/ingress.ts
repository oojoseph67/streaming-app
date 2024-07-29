"use server";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  TrackSource,
  type CreateIngressOptions,
} from "livekit-server-sdk";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export async function resetIngress(hostIdentity: string) {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
}

export async function createIngress(ingressType: IngressInput) {
  const self = await getSelf();

  if (!self) return null;

  // reset previous ingress
  await resetIngress(self?.id);

  const options: CreateIngressOptions = {
    name: self?.username,
    roomName: self?.id,
    participantName: self?.username,
    participantIdentity: self?.id,
  };

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.enableTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.SCREEN_SHARE,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.SCREEN_SHARE_AUDIO,
      preset: IngressAudioEncodingPreset.OPUS_MONO_64KBS,
    };
  }

  const ingress = await ingressClient.createIngress(ingressType, options);

  console.log({ ingress });

  if (!ingress || !ingress.url || ingress.streamKey === undefined) {
    throw new Error("Failed to create ingress");
  }

  console.log("passes checking");

  await db.stream.update({
    where: { userId: self?.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  console.log("after db update");

  revalidatePath(`/u/${self?.username}/keys`);

  // Ensure the return object is a plain object

  // return ingress

  return {
    ingressId: ingress.ingressId,
    url: ingress.url,
    streamKey: ingress.streamKey,
    name: ingress.name,
    roomName: ingress.roomName,
    participantIdentity: ingress.participantIdentity,
    participantName: ingress.participantName,
    enableTranscoding: ingress.enableTranscoding,
  };
}
