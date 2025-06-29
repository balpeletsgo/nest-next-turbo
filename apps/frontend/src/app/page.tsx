import { LogoutButton } from "@/components/features/auth/components/LogoutButton";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/session";
import Link from "next/link";

export default async function Home() {
	const { user, isAuthenticated } = await getServerSession();

	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center ">
			<div className="text-center space-y-4">
				<h1 className="text-6xl font-bold font-mono">
					NestJS + Next.js Monorepo
				</h1>
				{isAuthenticated ? (
					<div className="space-y-2">
						<p className="text-2xl">
							Welcome back, <span className="font-semibold">{user?.name}</span>!
						</p>
						<LogoutButton />
					</div>
				) : (
					<p className="text-2xl font-medium">
						Please{" "}
						<Button
							asChild
							variant="link"
							className="text-2xl p-0 underline underline-offset-2"
						>
							<Link href="/sign_in">sign in</Link>
						</Button>{" "}
						to continue.
					</p>
				)}
			</div>
		</div>
	);
}
