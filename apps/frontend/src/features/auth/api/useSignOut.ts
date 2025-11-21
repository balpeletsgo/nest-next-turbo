"use client";

import { MutationConfig } from "@/lib/query-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const signOut = async (
  redirectUrl?: string,
  router?: ReturnType<typeof useRouter>,
) => {
  const response = await fetch("/api/auth/sign-out", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }

  if (redirectUrl) {
    router?.push(redirectUrl);
  } else {
    router?.refresh();
  }

  return response.json();
};

type UseSignOutOptions = {
  mutationConfig?: MutationConfig<typeof signOut>;
};

export const useSignOut = ({ mutationConfig }: UseSignOutOptions = {}) => {
  const { onSuccess, ...restMutationConfig } = mutationConfig || {};
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (redirectUrl?: string) => signOut(redirectUrl, router),
    onSuccess: (...args) => {
      queryClient.clear();
      onSuccess?.(...args);
    },
    ...restMutationConfig,
  });
};
