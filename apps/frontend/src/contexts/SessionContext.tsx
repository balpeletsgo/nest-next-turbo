"use client";

import { UserPayload } from "@/lib/session";
import { createContext } from "react";

interface SessionData {
	user: UserPayload | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

interface SessionActions {
	login: (user: UserPayload) => void;
	logout: () => void;
	refreshSession: () => Promise<void>;
}

interface SessionContextValue extends SessionData, SessionActions {}

export const SessionContext = createContext<SessionContextValue | undefined>(
	undefined
);

export type { SessionActions, SessionContextValue, SessionData };
