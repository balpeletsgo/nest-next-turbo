import { z } from "zod";

const authSchema = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(1, "Name is required")
		.max(255, "Name cannot be more than 255 characters"),
	email: z
		.string({ required_error: "Email is required" })
		.min(1, "Email is required")
		.email({ message: "Invalid email format" }),
	password: z
		.string({ required_error: "Password is required" })
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters long"),
	confirmPassword: z
		.string({ required_error: "Confirm password is required" })
		.min(1, "Confirm password is required")
		.min(8, "Confirm password must be at least 8 characters long"),
});

export const signInSchema = authSchema.omit({
	name: true,
	confirmPassword: true,
});

export type SignInRequest = z.infer<typeof signInSchema>;

export const signUpSchema = authSchema
	.pick({
		name: true,
		email: true,
		password: true,
		confirmPassword: true,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type SignUpRequest = z.infer<typeof signUpSchema>;
