import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { getSimpleCookie } from "@/lib/cookies";
import { UseApiQueryProps } from "@/types/queryTypes";

export function useApiQuery<TData = any>({
  queryKey,
  url,
  enabled = true,
  config = {},
}: UseApiQueryProps<TData>) {
  const token = getSimpleCookie("authToken");

  return useQuery<TData, any>({
    queryKey,
    queryFn: async () => {
      const res = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    enabled: !!token && enabled,
  });
}
