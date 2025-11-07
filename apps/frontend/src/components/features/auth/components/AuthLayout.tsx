import { type ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="bg-background h-dvh w-full">{children}</div>;
}
