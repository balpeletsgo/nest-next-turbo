import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "@/schemas/auth";

type SignInFormProps = {
	isLoading?: boolean;
	onSignIn: (data: z.infer<typeof signInSchema>) => void;
};

export function SignInForm(props: SignInFormProps) {
	const form = useFormContext<z.infer<typeof signInSchema>>();
	const [showPassword, setShowPassword] = useState(false);

	return (
		<form
			onSubmit={form.handleSubmit(props.onSignIn)}
			className="flex h-full w-full flex-col justify-center gap-4"
		>
			<FormField
				control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input placeholder="john_doe@example.com" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="password"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Password</FormLabel>
						<FormControl>
							<div className="relative">
								<Input
									placeholder="Password"
									type={showPassword ? "text" : "password"}
									{...field}
								/>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="hover:text-foreground absolute top-0 right-0 hover:bg-transparent"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <EyeOffIcon /> : <EyeIcon />}
								</Button>
							</div>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<Button type="submit" className="w-full" disabled={props.isLoading}>
				<Loader2Icon
					className={cn(
						"mr-2 h-4 w-4 animate-spin",
						!props.isLoading && "sr-only"
					)}
				/>
				Sign In
			</Button>
		</form>
	);
}
