"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetProfile } from "../api/getProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PencilIcon } from "lucide-react";

export function ProfilePage() {
  const { data: user, isLoading } = useGetProfile();

  return (
    <div className="grid w-full grid-cols-1">
      <div className="h-24 w-full border-b border-dashed">
        <div className="mx-auto flex h-24 w-full max-w-7xl flex-row items-center justify-between border-x border-dashed px-4">
          <div className="flex flex-row items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User Avatar"
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              {isLoading ? (
                <Skeleton className="h-8 w-36" />
              ) : (
                <>
                  <h1 className="text-2xl font-bold">{user?.data?.name}</h1>
                  <p className="text-muted-foreground text-sm font-medium">
                    {user?.data?.email}
                  </p>
                </>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            className="cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2Icon className="mr-2 size-4 animate-spin" />
            ) : (
              <PencilIcon className="mr-2 size-4" />
            )}
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
