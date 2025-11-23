import { api } from "@/lib/api-client";
import { QueryConfig } from "@/lib/query-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { UserResponse, WebResponse } from "@workspace/responses";

export const getProfile = async () => {
  const response = await api.get<WebResponse<UserResponse>>("/users/me");

  return response;
};

export const getProfileQueryKeys = () => ["profile"];

export const getProfileQueryOptions = () => {
  return queryOptions({
    queryKey: getProfileQueryKeys(),
    queryFn: () => getProfile(),
  });
};

type UseProfileOptions = {
  queryConfig?: QueryConfig<typeof getProfileQueryOptions>;
};

export const useGetProfile = ({ queryConfig }: UseProfileOptions = {}) => {
  return useQuery({
    ...getProfileQueryOptions(),
    ...queryConfig,
  });
};
