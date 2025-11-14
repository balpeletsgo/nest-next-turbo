"use server";
import { UserResponse } from "@workspace/responses";
import { cookies } from "next/headers";

export interface Session {
	user: UserResponse;
}

export const getServerSession = async (): Promise<Session | null> => {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get("access_token")?.value;

		if (!token) {
			return null;
		}

		const response = await fetch(`${process.env.API_URL}/users/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
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
