import { db } from "@/lib/db";
import { checkDbConnection } from "./dbConnectionChecker";

export async function getUserByUsername(username: string) {
  try {
    await checkDbConnection();

    const user = await db.user.findUnique({
      where: {
        username,
      },
      include: {
        stream: true,
      },
    });

    return user;
  } catch (error: any) {
    console.error("Error in getUserByUsername:", error);
    throw new Error(`Failed to fetch user by username: ${error.message}`);
  }
}

export async function getUserById(id: string) {
  try {
    await checkDbConnection();

    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        stream: true,
      },
    });

    return user;
  } catch (error: any) {
    console.error("Error in getUserByUsername:", error);
    throw new Error(`Failed to fetch user by username: ${error.message}`);
  }
}
