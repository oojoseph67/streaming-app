import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { checkDbConnection } from "./dbConnectionChecker";

export async function isFollowingUser(id: string) {
  try {
    const self = await getSelf();

    if (!self) {
      return false;
    }

    const otherUser = await db.user.findUnique({
      where: { id },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return true;
    }

    const isFollowing = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });

    return !!isFollowing;
  } catch {
    return false;
  }
}

export async function followUser(id: string) {
  try {
    await checkDbConnection(); // Check database connection

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
      throw new Error("Cannot follow yourself");
    }

    const existingFollow = await db.follow.findFirst({
      where: {
          followerId: self.id,
          followingId: otherUser.id,
      },
    });

    if (existingFollow) {
      throw new Error("Already following this user");
    }

    const follow = await db.follow.create({
      data: {
        followerId: self.id,
        followingId: otherUser.id,
      },
      include: {
        follower: true,
        following: true,
      },
    });

    return follow;
  } catch (error: any) {
    console.error("Error in followUser:", error);
    throw new Error(`Failed to follow user: ${error.message}`);
  }
}
