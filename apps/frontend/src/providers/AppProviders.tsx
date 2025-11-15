"use client";

import { QueryProvider } from "./QueryProvider";
import { SessionProvider } from "./SessionProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </SessionProvider>
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </QueryProvider>
  );
}
