"use client";

import { UserResponse } from "@workspace/responses";
import { createContext } from "react";

interface SessionContextType {
	session: { user: UserResponse | undefined } | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export const SessionContext = createContext<SessionContextType | undefined>(
	undefined
);
