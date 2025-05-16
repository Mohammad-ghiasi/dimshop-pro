type Method = "post" | "put" | "delete" | "patch";

export interface UseApiMutationProps {
  method: Method;
  url: string;
  onSuccessMessage?: string;
  onErrorMessage?: string;
  invalidateQueryKey?: string;
  config?: Record<string, any>;
}