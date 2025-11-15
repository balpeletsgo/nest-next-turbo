"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "@/hooks";

export default function SessionClient() {
	const { session, isLoading, isAuthenticated } = useSession();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Client Session</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="font-mono">{JSON.stringify(session, null, 2)}</p>
				<p className="font-mono">{JSON.stringify(isAuthenticated, null, 2)}</p>
				<p className="font-mono">{JSON.stringify(isLoading, null, 2)}</p>
			</CardContent>
		</Card>
	);
}
