import { useLogin } from "@/hooks/useSession";
import { createSessionAction } from "@/lib/actions/session.actions";
import { authService, userService } from "@/server/api";
import { SignInRequestDTO, SignUpRequestDTO } from "@/server/dto";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = () => {
	const login = useLogin();

	return useMutation({
		mutationFn: async (data: SignInRequestDTO) => {
			const response = await authService.signIn(data);

			if (!response.success || !response.data) {
				throw new Error(response.message || "Sign in failed");
			}

			return response.data;
		},
		onSuccess: async (authData) => {
			const userData = await userService.me(authData.access_token!);

			if (!userData.success || !userData.data) {
				throw new Error(userData.message || "User data not found");
			}

			await createSessionAction(
				{
					id: userData.data.id!,
					email: userData.data.email!,
					name: userData.data.name!,
					role: userData.data.role!,
					isMember: userData.data.isMember || false,
				},
				authData.access_token!
			);

			login({
				id: userData.data.id!,
				email: userData.data.email!,
				name: userData.data.name!,
				role: userData.data.role!,
				isMember: userData.data.isMember || false,
			});
		},
	});
};

export const useSignUp = () => {
	return useMutation({
		mutationFn: async (data: SignUpRequestDTO) => {
			const response = await authService.signUp(data);

			if (!response.success || !response.data) {
				throw new Error(response.message || "Sign up failed");
			}

			return response;
		},
	});
};
