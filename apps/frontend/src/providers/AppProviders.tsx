import { QueryProvider } from "./QueryProvider";
import { SessionProvider } from "./SessionProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<SessionProvider>{children}</SessionProvider>
		</QueryProvider>
	);
}
