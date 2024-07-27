import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// get a fully registered user

export const getSelf = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized. No user found.");
  }

  const self = await db.user.findUnique({ where: { externalUserId: user.id } });

  if (!self) {
    throw new Error("User not found.");
  }

  return self;
};
