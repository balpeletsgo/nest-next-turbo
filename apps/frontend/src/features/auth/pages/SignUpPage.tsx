"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signUpSchema } from "@/features/auth/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookAudioIcon, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useSignUp } from "../api";
import { AuthLayout } from "../components";
import { SignUpForm } from "../forms";
import { Alert, AlertTitle } from "@/components/ui/alert";

export function SignUpPage() {
	const router = useRouter();
	const [error, setError] = useState<string>("");

	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const signUpMutation = useSignUp({
		mutationConfig: {
			onSuccess: (data) => {
				toast.success(data.message || "User registered successfully!");
				router.push("/sign_in");
				form.reset();
			},
			onError: (error) => {
				setError(error.message);
			},
		},
	});

	async function onSignUp(data: z.infer<typeof signUpSchema>) {
		setError("");
		signUpMutation.mutate(data);
	}

	return (
		<AuthLayout>
			<div className="grid h-full w-full p-0 md:grid-cols-2">
				<div className="bg-muted relative hidden md:block">
					<img
						src="/placeholder.svg"
						alt="Image"
						className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
					/>
				</div>
				<div className="mx-auto my-auto flex h-full max-h-2/3 w-full max-w-md flex-col items-center justify-between">
					<div className="flex flex-col items-center text-center">
						<BookAudioIcon className="size-12 mb-2" />
						<h1 className="text-2xl font-bold">Create an account</h1>
						<p className="text-muted-foreground text-balance">
							Create an account to get started
						</p>
					</div>
					<div className="flex flex-col w-full gap-4">
						{error && (
							<Alert className="border-destructive bg-destructive/10 text-destructive">
								<TriangleAlertIcon />
								<AlertTitle>{error}</AlertTitle>
							</Alert>
						)}
						<Form {...form}>
							<SignUpForm
								onSignUp={onSignUp}
								isLoading={signUpMutation.isPending}
							/>
						</Form>
					</div>
					<div className="text-center text-sm">
						Already have an account?{" "}
						<Button variant="link" className="p-0" asChild>
							<Link href="/sign-in">Sign In</Link>
						</Button>
					</div>
				</div>
			</div>
		</AuthLayout>
	);
}
