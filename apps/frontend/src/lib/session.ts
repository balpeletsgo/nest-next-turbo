import { cookies } from "next/headers";
import { EncryptJWT, jwtDecrypt } from "jose";
import "server-only";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = Uint8Array.from(Buffer.from(secretKey!, "base64"));

export async function encrypt(payload: { token: string }) {
  return new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .encrypt(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtDecrypt(session, encodedKey, {
      contentEncryptionAlgorithms: ["A256GCM"],
      keyManagementAlgorithms: ["dir"],
    });
    return payload as { token: string };
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ token });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
