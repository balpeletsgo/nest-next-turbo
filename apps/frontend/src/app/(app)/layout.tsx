import { Footer, Header } from "@/components/layout";
import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid-col grid">
      <Header />
      <div className="mx-auto mt-16 min-h-[calc(100vh-128px)] w-full max-w-7xl border-x border-dashed p-4">
        {children}
      </div>
      <Footer />
    </div>
  );
}
