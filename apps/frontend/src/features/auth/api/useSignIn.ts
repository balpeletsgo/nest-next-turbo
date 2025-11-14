import { MutationConfig } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { SignInRequest } from "../schemas";

export const signIn = async (request: SignInRequest) => {
	const response = await fetch("/api/auth/sign-in", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(request),
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message || "Sign in failed");
	}

	return result;
};

type UseSignInOptions = {
	mutationConfig?: MutationConfig<typeof signIn>;
};

export const useSignIn = ({ mutationConfig }: UseSignInOptions = {}) => {
	const { onSuccess, ...restMutationConfig } = mutationConfig || {};

	return useMutation({
		mutationFn: signIn,
		onSuccess: (...args) => {
			onSuccess?.(...args);
		},
		...restMutationConfig,
	});
};
