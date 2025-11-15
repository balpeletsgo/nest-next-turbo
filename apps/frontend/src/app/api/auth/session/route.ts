import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const access_token = cookieStore.get("session")?.value;

    if (!access_token) {
      return null;
    }

    const response = await fetch(`${process.env.API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return data.data;
  } catch (error) {
    return NextResponse.json(
      { success: false, status: 500, message: "Internal server error" },
      { status: 500 },
    );
  }
}
