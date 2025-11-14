import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
	try {
		const response = NextResponse.json({
			success: true,
			message: "Logged out successfully",
		});

		response.cookies.set("access_token", "", {
			httpOnly: false,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 0,
			path: "/",
		});

		return response;
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: "Logout failed" },
			{ status: 500 }
		);
	}
}
