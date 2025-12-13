import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { AuthResponse, WebResponse } from "@workspace/responses";
import Cookies from "js-cookie";
import { SignInRequest } from "../schemas";
import { useGetSession } from "./getSession";

export const signIn = async (request: SignInRequest) => {
  const response = await api.post<WebResponse<AuthResponse>>(
    "/auth/sign-in",
    request,
  );

  if (response.success) {
    Cookies.set("token", response.data?.access_token!, {
      expires: 30,
      sameSite: "strict",
      path: "/",
      secure: true,
    });
  }

  return response;
};

type UseSignInOptions = {
  mutationConfig?: MutationConfig<typeof signIn>;
};

export const useSignIn = ({ mutationConfig }: UseSignInOptions = {}) => {
  const { onSuccess, ...restMutationConfig } = mutationConfig || {};
  const { refetch: refetchSession } = useGetSession();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (...args) => {
      refetchSession();
      onSuccess?.(...args);
    },
    ...restMutationConfig,
  });
};
