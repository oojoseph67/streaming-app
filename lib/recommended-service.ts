import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
  const self = await getSelf();

  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users

  // return await db.user.findUnique({ where: { id: self.id } }).recommendedUsers();
};
