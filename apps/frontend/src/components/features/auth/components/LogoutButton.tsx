"use client";

import { useLogout } from "@/hooks/useSession";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary";
  children?: React.ReactNode;
}

export function LogoutButton({
  variant = "destructive",
  children = "Sign Out",
}: LogoutButtonProps) {
  const logout = useLogout();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant={variant} onClick={handleLogout} disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2Icon className="size-4 animate-spin mr-2" />
          Signing out...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
