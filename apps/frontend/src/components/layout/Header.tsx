"use client";

import { ProfileMenu } from "@/components";
import { BookAudioIcon } from "lucide-react";
import { ThemeSwitcer } from "../themes";
import Link from "next/link";

export function Header() {
  return (
    <div className="fixed top-0 z-50 h-16 w-full shrink-0 border-b border-dashed">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-row items-center justify-between border-x border-dashed px-4">
        <div className="flex flex-row items-center gap-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <BookAudioIcon />
            <p className="sr-only text-xl font-semibold">Acme Inc</p>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-2">
          <ThemeSwitcer />
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}
