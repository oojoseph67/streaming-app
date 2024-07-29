import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { useUser } from "@clerk/nextjs";
import { checkDbConnection } from "./dbConnectionChecker";

export const getSelf = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const self = await db.user.findUnique({
      where: { externalUserId: user.id },
    });

    if (!self) {
      throw new Error("User not found");
    }

    return self;
  } catch (error) {
    console.error("Error fetching self:", error);
    return null;
  }
};

export const getSelfByUsername = async (username: string) => {
  try {
    await checkDbConnection();

    const self = await currentUser();

    if (!self) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { username },
    });

    if (!self) {
      throw new Error("User not found");
    }

    if (self.username !== user?.username) {
      throw new Error("Unauthorized");
    }

    return user;
  } catch (error) {
    console.error("Error fetching self by username:", error);
    return null;
  }
};
