import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const getSelf = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const self = await db.user.findUnique({
      where: { externalUserId: user.id },
    });

    if (!self) {
      return null;
    }

    return self;
  } catch (error) {
    console.error("Error fetching self:", error);
    return null;
  }
};
