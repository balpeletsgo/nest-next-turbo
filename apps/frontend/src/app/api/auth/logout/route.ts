import { deleteSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await deleteSession();

		return NextResponse.json({
			success: true,
			message: "Logged out successfully",
		});
	} catch (error) {
		console.error("Logout error:", error);
		return NextResponse.json(
			{ success: false, message: "Logout failed" },
			{ status: 500 }
		);
	}
}
