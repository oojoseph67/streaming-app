import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { checkDbConnection } from "./dbConnectionChecker";

export async function blockUser(id: string) {
  try {
    await checkDbConnection();

    const self = await getSelf();

    if (!self) {
      throw new Error("User not authenticated");
    }

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      throw new Error("Cannot block yourself");
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });

    if (existingBlock) {
      throw new Error("User is already blocked");
    }

    const blockedUser = await db.block.create({
      data: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
      include: {
        blocked: true,
      },
    });

    return blockedUser;
  } catch (error: any) {
    console.error("Error in blockUser:", error);
    throw new Error(`Failed to block user: ${error.message}`);
  }
}

export async function unblockUser(id: string) {
  try {
    await checkDbConnection();

    const self = await getSelf();

    if (!self) {
      throw new Error("User not authenticated");
    }

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      throw new Error("Cannot unblock yourself");
    }

    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });

    if (!existingBlock) {
      throw new Error("Not blocked");
    }

    const unblock = await db.block.delete({
      where: {
        id: existingBlock.id,
      },
      include: {
        blocked: true,
      },
    });

    return unblock;
  } catch (error: any) {
    console.error("Error in unBlockUser:", error);
    throw new Error(`Failed to unblock user: ${error.message}`);
  }
}

export async function isBlockedByUser(id: string) {
  try {
    await checkDbConnection();

    const self = await getSelf();
    if (!self) {
      throw new Error("User not authenticated");
    }

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      throw new Error("Cannot block yourself");
    }

    const blockedUser = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });

    return !!blockedUser;
  } catch {
    return false;
  }
}
