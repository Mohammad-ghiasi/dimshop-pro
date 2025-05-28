import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { UseApiMutationProps } from "@/types/mutationType";
import { getSimpleCookie } from "@/lib/cookies";



export function useApiMutation<TData = any, TVariables = any>({
  method,
  url,
  onSuccessMessage = "عملیات با موفقیت انجام شد",
  onErrorMessage = "خطایی پیش آمده",
  invalidateQueryKey,
  config,
}: UseApiMutationProps) {
  const { toast } = useToast();
  const token = getSimpleCookie("authToken");
  const queryClient = useQueryClient();
  

  return useMutation<TData, any, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const res = await api.request({
        method,
        url,
        data: variables,
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
        ...config,
      });
      return res.data;
    },
    onSuccess: () => {
      if (invalidateQueryKey) {
        queryClient.invalidateQueries({ queryKey: [invalidateQueryKey] });
      }
      toast({
        description: onSuccessMessage,
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("API error:", error);
      toast({
        description: error?.response?.data?.message || onErrorMessage,
        variant: "destructive",
      });
    },
  });
}
