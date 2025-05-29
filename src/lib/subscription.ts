import { getAuthSession } from "./auth";
import { prisma } from "./db";

// Just return true always since there's no subscription check needed
export async function checkSubscription(): Promise<boolean> {
  return true;
}