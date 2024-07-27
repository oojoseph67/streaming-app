"use server";

import { followUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id);

    console.log({ followedUser });

    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (error) {
    console.error("Internal error:", error);
    return null; // Return null or an appropriate fallback value
  }
}
