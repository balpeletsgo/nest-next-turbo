import { httpClient } from "@/lib/http-client";
import { SignInRequestDTO, SignUpRequestDTO } from "@/server/dto";
import { AuthResponse, WebResponse } from "@workspace/responses";

class AuthService {
	async signIn(request: SignInRequestDTO): Promise<WebResponse<AuthResponse>> {
		const response = await httpClient.post<WebResponse<AuthResponse>>(
			"/auth/sign_in",
			request,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		console.log({ response });

		return response;
	}

	async signUp(request: SignUpRequestDTO): Promise<WebResponse<AuthResponse>> {
		const response = await httpClient.post<WebResponse<AuthResponse>>(
			"/auth/sign_up",
			request,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return response;
	}
}

export const authService = new AuthService();
