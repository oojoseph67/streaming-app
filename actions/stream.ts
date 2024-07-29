"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { Stream } from "@prisma/client";
import { checkDbConnection } from "@/lib/dbConnectionChecker";

export async function updateStreamSettings(values: Partial<Stream>) {
  try {
    await checkDbConnection();
    const self = await getSelf();

    if (!self) {
      throw new Error("User not authenticated");
    }

    const stream = await db.stream.findUnique({
      where: { userId: self.id },
    });

    if (!stream) {
      throw new Error("Stream not found");
    }

    const validData = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    await db.stream.update({
      where: { id: stream.id },
      data: { ...validData },
    });

    await revalidatePath(`/u/${self.username}/chat`);
    await revalidatePath(`/u/${self.username}`);
    await revalidatePath(`/${self.username}`);

    return stream;
  } catch (error: any) {
    throw new Error("Internal error: " + JSON.stringify(error));
  }
}
