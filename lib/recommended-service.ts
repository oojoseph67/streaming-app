import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getRecommended = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  let userId;

  try {
    const self = await getSelf();
    userId = self?.id || null;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId && userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followers: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocked: {
                some: {
                  blockerId: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: true,
      },
      take: 10,
      orderBy: { createdAt: "desc" },
    });
  } else {
    users = await db.user.findMany({
      take: 10,
      include: {
        stream: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  return users;

  // return await db.user.findUnique({ where: { id: self.id } }).recommendedUsers();
};
