import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  let userId;

  try {
    const self = await getSelf();
    if (!self) {
      // Handle the case when there is no user
      return [];
    }
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId && userId) {
    users = await db.user.findMany({
      where: {
        id: { notIn: [userId] },
      },
      take: 10,
      orderBy: { createdAt: "desc" },
    });
  } else {
    users = await db.user.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    });
  }

  return users;

  // return await db.user.findUnique({ where: { id: self.id } }).recommendedUsers();
};
