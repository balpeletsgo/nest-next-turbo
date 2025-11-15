import { SessionContext } from "@/contexts";
import { useContext } from "react";

export function useSession() {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error("useSession must be used within an SessionProvider");
	}
	return context;
}
