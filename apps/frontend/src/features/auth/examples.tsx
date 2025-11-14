// Example usage of the new auth system

// @ts-nocheck

import React from "react";
import {
	useSignIn,
	useSignUp,
	useLogout,
	useProfile,
	useAuth,
} from "@/features/auth/api";
import { api } from "@/lib/api-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Example: Authentication status
export function AuthStatus() {
	const { isAuthenticated, token } = useAuth();
	const { data: profile } = useProfile();

	if (!isAuthenticated) {
		return <div>Not authenticated</div>;
	}

	return (
		<div>
			<p>Welcome, {profile?.data?.name}!</p>
			<p>Token present: {!!token}</p>
		</div>
	);
}

// Example: Login Form
export function LoginForm() {
	const signInMutation = useSignIn({
		mutationConfig: {
			onSuccess: (data) => {
				console.log("Sign in successful!", data);
				// Token is automatically stored in cookie by route handler
				// No need to manually handle token storage
			},
			onError: (error) => {
				console.error("Sign in failed:", error.message);
			},
		},
	});

	const handleSubmit = (data: { email: string; password: string }) => {
		signInMutation.mutate(data);
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.target as HTMLFormElement);
				handleSubmit({
					email: formData.get("email") as string,
					password: formData.get("password") as string,
				});
			}}
		>
			<input name="email" type="email" placeholder="Email" required />
			<input name="password" type="password" placeholder="Password" required />
			<button type="submit" disabled={signInMutation.isPending}>
				{signInMutation.isPending ? "Signing in..." : "Sign In"}
			</button>
		</form>
	);
}

// Example: Register Form
export function RegisterForm() {
	const signUpMutation = useSignUp({
		mutationConfig: {
			onSuccess: (data) => {
				console.log("Sign up successful!", data);
				// Redirect to login or dashboard
			},
			onError: (error) => {
				console.error("Sign up failed:", error.message);
			},
		},
	});

	const handleSubmit = (data: {
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	}) => {
		signUpMutation.mutate(data);
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.target as HTMLFormElement);
				handleSubmit({
					name: formData.get("name") as string,
					email: formData.get("email") as string,
					password: formData.get("password") as string,
					confirmPassword: formData.get("confirmPassword") as string,
				});
			}}
		>
			<input name="name" type="text" placeholder="Name" required />
			<input name="email" type="email" placeholder="Email" required />
			<input name="password" type="password" placeholder="Password" required />
			<input
				name="confirmPassword"
				type="password"
				placeholder="Confirm Password"
				required
			/>
			<button type="submit" disabled={signUpMutation.isPending}>
				{signUpMutation.isPending ? "Signing up..." : "Sign Up"}
			</button>
		</form>
	);
}

// Example: Logout Button
export function LogoutButton() {
	const logoutMutation = useLogout();

	return (
		<button
			onClick={() => logoutMutation.mutate()}
			disabled={logoutMutation.isPending}
		>
			{logoutMutation.isPending ? "Logging out..." : "Logout"}
		</button>
	);
}

// Example: Protected Resource (Posts, Users, etc.)
export function Posts() {
	const {
		data: posts,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: () => api.get<any>("/posts"), // Automatically includes auth token
	});

	if (isLoading) return <div>Loading posts...</div>;
	if (error) return <div>Error: {(error as Error).message}</div>;

	return (
		<div>
			{posts?.data?.map((post: any) => (
				<div key={post.id}>
					<h3>{post.title}</h3>
					<p>{post.content}</p>
				</div>
			))}
		</div>
	);
}

// Example: Create Post
export function CreatePost() {
	const queryClient = useQueryClient();

	const createPostMutation = useMutation({
		mutationFn: (data: { title: string; content: string }) =>
			api.post("/posts", data), // Automatically includes auth token
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});

	const handleSubmit = (data: { title: string; content: string }) => {
		createPostMutation.mutate(data);
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.target as HTMLFormElement);
				handleSubmit({
					title: formData.get("title") as string,
					content: formData.get("content") as string,
				});
			}}
		>
			<input name="title" type="text" placeholder="Post Title" required />
			<textarea name="content" placeholder="Post Content" required />
			<button type="submit" disabled={createPostMutation.isPending}>
				{createPostMutation.isPending ? "Creating..." : "Create Post"}
			</button>
		</form>
	);
}
