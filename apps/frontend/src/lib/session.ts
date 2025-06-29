import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import "server-only";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export type UserPayload = {
	id: string;
	email: string;
	name: string;
	role: string;
	isMember: boolean;
};

type SessionPayload = {
	user: UserPayload;
	token: string;
	expiresAt: Date;
};

export interface ServerSessionData {
	user: UserPayload | null;
	isAuthenticated: boolean;
	session: SessionPayload | null;
}

export async function encrypt(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1d")
		.sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
	try {
		const { payload } = await jwtVerify(session, encodedKey, {
			algorithms: ["HS256"],
		});
		return payload as SessionPayload;
	} catch (error) {
		console.log("Failed to verify session");
		console.error("Error verifying session:", error);
		return null;
	}
}

export async function createSession(user: UserPayload, token: string) {
	const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
	const session = await encrypt({ user, token, expiresAt });
	const cookieStore = await cookies();

	cookieStore.set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
	});
}

// Single function for server components - returns all session data
export async function getServerSession(): Promise<ServerSessionData> {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get("session")?.value;

	if (!sessionCookie) {
		return {
			user: null,
			isAuthenticated: false,
			session: null,
		};
	}

	const session = await decrypt(sessionCookie);

	if (!session) {
		return {
			user: null,
			isAuthenticated: false,
			session: null,
		};
	}

	const isExpired = new Date(session.expiresAt) <= new Date();

	if (isExpired) {
		return {
			user: null,
			isAuthenticated: false,
			session: null,
		};
	}

	return {
		user: session.user,
		isAuthenticated: true,
		session,
	};
}

export async function getSession(): Promise<SessionPayload | null> {
	const { session } = await getServerSession();
	return session;
}

export async function getUser(): Promise<UserPayload | null> {
	const { user } = await getServerSession();
	return user;
}

export async function isAuthenticated(): Promise<boolean> {
	const { isAuthenticated } = await getServerSession();
	return isAuthenticated;
}

// Delete session (logout)
export async function deleteSession() {
	const cookieStore = await cookies();
	cookieStore.delete("session");
}

export async function createSessionAction(user: UserPayload, token: string) {
	await createSession(user, token);
}
