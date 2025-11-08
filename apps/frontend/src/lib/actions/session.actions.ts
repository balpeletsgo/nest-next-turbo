"use server";

import { createSession } from "@/lib/session";

type UserPayload = {
  id: string;
  email: string;
  name: string;
  role: string;
  isMember: boolean;
};

export async function createSessionAction(user: UserPayload, token: string) {
  try {
    await createSession(user, token);
  } catch (error) {
    console.log({ error });
    console.error("Failed to create session:", error);
    throw new Error("Failed to create session");
  }
}
