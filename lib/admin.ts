import { headers } from "next/headers";
import { auth } from "./auth";
import { prisma } from "./prisma";

export async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Please sign in to continue.");
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user || user.role !== "ADMIN") throw new Error("Access denied.");
  return user;
}

export async function getSessionUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}

export async function isAdmin() {
  try {
    await requireAdmin();
    return true;
  } catch {
    return false;
  }
}
