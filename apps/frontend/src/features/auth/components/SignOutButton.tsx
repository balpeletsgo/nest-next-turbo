"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useSignOut } from "../api";

interface SignOutButtonProps {
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary";
  children?: React.ReactNode;
}

export function SignOutButton({
  variant = "destructive",
  children = "Sign Out",
}: SignOutButtonProps) {
  const signOutMutation = useSignOut();

  return (
    <Button
      variant={variant}
      onClick={() => signOutMutation.mutate("")}
      disabled={signOutMutation.isPending}
    >
      {signOutMutation.isPending ? (
        <>
          <Loader2Icon className="mr-2 size-4 animate-spin" />
          Signing out...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
