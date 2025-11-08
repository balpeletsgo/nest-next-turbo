import { QueryProvider } from "./QueryProvider";
import { SessionProvider } from "./SessionProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  );
}
