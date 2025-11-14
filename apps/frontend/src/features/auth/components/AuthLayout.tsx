import { type ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
	return <div className="bg-background h-dvh w-full">{children}</div>;
}
