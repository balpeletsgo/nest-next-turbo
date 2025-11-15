import { Button } from "@/components/ui/button";
import { getServerSession } from "@/features/auth/api";
import { SignOutButton } from "@/features/auth/components";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="h-full w-full">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center border-x border-dashed p-4">
        <div className="space-y-4 text-center">
          <h1 className="font-mono text-6xl font-bold">
            NestJS + Next.js Monorepo
          </h1>
          {session ? (
            <SignOutButton>{session.user.name}</SignOutButton>
          ) : (
            <p className="text-2xl font-medium">
              Please{" "}
              <Button
                asChild
                variant="link"
                className="p-0 text-2xl underline underline-offset-2"
              >
                <Link href="/sign-in">sign in</Link>
              </Button>{" "}
              to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
