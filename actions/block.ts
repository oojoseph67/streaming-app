"use server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";

export async function onBlock(id: string) {
  try {
    const blockedUser = await blockUser(id);

    revalidatePath("/");

    if (blockedUser) {
      revalidatePath(`/${blockedUser.blocked.username}`);
    }

    return blockedUser;
  } catch (error) {
    console.error("Internal error:", error);
    return false; // Return false or an appropriate fallback value
  }
}

export async function onUnblock(id: string) {
  try {
    const unblockedUser = await unblockUser(id);

    revalidatePath("/");

    if (unblockedUser) {
      revalidatePath(`/${unblockedUser.blocked.username}`);
    }

    return unblockedUser;
  } catch (error) {
    console.error("Internal error:", error);
    return false; // Return false or an appropriate fallback value
  }
}
