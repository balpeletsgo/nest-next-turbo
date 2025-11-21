import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="bg-background h-dvh w-full">{children}</div>;
}
