"use server";
import { UserResponse } from "@workspace/responses";
import { cookies } from "next/headers";

export interface Session {
  user: UserResponse;
}

export const getServerSession = async (): Promise<Session | null> => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("token")?.value;

    if (!sessionCookie) {
      return null;
    }

    const response = await fetch(`${process.env.API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionCookie}`,
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
