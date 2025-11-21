import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    const payload = await decrypt(session);

    if (!payload) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    return NextResponse.json({ access_token: payload.token });
  } catch (error) {
    return NextResponse.json({ error: "Failed to get token" }, { status: 500 });
  }
}
