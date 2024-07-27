import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const self = await getSelf();

  if (!self) {
    // Handle the case when there is no user
    return [];
  }

  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;

  // return await db.user.findUnique({ where: { id: self.id } }).recommendedUsers();
};
