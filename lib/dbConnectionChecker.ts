import { db } from "@/lib/db";

export async function checkDbConnection() {
  try {
    await db.$queryRaw`SELECT 1`;
    console.log("Database connection is healthy.");
  } catch (error) {
    console.error("Error checking database connection:", error);
    throw new Error("Database connection error");
  }
}
