import { Button } from "@/components/ui/button";
import { getServerSession } from "@/features/auth/api";
import { SignOutButton } from "@/features/auth/components";
import Link from "next/link";
import SessionClient from "./session-client";

export default async function Home() {
	const session = await getServerSession();

	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center ">
			<div className="text-center space-y-4">
				<h1 className="text-6xl font-bold font-mono">
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
							className="text-2xl p-0 underline underline-offset-2"
						>
							<Link href="/sign-in">sign in</Link>
						</Button>{" "}
						to continue.
					</p>
				)}
				<SessionClient />
			</div>
		</div>
	);
}
