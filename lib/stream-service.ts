import { db } from "@/lib/db";

export async function getStreamByUserId(userId: string) {
  return await db.stream.findUnique({
    where: { userId },
  });
}
