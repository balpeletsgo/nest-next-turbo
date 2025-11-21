"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@/features/auth/components";
import { useSession } from "@/hooks";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

export function ProfileMenu() {
  const { session, isAuthenticated, isLoading } = useSession();

  return isLoading ? (
    <>
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-20" />
      ))}
    </>
  ) : isAuthenticated ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-1">
            <DropdownMenuLabel className="py-0 pr-0">
              {session?.user?.name}
            </DropdownMenuLabel>
            <Badge
              variant="outline"
              className={cn(
                "border-primary bg-primary/10 text-primary sr-only",
                session?.user?.isMember && "not-sr-only",
              )}
            >
              Member
            </Badge>
          </div>
          <DropdownMenuLabel className="py-0 text-xs">
            {session?.user?.email}
          </DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      <Button asChild>
        <Link href="/sign-in">Sign In</Link>
      </Button>
      <Button variant="secondary" asChild>
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    </>
  );
}
