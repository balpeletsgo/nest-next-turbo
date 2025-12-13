import { MutationConfig } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { SignUpRequest } from "../schemas";
import { api } from "@/lib/api-client";
import { AuthResponse, WebResponse } from "@workspace/responses";

export const signUp = async (data: SignUpRequest) => {
  return api.post<WebResponse<AuthResponse>>("/auth/sign-up", data);
};

type UseSignUpOptions = {
  mutationConfig?: MutationConfig<typeof signUp>;
};

export const useSignUp = ({ mutationConfig }: UseSignUpOptions = {}) => {
  const { onSuccess, ...restMutationConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: signUp,
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restMutationConfig,
  });
};
