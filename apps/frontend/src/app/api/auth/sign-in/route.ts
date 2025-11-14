import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();

		const response = await fetch(`${process.env.API_URL}/auth/sign-in`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(data, { status: response.status });
		}

		const res = NextResponse.json(data);
		if (data.success && data.data?.access_token) {
			res.cookies.set("access_token", data.data.access_token, {
				httpOnly: false,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 60 * 60 * 24 * 30,
				path: "/",
			});
		}

		return res;
	} catch (error) {
		if (error instanceof Error && error.name === "ZodError") {
			return NextResponse.json(
				{
					success: false,
					status: 400,
					message: "Validation error",
					errors: (error as any).errors,
				},
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ success: false, status: 500, message: "Internal server error" },
			{ status: 500 }
		);
	}
}
