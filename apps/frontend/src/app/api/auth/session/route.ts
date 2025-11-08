import { getSession, getUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUser();
    const session = await getSession();

    if (!user || !session) {
      return NextResponse.json(
        { success: false, message: "No active session" },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        user,
        expiresAt: session.expiresAt,
        isAuthenticated: true,
      },
    });
  } catch (error) {
    console.error("Error getting session:", error);
    return NextResponse.json(
      { success: false, message: "Session error" },
      { status: 500 },
    );
  }
}
