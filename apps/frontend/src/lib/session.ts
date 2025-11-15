import { cookies } from "next/headers";
import "server-only";

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: false,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
