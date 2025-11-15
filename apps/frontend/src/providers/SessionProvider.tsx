"use client";

import { SessionContext } from "@/contexts";
import { useGetSession } from "@/features/auth/api";
import { useMemo, type ReactNode } from "react";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const sessionQuery = useGetSession({
    queryConfig: {
      refetchOnWindowFocus: true,
      retry: false,
    },
  });

  const contextValue = useMemo(
    () => ({
      session: {
        user: sessionQuery.data?.data,
      },
      isAuthenticated: Boolean(sessionQuery.data?.data?.id),
      isLoading: sessionQuery.isLoading,
    }),
    [sessionQuery.data, sessionQuery.isLoading],
  );

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
