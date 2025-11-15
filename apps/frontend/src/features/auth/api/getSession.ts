import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/query-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { UserResponse, WebResponse } from "@workspace/responses";

export const getSession = async () => {
  const response = await api.get<WebResponse<UserResponse>>("/users/me");

  return response;
};

export const getSessionQueryOptions = () => {
  return queryOptions({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });
};

type UseSessionOptions = {
  queryConfig?: QueryConfig<typeof getSessionQueryOptions>;
};

export const useGetSession = ({ queryConfig }: UseSessionOptions = {}) => {
  return useQuery({
    ...getSessionQueryOptions(),
    ...queryConfig,
  });
};
