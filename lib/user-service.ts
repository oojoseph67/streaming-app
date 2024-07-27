import { db } from "@/lib/db";
import { checkDbConnection } from "./dbConnectionChecker";

export async function getUserByUsername(username: string) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  return user;
}
