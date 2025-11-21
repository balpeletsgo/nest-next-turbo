"use server";
import { UserResponse } from "@workspace/responses";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export interface Session {
  user: UserResponse;
}

export const getServerSession = async (): Promise<Session | null> => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return null;
    }

    const payload = await decrypt(sessionCookie);

    if (!payload) {
      return null;
    }

    const response = await fetch(`${process.env.API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${payload.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return null;
    }

    return {
      user: data.data,
    };
  } catch (error) {
    return null;
  }
};
