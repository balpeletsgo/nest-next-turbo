"use client";

import { useContext } from "react";
import { SessionContext } from "@/contexts/SessionContext";
import type { UserPayload } from "@/lib/session";

// Private context hook - not exported
function useSessionContext() {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error("Session hooks must be used within a SessionProvider");
	}
	return context;
}

// ============================================================================
// SESSION DATA HOOKS
// ============================================================================

/**
 * Hook for reading session data only
 * Returns: user, isAuthenticated, isLoading
 */
export function useSession() {
	const context = useSessionContext();

	return {
		user: context.user,
		isAuthenticated: context.isAuthenticated,
		isLoading: context.isLoading,
	};
}

// ============================================================================
// AUTH ACTION HOOKS
// ============================================================================

/**
 * Hook for all auth actions
 * Returns: login, logout, refreshSession functions
 */
export function useAuth() {
	const context = useSessionContext();

	return {
		login: context.login,
		logout: context.logout,
		refreshSession: context.refreshSession,
	};
}

/**
 * Hook for login action only
 * Returns: login function
 */
export function useLogin() {
	const context = useSessionContext();
	return context.login;
}

/**
 * Hook for logout action only
 * Returns: logout function
 */
export function useLogout() {
	const context = useSessionContext();
	return context.logout;
}

/**
 * Hook for refresh session action only
 * Returns: refreshSession function
 */
export function useRefreshSession() {
	const context = useSessionContext();
	return context.refreshSession;
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type { UserPayload };

// ============================================================================
// USAGE EXAMPLES (commented out)
// ============================================================================

/*
// 1. READING DATA ONLY
const { user, isAuthenticated, isLoading } = useSession();
const user = useUser();
const isAuth = useIsAuthenticated();
const loading = useIsLoading();

// 2. ACTIONS ONLY
const login = useLogin();
const logout = useLogout();
const refresh = useRefreshSession();
const { login, logout, refreshSession } = useAuth();

// 3. COMBINING HOOKS WHEN NEEDED
const { user, isAuthenticated, isLoading } = useSession();
const logout = useLogout();
// Use both in the same component as needed
*/
