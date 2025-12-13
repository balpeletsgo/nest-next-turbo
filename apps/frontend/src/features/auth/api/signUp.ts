import { MutationConfig } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { SignUpRequest } from "../schemas";

export const signUp = async (data: SignUpRequest) => {
  const response = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Sign up failed");
  }

  return result;
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
