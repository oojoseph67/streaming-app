"use server";

import { followUser, unFollowUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

export async function onFollow(id: string) {
  try {
    const followedUser = await followUser(id);

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

export async function unFollow(id: string) {
  try {
    const unFollow = await unFollowUser(id);

    revalidatePath("/");

    if (unFollow) {
      revalidatePath(`/${unFollow.following.username}`);
    }

    return unFollow;
  } catch (error: any) {
    console.error("Internal error:", error);
    throw new Error(error);
  }
}
