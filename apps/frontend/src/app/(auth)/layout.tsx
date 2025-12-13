import { getServerSession } from "@/features/auth/api";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <div className="bg-background h-dvh w-full">{children}</div>;
}
