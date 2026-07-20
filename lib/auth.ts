import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

export async function setAdminSession(
  adminId: number
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, adminId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 hari
  });
}

export async function getAdminSession(): Promise<number | null> {
  const cookieStore = await cookies();

  const session = cookieStore.get(COOKIE_NAME);

  if (!session) {
    return null;
  }

  return Number(session.value);
}

export async function removeAdminSession(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}