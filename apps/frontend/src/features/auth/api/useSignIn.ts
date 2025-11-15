import { MutationConfig } from "@/lib/query-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignInRequest } from "../schemas";
import { useGetSession } from "./getSession";

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
